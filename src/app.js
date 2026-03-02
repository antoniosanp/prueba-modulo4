import express from 'express';
import cors from "cors"
import routes from './routes/index.js';

const app = express();


app.use(express.json());
app.use(cors())

// Ruta de prueba
app.use("/api", routes)

export default app;