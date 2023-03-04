import express from "express";
import { signin, signup } from "../controllers/users.js";

const router = express.Router();

// Base route: our-domain.com/users
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
