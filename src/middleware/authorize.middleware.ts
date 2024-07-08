import { NextFunction } from "express";
import { JWT_SECRET } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload";
import { RequestWithUser } from "../utils/requestwithuser";
import jsonwebtoken from "jsonwebtoken";

const authorize = async (
  req: RequestWithUser,
  res: Express.Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequestHeader(req);

    const payload = jsonwebtoken.verify(token, JWT_SECRET);

    req.name = (payload as jwtPayload).name;
    req.email = (payload as jwtPayload).email;
    req.role = (payload as jwtPayload).role;

    return next();
  } catch (error) {
    return next(error);
  }
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const bearerToken = req.header("Authorization");
  const token = bearerToken.replace("Bearer ", "");
  return token;
};

export default authorize;
