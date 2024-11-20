import supertest from "supertest"
import chai from "chai"

const expect = chai.expect
const requester = supertest("http://localhost:8080")

// Testing del módulo Adoptions
describe("Testing de la api Adoptme", () => {
    describe("Test de adoptions", () => {
        it("Debe retornar todas las adopciones", async () => {
            const res = await requester.get("/api/adoptions")
            expect(res.statusCode).to.equal(200)
            expect(res.body.status).to.equal("success")
            expect(res.body.payload).to.be.an("array")
        })

        it("Debe retornar una adopción por su id", async () => {
            const adoptionId = "673b983d1a0968660c9c4734"
            const res = await requester.get(`/api/adoptions/${adoptionId}`)
            expect(res.statusCode).to.equal(200)
            expect(res.body.status).to.equal("success")
            expect(res.body.payload).to.be.an("object")
        })

        it("Debe retornar un error si el id no existe", async () => {
            const inexistId = "646f1f77bcf86cd799439011";
            const res = await requester.get(`/api/adoptions/${inexistId}`)
            expect(res.statusCode).to.equal(404)
            expect(res.body.status).to.equal("error")
            expect(res.body.error).to.equal("Adoption not found")
        })

        it("Debe crear una nueva adopcion", async () => {
            const petId = "673bba1357fdc790b72f1e6b"
            const userId = "673bba1357fdc790b72f1e45"
            const res = await requester.post(`/api/adoptions/${userId}/${petId}`)
            console.log(res)
            expect(res.statusCode).to.equal(200)
            expect(res.body.status).to.equal("success")
            expect(res.body.message).to.equal("Pet adopted")
            expect(res.body).to.have.property("adoptionId")
        })
    })
})