import { config } from "dotenv";
import { pool } from "../config/db.js";
import fs from "fs"
import csv from "csv-parser"

config()

export const migrateCSV = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const rows = [];

    //  Leer CSV
    await new Promise((resolve, reject) => {
      fs.createReadStream('datosPrueba.csv')
        .pipe(csv())
        .on("data", (data) => rows.push(data))
        .on("end", resolve)
        .on("error", reject);
    });
 
    //  Iterar filas
    for (const row of rows) {

      // ORDERS
      const ordersRes = await client.query(`INSERT INTO orders
        (order_id, order_date)
        VALUES ($1, $2)
        ON CONFLICT (order_id)
        DO UPDATE SET order_date = EXCLUDED.order_date
        RETURNING order_id`,
        [row.transaction_id, row.date]
      )
      const order_id = ordersRes.rows[0].order_id;

      
      // CUSTOMER
      const customersRes = await client.query(`INSERT INTO customers
        (customer_email, customer_name, customer_address, customer_phone)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (customer_email)
        DO UPDATE SET customer_name = EXCLUDED.customer_name
        RETURNING customer_id`, [row.customer_email, row.customer_name, row.customer_address, row.customer_phone])
     
      //CATEGORIES
      const categoriesRes = await client.query(`INSERT INTO categories
        (category_name)
        VALUES ($1)
        ON CONFLICT (category_name)
        DO NOTHING
        RETURNING category_id`, [row.product_category])

      //SUPPLIERS
      const suppliersRes = await client.query(`INSERT INTO suppliers
        (supplier_email, supplier_name)
        VALUES ($1, $2)
        ON CONFLICT (supplier_email)
        DO UPDATE SET supplier_name = EXCLUDED.supplier_name
        RETURNING supplier_id`,
        [row.supplier_email, row.supplier_name]
      )

      //PRODUCTS
      const productsRes = await client.query(`INSERT INTO suppliers
        (supplier_email, supplier_name)
        VALUES ($1, $2)
        ON CONFLICT (supplier_email)
        DO UPDATE SET supplier_name = EXCLUDED.supplier_name
        RETURNING supplier_id`,
        [row.supplier_email, row.supplier_name]
      )


    }

    await client.query("COMMIT");
    console.log("✅ Migración completada");

  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Error en migración:", error.message);
  } finally {
    client.release();
  }
};
