/// <reference types="cypress" />

const LandingPage = require("../../page_objects/LandingPage");
const RegisterPage = require("../../page_objects/RegisterPage");
const { registerUserData } = require("../../data/registerUser.data");
const { errorMessage, successMessage } = require("../../message/register.message");

const landingPage = new LandingPage();
const registerPage = new RegisterPage();

describe("Register User E2E Automation", () => {

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
        landingPage.getPageTitle("Welcome to Notes App");
        landingPage.getRegisterButton().should('have.text', "Create an account").click();
    });

    it("Can't register without all fields", () => {
        registerPage.register("{selectall}{del}", "{selectall}{del}", "{selectall}{del}", "{selectall}{del}");
        registerPage.getValidationMessage().eq(0).should('have.text', `Email address ${errorMessage.isRequired}`);
        registerPage.getValidationMessage().eq(1).should('have.text', `User name ${errorMessage.isRequired}`);
        registerPage.getValidationMessage().eq(2).should('have.text', `Password ${errorMessage.isRequired}`); 
        registerPage.getValidationMessage().eq(3).should('have.text', `Confirm Password ${errorMessage.isRequired}`);
    });

    it("Can't register without email", () => {
        registerPage.register("{selectall}{del}", registerUserData.name, registerUserData.password, registerUserData.password);
        registerPage.getValidationMessage().should('have.text', `Email address ${errorMessage.isRequired}`);
    });

    it("Can't register without name", () => {
        registerPage.register(registerUserData.email, "{selectall}{del}", registerUserData.password, registerUserData.password);
        registerPage.getValidationMessage().should('have.text', `User name ${errorMessage.isRequired}`);
    });

    it("Can't register without password", () => {
        registerPage.register(registerUserData.email, registerUserData.name, "{selectall}{del}", registerUserData.password);
        registerPage.getValidationMessage().eq(2).should('have.text', `Password ${errorMessage.isRequired}`); 
    });

    it("Can't register without confirm password", () => {
        registerPage.register(registerUserData.email, registerUserData.name, registerUserData.password, "{selectall}{del}");
        registerPage.getValidationMessage().should('have.text', `Confirm Password ${errorMessage.isRequired}`);
    });

    it("Can't register with invalid email", () => {
        registerPage.register("test", registerUserData.name, registerUserData.password, registerUserData.password);
        registerPage.getValidationMessage().should('have.text', `Email address ${errorMessage.isInvalid}`);
    });

    it("Can't register with different password and confirm password", () => {
        registerPage.register(registerUserData.email, registerUserData.name, registerUserData.password, registerUserData.password + "1");
        registerPage.getValidationMessage().should('have.text', `${errorMessage.passwordNotMatching}`);
    });

    it("Can register successfully", () => {
        registerPage.register(registerUserData.email, registerUserData.name, registerUserData.password, registerUserData.password);
        registerPage.getRegistrationSuccessMessage().should('have.text', `${successMessage.registrationSuccess}`);
    });

    it("Can't register with existing email", () => {
        registerPage.register(registerUserData.email, registerUserData.name, registerUserData.password, registerUserData.password);
        registerPage.getEmailAlreadyExistsMessage().should('have.text', `${errorMessage.emailAlreadyExists}`);
    });

});