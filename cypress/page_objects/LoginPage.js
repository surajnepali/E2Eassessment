/// <reference types="cypress" />

class LoginPage{

    constructor(){
        this.pageTitle = 'h1',
        this.emailInput = "input[data-testid='login-email']",
        this.passwordInput = "input[data-testid='login-password']",
        this.loginButton = "button[data-testid='login-submit']"
    }

    getPageTitle(pageTitle){
        return cy.get(this.pageTitle).should('be.visible').and('have.text', pageTitle);
    }

    getEmailInput(){
        return cy.get(this.emailInput).should('be.visible');
    }

    getPasswordInput(){
        return cy.get(this.passwordInput).should('be.visible');
    }

    getLoginButton(){
        return cy.get(this.loginButton).should('be.visible');
    }

    login(email, password){
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }
    
}

export default LoginPage;