import { Router } from "express";
import {
    userDataValidation,
    userLogingValidation,
} from "../../middleware/validation/validator";
import { validator } from "../../middleware/validation/validatorMiddleware";
import { UserAuthController } from "../../controllers/auth/user-auth.controller";

const router = Router();

router.post(
    "/signup",
    userDataValidation,
    validator,
    UserAuthController.signup
);
router.post(
    "/login",
    userLogingValidation,
    validator,
    UserAuthController.login
);

export default router;
