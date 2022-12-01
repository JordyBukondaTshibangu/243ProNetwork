import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, "thisisasecretkey");
    req.companyData = decoded;
    req.userData = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthenticated",
    });
  }
};

export default auth;
