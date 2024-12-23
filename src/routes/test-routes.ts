import { Router } from "express";
import { getTestData } from "../controllers/test-controllers";

const router = Router();

router.get("/", getTestData);

export default router;

