import { Router } from "express";
import { createTablesEndpoint } from "../controller/tables.controller.js";

const router = Router()

router.post("/create", createTablesEndpoint)

export default router