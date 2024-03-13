//* funcion para agregar un producto
import { pagepushinIt } from '../../e2e/pagepushinIt'
Cypress.Commands.add('addproduct', (nameproduct, priceproduct, linkimageproduct, idproduct) => {
   cy.get(pagepushinIt.pageHome.moduleOnlineShop).click()
   cy.get(pagepushinIt.pageOnlineShop.addProductoButton).click()
   cy.get(pagepushinIt.pageOnlineShop.addProductoButtonDetails.productNameInput).type(nameproduct)
   cy.get(pagepushinIt.pageOnlineShop.addProductoButtonDetails.productPriceInput).type(priceproduct)
   cy.get(pagepushinIt.pageOnlineShop.addProductoButtonDetails.productCardInput).type(linkimageproduct)
   cy.get(pagepushinIt.pageOnlineShop.addProductoButtonDetails.productIdInput).type(idproduct)
   cy.get(pagepushinIt.pageOnlineShop.addProductoButtonDetails.createProductButton).click()
 
   cy.get('#closeModal').click()
 

})