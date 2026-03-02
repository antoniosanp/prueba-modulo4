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

//-----------------------------------------------------------

export const createSupplierEndpoint = async (req, res) => {
  try {
    const supplier = await createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creatin Supplier" });
  }
};


//-----------------------------------------------------------

export const updateSupplierEndpoint = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await updateSupplier(id, req.body);
    if (!supplier) {
      return res.status(404).json({ error: "Ciudad no encontrada" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating supplier" });
  }
};



//-----------------------------------------------------------

export const deleteSupplierEndpoint = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await deleteSupplier(id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(200).json({ message: "Supplier deleted", supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting supplier" });
  }
};