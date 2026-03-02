import { getBestSuppliers } from "../services/businessIntelligece.js";

export const getBestSuppliersEndpoint = async(req, res)=>{
     try {
    const suppliers = await getBestSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error gettin Best suppliers" });
  }
}
