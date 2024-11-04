import 'express'
import { UserTokenType } from './types';

declare module 'express' {
    interface Request {
        timestamp?: number;
        user?: UserTokenType;
    }
}