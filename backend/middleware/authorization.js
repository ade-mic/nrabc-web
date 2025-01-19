const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Ensure user is authenticated first
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    // console.log("User:", req.user);
    // Check if the user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not have Authorization to access this resource",
      });
    }
    next();
  };
};

export { authorizeRoles };
