import { pagepushinIt } from "../../e2e/pagepushinIt";
Cypress.Commands.add("addproductlist", (idproduct) => {
  //   cy.intercept("GET", `https://pushing-it.onrender.com/api/products?id=${idproduct}`).as("intercept1");  //   cy.wait("@intercept1");

  cy.get(pagepushinIt.pageOnlineShop.searchTypecombobox).select(1);
  cy.get(pagepushinIt.pageOnlineShop.searchproductInput).clear();

  cy.get(pagepushinIt.pageOnlineShop.searchproductInput).type(idproduct).type("{enter}");
  cy.get(pagepushinIt.pageOnlineShop.addtocartproductoButton.replace("productid", idproduct)).click({ force: true });
  cy.get(pagepushinIt.pageOnlineShop.addtocartproductoDetails.closeButton).click();
  cy.get(pagepushinIt.pageOnlineShop.addtocartproductoButton.replace("productid", idproduct)).click({ force: true });
  cy.get(pagepushinIt.pageOnlineShop.addtocartproductoDetails.closeButton).click();
});
