import {getAllSuppliers, createSupplier, getSupplierByEmail, updateSupplier, deleteSupplier} from "../services/supplierCRUD.js"

export const getAllSuppliersEndpoint = async(req, res)=>{
     try {
    const suppliers = await getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error gettin suppliers" });
  }
}

export const getSupplierByEmailEndpoint= async(req,res) => {

    try 
    {
        const { email } = req.params;
        const supplier = await getSupplierByEmail(email)
    if (!supplier) {
      return res.status(404).json({ error: "supplier not found" });
    }
    res.status(200).json(supplier);
    } 
    catch (error) {
        console.error(error);
    res.status(500).json({ error: "Error finding supplier" });
    }
}