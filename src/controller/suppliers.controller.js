import {getAllSuppliers, createSupplier, getSupplierById, updateSupplier, deleteSupplier} from "../services/supplierCRUD.js"

export const getAllSuppliersEndpoint = async(req, res)=>{
     try {
    const suppliers = await getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error gettin suppliers" });
  }
}