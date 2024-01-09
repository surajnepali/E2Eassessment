const { faker } = require('@faker-js/faker');


export const registerUserData = {
    email: faker.internet.email().toLowerCase(),
    name: faker.internet.displayName(),
    password: faker.internet.password(),
    confirmPassword: faker.internet.password(),
}