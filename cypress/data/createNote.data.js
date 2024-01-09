import { faker } from "@faker-js/faker";

export const createNoteData = {
    category: categories[Math.floor(Math.random()*3)],
    checkbox: faker.datatype.boolean(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),
}

export const categories = ['Home', 'Work', 'Personal'];