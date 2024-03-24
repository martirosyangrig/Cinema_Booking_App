import { Router } from "express";
import { MovieController } from "../../controllers/movie/movie.controller";
import { verifyAdmin } from "../../middleware/auth";

const router = Router();

router.post("/createMovie", verifyAdmin, MovieController.createMovie);
router.get("/movies/:roomId", MovieController.getMovies);
router.get("/movie/:movieId",  MovieController.getMovie);

export default router;
