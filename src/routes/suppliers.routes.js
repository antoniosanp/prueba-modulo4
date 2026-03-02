import { Router } from "express";
import { getAllSuppliersEndpoint } from "../controller/suppliers.controller.js";

const router = Router()

router.get("/get",getAllSuppliersEndpoint)


export default router