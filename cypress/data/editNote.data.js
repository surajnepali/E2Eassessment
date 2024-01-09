import { faker } from "@faker-js/faker";
import { categories } from "./createNote.data";

export const editNoteData = {
    category: categories[Math.floor(Math.random()*3)],
    checkbox: faker.datatype.boolean(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),
}