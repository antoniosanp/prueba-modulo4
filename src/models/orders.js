import mongoose from "mongoose";

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

export default Orders;