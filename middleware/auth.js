import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, "thisisasecretkey");
    req.companyData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthenticated",
    });
  }
};
