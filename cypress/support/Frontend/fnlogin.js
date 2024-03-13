import { pagepushinIt } from "../../e2e/pagepushinIt"

Cypress.Commands.add('login', (user,pass) => {
   
    cy.visit('https://pushing-it.vercel.app/');
    cy.get(pagepushinIt.pageLogin.registertoggle).dblclick()
    cy.get(pagepushinIt.pageLogin.registertoggleDetails.usernameInput).type(user)
    cy.get(pagepushinIt.pageLogin.registertoggleDetails.passwordInput).type(pass)
    cy.get(pagepushinIt.pageLogin.registertoggleDetails.submitButton).click()
    cy.wait(1000)
   })