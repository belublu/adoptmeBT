import User from "../../src/dao/Users.dao.js"
import mongoose from "mongoose"
import assert from "assert"

mongoose.connect("mongodb+srv://blupelusa:MongoCoder2020@cluster0.xc6zvs5.mongodb.net/TestingAdoptme?retryWrites=true&w=majority&appName=Cluster0")

// Testeo del DAO de usuarios
describe("Testeo del DAO de Usuarios", function () {
    before(function() {
        this.userDao = new User()
    })

    this.beforeEach(async function () {
        await mongoose.connection.collections.users.drop()
    })

    // Test: Obtener todos los usuarios
    it("El get de usuarios debe retornar un array", async function() {
        const result = await this.userDao.get()
        assert.strictEqual(Array.isArray(result), true)
    })

    // Test: Agregar un usuario nuevo a la base de datos
    it("El DAO debe poder agregar un usuario a la base de datos", async function() {
        let user = {
            first_name: "Pelusa",
            last_name: "González",
            email: "pelusa@gonzalez.com",
            password: "1234"
        }

        const result = await this.userDao.save(user)
        assert.ok(result._id)
    })

    // Test: Valido que el usuario tenga un array de mascotas vacío
    it("Valido que el usuario tenga un array de mascotas vacío", async function () {
        let user = {
            first_name: "Juan",
            last_name: "Martínez",
            email: "juan@martinez.com",
            password: "1234"
        }

        const result = await this.userDao.save(user)
        assert.deepStrictEqual(result.pets, [])
    })

    // Test: Se puede obtener un usuario por su email
    it("Se puede obtener un usuario por su email", async function () {
        let user = {
            first_name: "Juan",
            last_name: "Martínez",
            email: "juan@martinez.com",
            password: "1234"
        }

        await this.userDao.save(user)
        const result = await this.userDao.getBy({email: user.email})
        assert.strictEqual(typeof result, "object")
    })

    after(async function () {
        await mongoose.disconnect()
    })
})