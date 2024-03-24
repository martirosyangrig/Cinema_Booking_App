import { Router } from "express";
import { UserControoler } from "../../controllers/user/user.controller";

const router = Router();

router.post('/book', UserControoler.bookSeat);

export default router;