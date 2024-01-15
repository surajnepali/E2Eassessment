/// <reference types="cypress" />

const LandingPage = require("../../page_objects/LandingPage");
const LoginPage = require("../../page_objects/LoginPage");
const DashboardPage = require("../../page_objects/DashboardPage");
const { createNoteData, updateNoteData } = require("../../data/createNote.data");
const { errorMessage } = require("../../message/note.message");

const landingPage = new LandingPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

let noteTitle;

describe("Update Note E2E Automation", () => {

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
        landingPage.getPageTitle("Welcome to Notes App");
        landingPage.getLoginButton().should('have.text', "Login").click();
        loginPage.login(Cypress.env('email'), Cypress.env('password'));
        cy.wait(2000);
    });

    it("Note is created successfully", () => {
        dashboardPage.getAddNoteButton().should('have.text', "+ Add Note").click();
        dashboardPage.addNote(createNoteData.category, createNoteData.checkbox, createNoteData.title, createNoteData.description);
        dashboardPage.getSubmitButton().should('have.text', "Create").click();
        dashboardPage.verifyFirstNote(createNoteData.title);
        noteTitle = createNoteData.title;
    });

    it("Can't update note without filling the title", () => {
        dashboardPage.findAndClickEditButton(noteTitle);
        dashboardPage.editNote(updateNoteData.category, updateNoteData.checkbox, "{selectall}{del}", updateNoteData.description);
        dashboardPage.getSubmitButton().should('have.text', "Save").click();
        dashboardPage.getValidationMessage().should('have.text', `Title ${errorMessage.isRequired}`);
    });

    it("Can't update note without filling the description", () => {
        dashboardPage.findAndClickEditButton(noteTitle);
        dashboardPage.editNote(updateNoteData.category, updateNoteData.checkbox, updateNoteData.title, "{selectall}{del}");
        dashboardPage.getSubmitButton().should('have.text', "Save").click();
        dashboardPage.getValidationMessage().should('have.text', `Description ${errorMessage.isRequired}`);
    });

    it("Data should be reset if cross icon is clicked", () => {
        dashboardPage.findAndClickEditButton(noteTitle);
        dashboardPage.editNote(updateNoteData.category, updateNoteData.checkbox, updateNoteData.title, updateNoteData.description);
        dashboardPage.getCancelButton().click();
        dashboardPage.findAndClickEditButton(createNoteData.title);
        dashboardPage.getTitleInput().invoke('val').should('eq', createNoteData.title);
        dashboardPage.getDescriptionInput().invoke('val').should('eq', createNoteData.description);
    });

    it("Data should be reset if cancel button is clicked", () => {
        dashboardPage.findAndClickEditButton(noteTitle);
        dashboardPage.editNote(updateNoteData.category, updateNoteData.checkbox, updateNoteData.title, updateNoteData.description);
        dashboardPage.getCancelButton().click();
        dashboardPage.findAndClickEditButton(createNoteData.title);
        dashboardPage.getTitleInput().invoke('val').should('eq', createNoteData.title);
        dashboardPage.getDescriptionInput().invoke('val').should('eq', createNoteData.description);
    });

    it("Note is updated successfully", () => {
        dashboardPage.findAndClickEditButton(noteTitle);
        dashboardPage.editNote(updateNoteData.category, updateNoteData.checkbox, updateNoteData.title, updateNoteData.description);
        dashboardPage.getSubmitButton().should('have.text', "Save").click();
        dashboardPage.verifyFirstNote(updateNoteData.title, updateNoteData.checkbox);
    });

});