import { faker } from "@faker-js/faker";

export const categories = ['Home', 'Work', 'Personal'];

export const createNoteData = {
    category: categories[Math.floor(Math.random()*3)],
    checkbox: faker.datatype.boolean(),
    title: faker.lorem.sentence({min: 2, max: 10}),
    description: faker.lorem.paragraphs({min: 1, max: 2}),
}
