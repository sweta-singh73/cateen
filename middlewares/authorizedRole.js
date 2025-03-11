const authorizedRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role; // Check role from req.user

    console.log("role", req.user.role);

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next(); // Proceed to the next middleware
  };
};

module.exports = authorizedRole;
