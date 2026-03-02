import { Router } from 'express';
import tablesRouter from "./tables.routes.js"


const router = Router();
router.use("/tables",tablesRouter)


export default router;