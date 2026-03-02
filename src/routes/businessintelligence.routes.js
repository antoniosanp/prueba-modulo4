import { Router } from "express";
import { getBestSuppliersEndpoint } from "../controller/businessIntelligence.controller.js";

const router = Router()

router.get("/best", getBestSuppliersEndpoint)



export default router