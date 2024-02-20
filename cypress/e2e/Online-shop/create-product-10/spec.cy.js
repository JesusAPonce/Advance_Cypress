
const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]

const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();


console.log(directorioName)
console.log("🚀 ~ module:", module)
console.log(scenarioName, testCaseId)

import { datos } from "../../InfoGlobal"

describe(`${scenarioName} - ${module} `, () => {
    
    let idproduct = testCaseId
    let nameproduct = "Antiparra"
    let priceproduct = "19000"
    let linkimageproduct = "https://www.e-paimun.com.ar/wp-content/uploads/2020/03/antiparra-Ruiz-1.jpg"

    before(() => {
        cy.login(datos.username, datos.password)
    
    });
    it(`Desafio 1 : creando y borrando el producto ${idproduct}`, () => {
        cy.addproduct(nameproduct, priceproduct, linkimageproduct, idproduct)
        cy.searchproduct(idproduct)
        cy.deleteproduct(idproduct)
        console.log(idproduct)
        cy.searchproduct(idproduct)
        cy.get('[id="root"]').should(($el) => {
            expect($el).not.to.contain(nameproduct);
          });
    });
});