import { Router } from "express"
const router = Router()
import mocksController from "../controllers/mocks.controller.js"

// Ruta para obtener mascotas:
router.get("/mockingpets", mocksController.getMockingPets)

// Ruta para obtener usuarios:
router.get("/mockingusers", mocksController.getMockingUsers)

// Ruta que recibe dos parámetros numéricos (usuarios y mascotas) y los almacena en la BD:
router.post("/generatedata", mocksController.generateData)

export default router