import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { connectDB } from "../config/mongodb.js";

// Define Student Schema for MongoDB

const ordersSchema = new mongoose.Schema({
  order_title: { 
    type: String, 
    required: true, 
    unique: true 
  },
  order_date :  Date,
  products : [
    {
        product_sku: String,
        product_name: String,
        price: Number,
        quantity: Number,
    },
  ]
});

const Orders = mongoose.model("orders", ordersSchema);

// Function to read and parse CSV
const parseCSV = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index];
    });
    records.push(record);
  }
  return records;
};

// Main migration function
export const migrateToMongoDB = async () => {
  await connectDB();

  const csvPath = path.join(process.cwd(), "datosPrueba.csv");
  const records = parseCSV(csvPath);

  // Group courses by student_email
  const ordersMap = new Map();

  records.forEach((record) => {
    const title = record.transaction_id;
    
    if (!ordersMap.has(title)) {
      ordersMap.set(title, {
        order_title: title,
        order_date: record.date,
        products: [],
      });
    }

    // Add course to student's courses array
      ordersMap.get(title).products.push({
      product_sku: record.product_sku,
      product_name: record.product_name,
      price: record.unit_price,
      quantity: record.quantity,
      
    });
  });

  // Convert Map to array
  const students = Array.from(studentsMap.values());

  // Clear existing data and insert new data
  await Student.deleteMany({});
  
  const insertedStudents = await Student.insertMany(students);
  
  console.log(`Migration complete: ${insertedStudents.length} students migrated to MongoDB`);
  
  return insertedStudents.length;
};

//------------------------------------------------------------------

