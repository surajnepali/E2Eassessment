/// <reference types="cypress" />

class Dashboard{

    constructor(){
        this.addNoteButton = "button[data-testid='add-new-note']",
        this.addNoteContainer = "div.modal-content",
        this.noteCategoryDropdown = "select[name='category']",
        this.checkboxInput = "input[type='checkbox']",
        this.titleInput = "input#title",
        this.descriptionInput = "textarea#description",
        this.createButton = "button[data-testid='note-submit']",
        this.cancelButton = "button[data-testid='note-cancel']"
    }

    getAddNoteButton(){
        return cy.get(this.addNoteButton).should('be.visible');
    }

    getAddNoteContainer(){
        return cy.get(this.addNoteContainer).should('be.visible');
    }

    getNoteCategoryDropdown(){
        return cy.get(this.noteCategoryDropdown).should('be.visible');
    }

    getCheckboxInput(){
        return cy.get(this.checkboxInput).should('be.visible');
    }

    getTitleInput(){
        return cy.get(this.titleInput).should('be.visible');
    }

    getDescriptionInput(){
        return cy.get(this.descriptionInput).should('be.visible');
    }

    getCreateButton(){
        return cy.get(this.createButton).should('be.visible');
    }

    getCancelButton(){
        return cy.get(this.cancelButton).should('be.visible');
    }

    addNote(){
        this.getAddNoteButton().click();
        this.getAddNoteContainer().should('be.visible');
        this.getNoteCategoryDropdown().select('Work');
        this.getCheckboxInput().check();
        this.getTitleInput().type('My new note');
        this.getDescriptionInput().type('My new note description');
        this.getCreateButton().click();
        this.getCancelButton().click();
    }

}

export default Dashboard;