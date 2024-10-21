import { faker } from '@faker-js/faker'
import { createHash } from '../utils/index.js'

class MockingService {
    static async generateMockingUsers(number) {
        const users = []
        
        for (let i = 0; i < number; i++) {
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash("coder123"),
                role: faker.helpers.arrayElement(['user', 'admin']),
                pets: []
            }
            users.push(user)
        }
        return users
    }

    static async generateMockingPets(number) {
        const pets = []

        for (let i = 0; i < number; i++) {
            const pet = {
                name: faker.animal.dog(),
                specie: faker.animal.type(),
                birthDate: faker.date.past(),
                image: "https://picsum.photos/300/300",
                adopted: false
            }
            pets.push(pet)
        }
        return pets
    }
}

export default MockingService