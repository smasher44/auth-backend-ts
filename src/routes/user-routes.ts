import { Router } from "express";
import { getUsers, getUserProgress } from "../controllers/user-controller";

const router = Router();

router.get("/", getUsers);
router.get("/progress", getUserProgress);

export default router;

