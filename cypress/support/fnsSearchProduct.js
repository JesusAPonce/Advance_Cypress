//* funcion para agregar un producto
import {pagepushinIt} from '../e2e/pagepushinIt'
Cypress.Commands.add('searchproduct', (idproduct) => {
cy.log("ESTOY ACA")
   cy.get(pagepushinIt.pageOnlineShop.searchTypecombobox).select(1)
   cy.get(pagepushinIt.pageOnlineShop.searchproductInput).clear()
   cy.get(pagepushinIt.pageOnlineShop.searchproductInput).type(idproduct).type('{enter}');

   
   
    
   })