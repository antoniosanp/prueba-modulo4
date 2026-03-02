import { pool } from "../config/db.js";


//GET all suppliers

export const getAllSuppliers = async () => {
  const result = await pool.query(`
    SELECT * FROM suppliers
  `);
  return result.rows;
};

// GET supplier by email
export const getSupplierById = async (email) => {
  const result = await pool.query(`
    SELECT * FROM suppliers s
    WHERE s.supplier_id =  $1 
  `, [email]);
  return result.rows[0];
};

// CREATE supplier
export const createSupplier = async (supplierData) => {
  const { supplier_email, supplier_name } = supplierData;
  const result = await pool.query(
    "INSERT INTO suppliers (supplier_email, supplier_name) VALUES ($1, $2) RETURNING *",
    [supplier_email, supplier_name]
  );
  return result.rows[0];
};

// UPDATE supplier
export const updateSupplier = async (id, supplierData) => {
  const { supplier_name } = supplierData;
  const result = await pool.query(`UPDATE suppliers 
    SET supplier_name = $1, 
    WHERE supplier_id = $2 RETURNING *`,
    [supplier_name, id]
  );
  return result.rows[0];
};

// DELETE supplier
export const deleteSupplier = async (id) => {
  const result = await pool.query(
    "DELETE FROM suppliers WHERE supplier_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};