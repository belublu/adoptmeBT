import User from "../../src/dao/Users.dao.js"
import mongoose from "mongoose"
import chai from "chai"

const expect = chai.expect

// Conecto a la base de datos
mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://blupelusa:MongoCoder2020@cluster0.xc6zvs5.mongodb.net/TestingAdoptme?retryWrites=true&w=majority&appName=Cluster0")

// Testeo del DAO de usuarios
describe("Testeo el DAO de Usuarios con Chai", function () {
    before(function () {
        this.usersDao = new User()
    })

    beforeEach(async function () {
        await mongoose.connection.collections.users.drop()
    })

    // Test: Obtener todos los usuarios
    it("El get de usuario retorna un array", async function () {
        const resultadoChai = await this.usersDao.get()
        expect(Array.isArray(resultadoChai)).to.be.true
    })


    // Test: Agregar un usuario nuevo a la base de datos
    it("El DAO debe poder agregar un usuario nuevo a la BD", async function () {
        let usuario = {
            first_name: "Pelusa",
            last_name: "Pilin",
            email: "pelusa@pelin.com",
            password: "coder123"
        }

        const resultado = await this.usersDao.save(usuario)
        expect(resultado).to.have.property("_id")
    })


    // Test: Valido que el usuario tenga un array de mascotas vacío
    it("Valido que el usuario tenga un array de mascotas vacío", async function () {
        let usuario = {
            first_name: "Pepi",
            last_name: "Pilin",
            email: "pepi@pelin.com",
            password: "coder123"
        }
        const resultado = await this.usersDao.save(usuario)
        expect(resultado.pets).to.deep.equal([])
    })


    // Test: Se puede obtener un usuario por su email
    it( "El DAO puede obtener un usuario por email", async function () {
        let usuario = {
            first_name: "Pepi",
            last_name: "Pilin",
            email: "pepi@pelin.com",
            password: "coder123"
        }

        await this.usersDao.save(usuario)
        const user = await this.usersDao.getBy({email: usuario.email})
        expect(user).to.be.an("object")
    })

    after(async function () {
        await mongoose.disconnect()
    })
})