import { Router } from "express";
import { createTablesEndpoint, migrateTablesEndpoint, deleteTablesEndpoint } from "../controller/tables.controller.js";

const router = Router()

router.post("/create", createTablesEndpoint)
router.post("/migrate", migrateTablesEndpoint)
router.post("/clearTables", deleteTablesEndpoint)

export default router