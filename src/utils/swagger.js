import swaggerJSDoc from "swagger-jsdoc"
import swaggerUiExpress from "swagger-ui-express"

// Configuración de Swagger
const swaggerSetup = (app) => {
    const swaggerOptions = {
        definition: {
            openapi: "3.0.1",
            info: {
                title: "Documentación de la API de Adoptme",
                description: "App dedicada a encontrar familias adoptivas para mascotas perdidas"
            },
        },
        apis: [
            "./src/docs/**/*.yaml"
        ],
    }
    // Conexión de Swagger a mi servidor de Express
    const specs = swaggerJSDoc(swaggerOptions)
    app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
}




export default swaggerSetup