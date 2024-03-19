import { pagepushinIt } from "../../e2e/pagepushinIt";
Cypress.Commands.add("checkoutproduct", (body) => {
  //   cy.intercept("GET", `https://pushing-it.onrender.com/api/products?id=${idproduct}`).as("intercept1");  //   cy.wait("@intercept1");
  cy.get(pagepushinIt.pageCheckout.firstnameLabel).type(body.nombre);
  cy.get(pagepushinIt.pageCheckout.lastnameLabel).type(body.apellido);
  cy.get(pagepushinIt.pageCheckout.cardnumberLabel).type(body.NumeroTarjeta);
  cy.get(pagepushinIt.pageCheckout.purchaseButton).click();
});
