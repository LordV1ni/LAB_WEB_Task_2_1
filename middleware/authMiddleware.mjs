import createError from "http-errors";

const ensureAuthenticatedApi = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: 'not authorized. Please log in' });
};

const ensureAuthenticatedStatic = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    next(createError(401, 'not authorized. Please log in'));
 };

export { ensureAuthenticatedApi, ensureAuthenticatedStatic };