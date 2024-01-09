/// <reference types="cypress" />

class RegisterPage{

    constructor(){
        this.pageTitle = 'h1',
        this.emailInput = "input[data-testid='register-email']",
        this.nameInput = "input[data-testid='register-name']",
        this.passwordInput = "input[data-testid='register-password']",
        this.confirmPasswordInput = "input[data-testid='register-confirm-password']",
        this.registerSubmitButton = "button[data-testid='register-submit']",
        this.validationMessage = "div.invalid-feedback",
        this.registrationSuccessMessage = "div.alert.alert-success b",
        this.emailAlreadyExistsMessage = "[data-testid='alert-message']"
    }

    getPageTitle(pageTitle){
        return cy.get(this.pageTitle).should('be.visible').and('have.text', pageTitle);
    }

    getEmailInput(){
        return cy.get(this.emailInput).should('be.visible');
    }

    getNameInput(){
        return cy.get(this.nameInput).should('be.visible');
    }

    getPasswordInput(){
        return cy.get(this.passwordInput).should('be.visible');
    }

    getConfirmPasswordInput(){
        return cy.get(this.confirmPasswordInput).should('be.visible');
    }

    getRegisterSubmitButton(){
        return cy.get(this.registerSubmitButton).should('be.visible');
    }

    getValidationMessage(){
        return cy.get(this.validationMessage).should('be.visible');
    }

    getRegistrationSuccessMessage(){
        return cy.get(this.registrationSuccessMessage).should('be.visible');
    }

    getEmailAlreadyExistsMessage(){
        return cy.get(this.emailAlreadyExistsMessage).should('be.visible');
    }

    register(email, name, password, confirmPassword){
        this.getEmailInput().type(email);
        this.getNameInput().type(name);
        this.getPasswordInput().type(password);
        this.getConfirmPasswordInput().type(confirmPassword);
        this.getRegisterSubmitButton().click();
    }

}

export default RegisterPage;