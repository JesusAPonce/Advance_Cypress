import { pagepushinIt } from "../../e2e/pagepushinIt";
Cypress.Commands.add("checkoutproduct", (body) => {
  cy.get(pagepushinIt.pageCheckout.firstnameLabel).type(body.nombre);
  cy.get(pagepushinIt.pageCheckout.lastnameLabel).type(body.apellido);
  cy.get(pagepushinIt.pageCheckout.cardnumberLabel).type(body.NumeroTarjeta);
  cy.intercept("POST", "https://pushing-it.onrender.com/api/purchase").as("intercept1");
  cy.get(pagepushinIt.pageCheckout.purchaseButton).click();
  cy.wait("@intercept1");
});
