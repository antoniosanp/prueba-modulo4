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

export const getCustomerHistory = async (id) => {
  const result = await pool.query(`select  c.customer_name , o.order_id  as order_id, o.order_date , t.total_line_value  , p.product_name  as product_name, t.quantity, t.total_line_value 
    from "orders" o
    join "transactions" t on o.order_id  = t.order_id
    join customers c on c.customer_id  = t.customer_id 
    join products p on t.product_id = p.product_id 
            where t.customer_id = $1
            order by o.order_date  desc;`,[id]);
  return result.rows;
};


