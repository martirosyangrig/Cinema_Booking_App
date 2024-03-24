import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";
import { IUserLogin, IUserRegister } from "../../interfaces/auth-types";

export const validator = (req: Request<IUserRegister | IUserLogin>, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      success: false,
      errors: errors.array(),
    });
  }
  return next();
};
