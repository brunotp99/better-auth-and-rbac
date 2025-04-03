import { NextFunction, Request, Response } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '@/utils/auth.util'

export const userSession = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (session && session.user) {
            res.locals = res.locals || {};
            res.locals.user = session.user;
            return next();
        }

        res.status(401).json({
            error: true,
            message: 'No session found.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Internal server error.',
        });
    }
};