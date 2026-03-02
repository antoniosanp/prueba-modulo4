import { Router } from "express";
import { getAllSuppliersEndpoint, getSupplierByEmailEndpoint, createSupplierEndpoint, updateSupplierEndpoint , deleteSupplierEndpoint } from "../controller/suppliers.controller.js";

const router = Router()

router.get("/get", getAllSuppliersEndpoint)
router.get("/get/:email", getSupplierByEmailEndpoint)
router.post("/add", createSupplierEndpoint)
router.put("/update/:id", updateSupplierEndpoint)
router.delete("/delete/:id", deleteSupplierEndpoint)



export default router