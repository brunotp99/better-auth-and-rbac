import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import { prismadb } from "./prismadb.util";
import MailService from "./mailer.util";
import { env } from "./env.util";
 
export const auth = betterAuth({
  database: prismaAdapter(prismadb, {
    provider: "postgresql",
  }),
  plugins: [openAPI()], // api/auth/reference
  trustedOrigins: ['http://localhost:3001/email-verified'],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true, //Send a verification email
    autoSignInAfterVerification: true, //When the user clicks on the email link it should be auto logged in
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      console.log(verificationUrl)

      const mailService = MailService.getInstance()

      if (env.NODE_ENV === 'test') {
          await mailService.createLocalConnection()
      } else {
          await mailService.createConnection()
      }

      await mailService.verifyConnection()

      mailService.sendMail({
          to: user.email,
          subject: `Test - Finalização de registo`,
          html: `
            <html>
              <body>
                <a href="${verificationUrl}">Verify Account</a>
              </body>
            </html>
          `,
      })
    },
  }
});