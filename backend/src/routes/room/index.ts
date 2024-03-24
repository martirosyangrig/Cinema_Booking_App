import { Router } from "express";
import { RoomController } from "../../controllers/room/room.controller";
import { verifyAdmin } from "../../middleware/auth";

const router = Router();

router.post("/createRoom", verifyAdmin, RoomController.create);
router.get("/rooms", RoomController.getRooms);

export default router;
