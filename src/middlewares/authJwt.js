
import jwt from 'jsonwebtoken'
import config from '../config/auth.config'
import User from "../models/User.js";
export const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
 
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
