import { getBestSuppliers , getCustomerHistory } from "../services/businessIntelligece.js";

export const getBestSuppliersEndpoint = async(req, res)=>{
     try {
    const suppliers = await getBestSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error gettin Best suppliers" });
  }
}

export const getCustomerHistoryEndpoint= async(req,res) => {

    try 
    {
        const { id } = req.params;
        const supplier = await getCustomerHistory(id)
    if (!supplier) {
      return res.status(404).json({ error: "customer not found" });
    }
    res.status(200).json(supplier);
    } 
    catch (error) {
        console.error(error);
    res.status(500).json({ error: "Error finding customer" });
    }
}