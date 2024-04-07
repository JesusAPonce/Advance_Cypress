const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[2];

const nombreArchivo = directorioName.slice(directorioName.lastIndexOf("/") + 1);

// Extraemos el nombre del escenario hasta el primer guion '-
const scenarioName = nombreArchivo.split("-").slice(0, 2).join("-");

console.log(scenarioName);
const testCaseId1 = directorioName.split(/[-]/)[3];
const testCaseId2 = directorioName.split(/[-]/)[5];
console.log(testCaseId1, testCaseId2);
console.log(directorioName);
console.log("🚀 ~ module:", module);
console.log(scenarioName);

import { datos } from "../../InfoGlobal";
import { pagepushinIt } from "../../pagepushinIt";

describe(`${scenarioName} - ${module} `, () => {
  let idproduct1 = testCaseId1;
  let idproduct2 = testCaseId2;
  let nameproduct = "Antiparra";
  let priceproduct = "19000";
  let linkimageproduct = "https://www.e-paimun.com.ar/wp-content/uploads/2020/03/antiparra-Ruiz-1.jpg";
  let acces_token;

  let body1 = { name: nameproduct, price: priceproduct, img: linkimageproduct, id: idproduct1 };

  let body2 = {
    id: idproduct2,
    name: "Patas de rana",
    price: "22000",
    img: "https://acdn.mitiendanube.com/stores/110/400/products/pata-de-rana-4881-146a75247df46f924f16771690656586-480-0.webp",
  };

  let body3 = {
    nombre: "Jesus",
    apellido: "Ponce",
    NumeroTarjeta: "1234567891011121",
  };
  beforeEach(() => {
    cy.iniciarSesion(datos.username, datos.password).then(({ token }) => {
      acces_token = token;
    });
  });

  it.only(`Desafio 3 : creando los productos ${idproduct1} y  ${idproduct2}`, () => {
    console.log(acces_token);
    cy.log("Buscando producto");
    // buscando el primer producto
    cy.buscarProducto(acces_token, idproduct1).then((response1) => {
      // buscando el segundo prodcuto
      cy.buscarProducto(acces_token, idproduct2).then((response2) => {
        console.log(response1.body.products.docs);
        console.log(response2.body.products.docs);
        // verifico si ambos productos existen
        if (response1.body.products.docs.length == 0 && response2.body.products.docs.length == 0) {
          cy.log("El producto no existe hay q crearlo");
          cy.crearProducto(acces_token, body1).then((response3) => {
            cy.crearProducto(acces_token, body2).then((response4) => {
              console.log(response3.body.product._id);
              console.log(response4.body.product._id);
              cy.login(datos.username, datos.password);
              cy.get(pagepushinIt.pageHome.moduleOnlineShop).click();
              cy.searchproduct(idproduct1).then((resp1) => {
                cy.addproductlist(idproduct1);
                cy.searchproduct(idproduct2).then((resp2) => {
                  cy.addproductlist(idproduct2);

                  cy.get(pagepushinIt.pageOnlineShop.goshoopingcartButton).click();
                  cy.get(pagepushinIt.pageShoopingCart.goBillingSummaryButton).click();
                  cy.get(pagepushinIt.pageShoopingCart.gocheckoutButton).click();
                  cy.checkoutproduct(body3).then((payload) => {
                    console.log("resultado de intercept", payload);
                    console.log(payload.request.body.sellid);

                    cy.task("DATABASE2", {
                      dbConfig: Cypress.env("pushingItDB"),
                      queries: [
                        {
                          label: "TablaSells",
                          sql: `select pp.price,pp.product,pp.quantity,pp.total_price from "purchaseProducts" pp
                  join sells s on pp.sell_id = s.id 
                  where s.id = ${payload.request.body.sellid}`,
                          values: [],
                        },

                        // Agrega más consultas según sea necesario
                      ],
                    }).then((results) => {
                      console.log(results.TablaSells);

                      let payloadproducts = payload.request.body.products;
                      payloadproducts.forEach((product) => {
                        product.price = parseFloat(product.price).toFixed(2);
                        product.total_price = parseFloat(product.total_price).toFixed(2);
                      });

                      console.log(payloadproducts);
                      expect(results.TablaSells).deep.eq(payloadproducts);
                    });
                  });
                });
              });
            });
          });
        } else {
          cy.log("El producto existe hay que eliminarlo");
          cy.borrarProducto(acces_token, response1.body.products.docs[0]._id);
          cy.borrarProducto(acces_token, response2.body.products.docs[0]._id);
        }
      });
    });
  });
});
