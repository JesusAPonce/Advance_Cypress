import { pagepushinIt } from "../../e2e/pagepushinIt";
Cypress.Commands.add("searchproductmodify", (idproduct) => {
  cy.get(pagepushinIt.pageHome.moduleOnlineShop).click();
  cy.get(pagepushinIt.pageOnlineShop.searchTypecombobox).select(1);
  cy.get(pagepushinIt.pageOnlineShop.searchproductInput).clear();
  cy.intercept("GET", `https://pushing-it.onrender.com/api/products?id=${idproduct}`).as("intercept1");
  cy.get(pagepushinIt.pageOnlineShop.searchproductInput).type(idproduct).type("{enter}");
  cy.wait("@intercept1");
});
