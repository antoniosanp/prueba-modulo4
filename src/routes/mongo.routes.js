import { Router } from "express";
import { migrateEndpointMongo } from "../controller/tables.controller.js";

const router = Router()

router.post("/migrate", migrateEndpointMongo)

export default router