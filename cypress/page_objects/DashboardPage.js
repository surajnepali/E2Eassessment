/// <reference types="cypress" />

class DashboardPage{

    constructor(){
        this.addNoteButton = "button[data-testid='add-new-note']",
        this.addNoteContainer = "div.modal-content",
        this.crossIcon = "button.btn-close.me-2",
        this.noteCategoryDropdown = "select[name='category']",
        this.checkboxInput = "input[type='checkbox']",
        this.titleInput = "input#title",
        this.descriptionInput = "textarea#description",
        this.submitButton = "button[data-testid='note-submit']",
        this.cancelButton = "button[data-testid='note-cancel']",
        this.validationMessage = "div.invalid-feedback",
        this.notesList = "div[data-testid='notes-list']",
        this.noteCard = "div[data-testid='note-card']",
        this.noteCardTitle = "div[data-testid='note-card-title']",
        this.noteEditButton = "button[data-testid='note-edit']"
    }

    getAddNoteButton(){
        return cy.get(this.addNoteButton).should('be.visible');
    }

    getAddNoteContainer(){
        return cy.get(this.addNoteContainer).should('be.visible');
    }

    getCrossIcon(){
        return cy.get(this.crossIcon).should('be.visible');
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

    getSubmitButton(){
        return cy.get(this.submitButton).should('be.visible');
    }

    getCancelButton(){
        return cy.get(this.cancelButton).should('be.visible');
    }

    getValidationMessage(){
        return cy.get(this.validationMessage).should('be.visible');
    }

    getNotesList(){
        return cy.get(this.notesList).should('be.visible');
    }

    getNoteCard(){
        return cy.get(this.noteCard).should('be.visible');
    }

    getNoteEditButton(){
        return cy.get(this.noteEditButton).should('be.visible');
    }

    addNote(category, checkbox, title, description){
        this.getAddNoteContainer().should('be.visible').within(() => {
            this.getNoteCategoryDropdown().select(category);
            cy.log("Value of checkbox: " + checkbox);
            if(checkbox){
                this.getCheckboxInput().check();
            }
            this.getTitleInput().type(title);
            this.getDescriptionInput().type(description);
        });
    }

    verifyFirstNote(title){
        cy.wait(1500);
        this.getNotesList().find(this.noteCard).each(($el, index, $list) => {
            const noteTitle = $el.find(this.noteCardTitle).text();
            if(noteTitle === title){
                cy.log("Note found: " + title);
            }
        });
    }

    findAndClickEditButton(title) {
        this.getNotesList().find(this.noteCard).each(($el, index, $list) => {
            const noteTitle = $el.find(this.noteCardTitle).text();
            if (noteTitle === title) {
                cy.wrap($el).within(() => {
                    this.getNoteEditButton().click();
                })
            }
        });
    }
    

    editNote(category, checkbox, title, description){
        this.getAddNoteContainer().should('be.visible').within(() => {
            this.getNoteCategoryDropdown().select(category);
            cy.log("Value of checkbox: " + checkbox);
            if(checkbox){
                this.getCheckboxInput().check();
            }
            this.getTitleInput().clear();
            this.getTitleInput().type(title);
            this.getDescriptionInput().clear();
            this.getDescriptionInput().type(description);
        });
    }

}

export default DashboardPage;