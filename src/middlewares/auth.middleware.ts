import { Request, Response, NextFunction } from "express";

/**
 * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
 */
export function apiMiddleware(request: Request, response: Response, next: NextFunction) {    const unauthorized = (message: string) => response.status(401).json({
    ok: false,
    status: 401,
    message: message
});
const requestHeader = "AUTORIZATION"
const header = request.header(requestHeader)

if (!header) {
    unauthorized(`Required ${requestHeader} header not found.`);
    return;
}
if (header != requestHeader) {
    unauthorized(`Authorization token not valid`);
    return;
}

next();
}