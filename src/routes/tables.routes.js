import { Router } from "express";
import { createTablesEndpoint, migrateTablesEndpoint } from "../controller/tables.controller.js";

const router = Router()

router.post("/create", createTablesEndpoint)
router.post("/migrate", migrateTablesEndpoint)

export default router