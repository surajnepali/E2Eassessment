const { faker } = require('@faker-js/faker');


export const registerUserData = {
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    confirmPassword: faker.internet.password(),
}