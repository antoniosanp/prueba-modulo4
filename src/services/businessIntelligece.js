import { pool } from "../config/db.js";


//GET all suppliers 
//-----------------------------------------------------------

export const getBestSuppliers = async () => {
  const result = await pool.query(`select s.supplier_name  as supplier_name, sum(t.quantity) as total_quantity
    from suppliers s
    join "transactions" t on s.supplier_id  = t.supplier_id
    group by s.supplier_name 
    order by total_quantity desc
    limit 5;
  `);
  return result.rows;
};
