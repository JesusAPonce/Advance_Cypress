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
  let idproduct = testCaseId;
  let nameproduct = "Antiparra";
  let priceproduct = "19000";
  let linkimageproduct = "https://www.e-paimun.com.ar/wp-content/uploads/2020/03/antiparra-Ruiz-1.jpg";
  let acces_token;

  let body1 = {
    name: nameproduct,
    price: priceproduct,
    img: linkimageproduct,
    id: idproduct,
  };

  let body2 = {
    name: "Patas de rana",
    price: "22000",
    img: "https://acdn.mitiendanube.com/stores/110/400/products/pata-de-rana-4881-146a75247df46f924f16771690656586-480-0.webp",
  };

  before(() => {
    cy.iniciarSesion(datos.username, datos.password).then(({ token }) => {
      acces_token = token;
    });

    // cy.crearProducto(acces_token, body1)
  });

  it(`Desafio 2 : el producto ${idproduct}`, () => {
    console.log(acces_token);
    cy.log("Buscando producto");
    cy.buscarProducto(acces_token, idproduct).then((response) => {
      console.log(response.body.products.docs);
      if (response.body.products.docs.length == 0) {
        cy.log("El producto no existe hay q crearlo");
        cy.crearProducto(acces_token, body1).then((response) => {
          console.log(response.body.product._id);
          cy.log("modificando producto");
          cy.modificarProducto(acces_token, response.body.product._id, body2);
        });
      } else {
        cy.log("El producto existe hay que eliminarlo");
        cy.borrarProducto(acces_token, response.body.products.docs[0]._id);
      }
    });
  });
});
