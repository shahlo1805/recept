export const rolesMiddleware = (...roles) => {
  return (req, res, next) => {
    const userRole = req.role;

    if (!userRole) {
      return res.status(403).json({
        message: "Bu amalni bajarish uchun sizda ruxsat yo'q",
      });
    }
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Bu amalni bajarish uchun sizda ruxsat yo'q",
      });
    }

    next();
  };
};
