/// <reference types="cypress" />

const LandingPage = require("../../page_objects/LandingPage");
const LoginPage = require("../../page_objects/LoginPage");
const DashboardPage = require("../../page_objects/DashboardPage");
const RegisterPage = require("../../page_objects/RegisterPage");
const { registerUserData } = require("../../data/registerUser.data");
const { createNoteData } = require("../../data/createNote.data");
const { errorMessage } = require("../../message/note.message");

const landingPage = new LandingPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const registerPage = new RegisterPage();

describe("Create Note E2E Automation", () => {

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
        landingPage.getPageTitle("Welcome to Notes App");
        landingPage.getLoginButton().should('have.text', "Login").click();
        loginPage.login(Cypress.env('email'), Cypress.env('password'));
    });

    it("Can't create note without filling all fields", () => {
        dashboardPage.getAddNoteButton().should('have.text', "+ Add Note").click();
        dashboardPage.addNote(createNoteData.category, "", "{selectall}{del}", "{selectall}{del}");
        dashboardPage.getSubmitButton().should('have.text', "Create").click();
        dashboardPage.getValidationMessage().eq(1).should('have.text', `Title ${errorMessage.isRequired}`);
        dashboardPage.getValidationMessage().eq(2).should('have.text', `Description ${errorMessage.isRequired}`);
    });

    it("Can't create note without filling the title", () => {
        dashboardPage.getAddNoteButton().should('have.text', "+ Add Note").click();
        dashboardPage.addNote(createNoteData.category, createNoteData.checkbox, "{selectall}{del}", createNoteData.description);
        dashboardPage.getSubmitButton().should('have.text', "Create").click();
        dashboardPage.getValidationMessage().should('have.text', `Title ${errorMessage.isRequired}`);
    });

    it("Can't create note without filling the description", () => {
        dashboardPage.getAddNoteButton().should('have.text', "+ Add Note").click();
        dashboardPage.addNote(createNoteData.category, createNoteData.checkbox, createNoteData.title, "{selectall}{del}");
        dashboardPage.getSubmitButton().should('have.text', "Create").click();
        dashboardPage.getValidationMessage().should('have.text', `Description ${errorMessage.isRequired}`);
    });

    it("Data is cleared if cross icon is clicked", () => {
        dashboardPage.getAddNoteButton().should('have.text', "+ Add Note").click();
        dashboardPage.addNote(createNoteData.category, createNoteData.checkbox, createNoteData.title, createNoteData.description);
        dashboardPage.getCrossIcon().click();
        dashboardPage.getAddNoteButton().should('have.text', "+ Add Note").click();
        dashboardPage.getTitleInput().should('be.empty');
        dashboardPage.getDescriptionInput().should('be.empty');
    });

    it("Data is cleared if cancel button is clicked", () => {
        dashboardPage.getAddNoteButton().should('have.text', "+ Add Note").click();
        dashboardPage.addNote(createNoteData.category, createNoteData.checkbox, createNoteData.title, createNoteData.description);
        dashboardPage.getCancelButton().click();
        dashboardPage.getAddNoteButton().should('have.text', "+ Add Note").click();
        dashboardPage.getTitleInput().should('be.empty');
        dashboardPage.getDescriptionInput().should('be.empty');
    });

    it("Note is created successfully", () => {
        dashboardPage.getAddNoteButton().should('have.text', "+ Add Note").click();
        dashboardPage.addNote(createNoteData.category, createNoteData.checkbox, createNoteData.title, createNoteData.description);
        dashboardPage.getSubmitButton().should('have.text', "Create").click();
        dashboardPage.verifyFirstNote(createNoteData.title, createNoteData.checkbox);
    });

});