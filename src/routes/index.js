import { Router } from 'express';
import tablesRouter from "./tables.routes.js"
import suppliersRouter from "./suppliers.routes.js"
import mongoRouter from "./mongo.routes.js"
import businessRouter from "./businessintelligence.routes.js"

const router = Router();
router.use("/tables", tablesRouter)
router.use("/suppliers", suppliersRouter)
router.use("/mongo", mongoRouter)
router.use("/business",businessRouter)


export default router;