const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[2];

const scenarioName = directorioName
  .slice(directorioName.lastIndexOf("/") + 1)
  .split("-")
  .slice(0, -1)
  .join("-");
const testCaseId = directorioName.split(/[-]/).pop();

console.log(directorioName);
console.log("🚀 ~ module:", module);
console.log(scenarioName, testCaseId);

import { datos } from "../../InfoGlobal";

describe(`${scenarioName} - ${module} `, () => {
  let idProduct = testCaseId;
  let nameProduct = "Antiparra";
  let priceProduct = "19000";
  let linkImageProduct = "https://www.e-paimun.com.ar/wp-content/uploads/2020/03/antiparra-Ruiz-1.jpg";

  before(() => {
    cy.login(datos.username, datos.password);
  });
  it(`Desafio 1 : creando y borrando el producto ${idProduct}`, () => {
    cy.addproduct(nameProduct, priceProduct, linkImageProduct, idProduct);
    cy.searchproduct(idProduct);
    cy.deleteproduct(idProduct);
    console.log(idProduct);
    cy.searchproduct(idProduct);
    cy.get('[id="root"]').should(($el) => {
      expect($el).not.to.contain(nameProduct);
    });
  });
});
