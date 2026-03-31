// allowedTo middleware: receives allowed roles and checks if the logged-in user has one of them
export const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.decoded.role)) {
            return res.status(403).json({
                message: `Access denied. This action requires one of these roles: [${roles.join(', ')}]`
            });
        }
        next();
    };
};
