import app from './src/app.js';
import dotenv from 'dotenv';
import express from "express"

dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});