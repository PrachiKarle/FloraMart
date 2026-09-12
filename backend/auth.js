const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Access denied. Token required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    const decoded = jwt.verify(
      token,
      "floramart_secret_key"
    );

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

module.exports=verifyToken;