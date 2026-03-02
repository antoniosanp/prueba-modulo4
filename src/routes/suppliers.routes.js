import { Router } from "express";
import { getAllSuppliersEndpoint, getSupplierByEmailEndpoint } from "../controller/suppliers.controller.js";

const router = Router()

router.get("/get",getAllSuppliersEndpoint)
router.get("/get/:email", getSupplierByEmailEndpoint)


export default router