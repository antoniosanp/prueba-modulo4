import { pool } from "../config/db.js";


export const createTables = async ()=>{
    pool.query(`CREATE TABLE IF NOT EXISTS "customers" (
	"customer_id" SERIAL NOT NULL UNIQUE,
	"customer_email" VARCHAR(255) NOT NULL UNIQUE,
	"customer_name" VARCHAR(255) NOT NULL,
	"customer_address" VARCHAR(255) NOT NULL,
	"customer_phone" VARCHAR(255) NOT NULL,
	PRIMARY KEY("customer_id"));

CREATE TABLE IF NOT EXISTS "suppliers" (
	"supplier_id" SERIAL NOT NULL UNIQUE,
	"supplier_email" VARCHAR(255) NOT NULL UNIQUE,
	"supplier_name" VARCHAR(255) NOT NULL,
	PRIMARY KEY("supplier_id"));

CREATE TABLE IF NOT EXISTS "products" (
	"product_id" SERIAL NOT NULL UNIQUE,
	"product_name" VARCHAR(255) NOT NULL,
	"unit_price" DECIMAL NOT NULL,
	"product_sku" VARCHAR(255) NOT NULL UNIQUE,
	"category_id" INTEGER NOT NULL,
	PRIMARY KEY("product_id"));

CREATE TABLE IF NOT EXISTS "orders" (
	"order_id" VARCHAR(255) NOT NULL UNIQUE,
	"order_date" DATE NOT NULL,
	PRIMARY KEY("order_id"));

CREATE TABLE IF NOT EXISTS "categories" (
	"category_id" SERIAL NOT NULL UNIQUE,
	"category_name" VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY("category_id"));

CREATE TABLE IF NOT EXISTS "transactions" (
	"transaction_id" SERIAL NOT NULL UNIQUE,
	"order_id" VARCHAR(255) NOT NULL,
	"customer_id" INTEGER NOT NULL,
	"supplier_id" INTEGER NOT NULL,
	"product_id" INTEGER NOT NULL,
	"quantity" INTEGER NOT NULL,
	"total_line_value" DECIMAL NOT NULL,
	PRIMARY KEY("transaction_id"));

ALTER TABLE "products"
ADD FOREIGN KEY("category_id") REFERENCES "categories"("category_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transactions"
ADD FOREIGN KEY("order_id") REFERENCES "orders"("order_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transactions"
ADD FOREIGN KEY("customer_id") REFERENCES "customers"("customer_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transactions"
ADD FOREIGN KEY("supplier_id") REFERENCES "suppliers"("supplier_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transactions"
ADD FOREIGN KEY("product_id") REFERENCES "products"("product_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;`)

console.log("✅ Tables created");
}

export const deleteTables = async () =>{
    pool.query()
    console.log(" 0.0 Tables deleted")
}