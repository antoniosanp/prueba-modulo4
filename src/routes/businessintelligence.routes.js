import { Router } from "express";
import { getBestSuppliersEndpoint, getCustomerHistoryEndpoint } from "../controller/businessIntelligence.controller.js";

const router = Router()

router.get("/best", getBestSuppliersEndpoint)
router.get("/history/:id", getCustomerHistoryEndpoint)



export default router