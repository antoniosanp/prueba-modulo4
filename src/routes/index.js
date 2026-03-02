import { Router } from 'express';
import tablesRouter from "./tables.routes.js"
import suppliersRouter from "./suppliers.routes.js"


const router = Router();
router.use("/tables", tablesRouter)
router.use("/suppliers", suppliersRouter)


export default router;