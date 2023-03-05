import jwt from "jsonwebtoken";
import { jwtConfig } from "../config.js";

// wants to like a post
// click the like button => auth middleware (next) => like controller...

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // If greater than 500, it is a google token
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, jwtConfig.secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
