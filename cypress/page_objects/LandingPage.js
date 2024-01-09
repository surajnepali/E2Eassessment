/// <reference types="cypress" />

class LandingPage{
    
    constructor(){
        this.pageTitle = 'h1.fw-bold.lh-1',
        this.loginButton = "a.btn[href='/notes/app/login']",
        this.registerButton = "a[data-testid='open-register-view']"
    }

    getPageTitle(pageTitle){
        return cy.get(this.pageTitle).should('be.visible').and('have.text', pageTitle);
    }

    getLoginButton(){
        return cy.get(this.loginButton).should('be.visible');
    }

    getRegisterButton(){
        return cy.get(this.registerButton).should('be.visible');
    }

}

export default LandingPage;