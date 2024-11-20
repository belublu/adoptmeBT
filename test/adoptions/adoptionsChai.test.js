import Adoption from "../../src/dao/Adoption.js"
import mongoose from "mongoose"
import chai from "chai"

const expect = chai.expect

// Conecto a la base de datos
mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://blupelusa:MongoCoder2020@cluster0.xc6zvs5.mongodb.net/TestingAdoptme?retryWrites=true&w=majority&appName=Cluster0")

// Testeo del DAO de adopciones
describe("Testeo el DAO de Adopciones con Chai", function () {
    before(function () {
        this.adoptionsDao = new Adoption()
    })

    beforeEach(async function () {
        await mongoose.connection.collections.adoptions.drop()
    })

    // Test: Obtener todas las adopciones
    it("El get de adopciones retorna un array", async function () {
        const result = await this.adoptionsDao.get()
        expect(Array.isArray(result)).to.be.true
    })

    // Test: Crear una adopción
    it("El DAO debe poder crear una adopcion", async function () {
        let adoption = {
            owner: "62b3e6d1f2a0f7e8e5e1a4f7",
            pet: "62b3e6d1f2a0f7e8e5e1a4f8"
        }

        const result = await this.adoptionsDao.save(adoption)
        expect(result).to.have.property("_id")
    })

    // Test: Obtener una adopcion por id
    it("El DAO debe poder obtener una adopcion por id", async function () {
        let adoption = {
            owner: "62b3e6d1f2a0f7e8e5e1a4f7",
            pet: "62b3e6d1f2a0f7e8e5e1a4f8"
        }

        const adoptionNew = await this.adoptionsDao.save(adoption)
        const result = await this.adoptionsDao.getBy({ _id: adoptionNew._id })
        expect(result).to.be.an("object")
        expect(result).to.have.property("_id")
    })

    // Test: Eliminar correctamente una adopcion
    it("El DAO debe poder eliminar una adopcion", async function () {
        let adoption = {
            owner: "62b3e6d1f2a0f7e8e5e1a4f7",
            pet: "62b3e6d1f2a0f7e8e5e1a4f8"
        }

        const adoptionNew = await this.adoptionsDao.save(adoption)
        const result = await this.adoptionsDao.delete(adoptionNew._id)
        expect(result).to.be.an("object")
    })
    

    after(async function () {
        await mongoose.disconnect()
    })
})