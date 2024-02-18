//* funcion para agregar un producto
import {pagepushinIt} from '../e2e/pagepushinIt'
Cypress.Commands.add('deleteproduct', (idproduct) => {
cy.log("AQUI")
   let selectordeleteproductbutton = (pagepushinIt.pageOnlineShop.deleteproductButton).replace('idproduct', idproduct)
   cy.get(selectordeleteproductbutton).click()
   cy.get(pagepushinIt.pageOnlineShop.deleteproductDetails.acceptdeleteButton).click()
   cy.get('#closeModal').click()
   })