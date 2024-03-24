import { Router } from "express";
import AuthRouter from "./auth/index";
import MovieRouter from "./movie/index";
import RoomRouter from "./room/index";
import UserRouter from "./user/index";
import { verifyUser } from "../middleware/auth";

const router = Router();

router.use("/api", AuthRouter);
router.use("/api", verifyUser, MovieRouter);
router.use("/api", verifyUser, RoomRouter);
router.use("/api", verifyUser, UserRouter);

export default router;
