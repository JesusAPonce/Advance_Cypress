const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[2];

const nombreArchivo = directorioName.slice(directorioName.lastIndexOf("/") + 1);

// Extraemos el nombre del escenario hasta el primer guion '-
const scenarioName = nombreArchivo.split("-").slice(0, 2).join("-");

const testCaseId1 = directorioName.split(/[-]/)[3];
const testCaseId2 = directorioName.split(/[-]/)[5];

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

  it.only(`Desafio 3  y 4 : creando los productos ${idproduct1} y  ${idproduct2}`, () => {
    // verifico si ambos productos existen si  es asi los elimino
    cy.eliminarProducto(acces_token, idproduct1);
    cy.eliminarProducto(acces_token, idproduct2);

    cy.crearProducto(acces_token, body1).then((response3) => {
      cy.crearProducto(acces_token, body2).then((response4) => {
        cy.login(datos.username, datos.password);
        cy.get(pagepushinIt.pageHome.moduleOnlineShop).click();
        cy.searchproduct(idproduct1).then((resp1) => {
          cy.addproductlist(idproduct1);
          cy.searchproduct(idproduct2).then((resp2) => {
            cy.addproductlist(idproduct2);
            cy.get(pagepushinIt.pageOnlineShop.goshoopingcartButton).click();
            let ObjectShoppingCart = [];
            // verificar que los productos agregado son lo mismo que aparecen en el carrito de compra
            cy.get('[role="list"]')
              .find("li")
              .each(($fila, index) => {
                const Quantity = $fila.find("p").eq(0).text();
                const Product = $fila.find("p").eq(1).text();
                const Price = $fila.find("p").eq(2).text();
                const Total = $fila.find("p").eq(3).text();

                ObjectShoppingCart.push({ cantidad: Quantity, producto: Product, precio: Price, SubTotal: Total });
              })
              .then((resultado) => {
                expect(ObjectShoppingCart[0].cantidad).to.equal("2");
                expect(ObjectShoppingCart[1].cantidad).to.equal("2");
                expect(ObjectShoppingCart[0].producto).to.equal(body1.name);
                expect(ObjectShoppingCart[1].producto).to.equal(body2.name);
                expect(ObjectShoppingCart[0].precio).to.equal(`$${body1.price}`);
                expect(ObjectShoppingCart[1].precio).to.equal(`$${body2.price}`);
                cy.get(".css-n1d5pa > .chakra-button").click();
                cy.get('[id="price"]')
                  .invoke("text")
                  .then((Totalprice) => {
                    let Subtotal1 = ObjectShoppingCart[0].SubTotal.substring(1);
                    let Subtotal2 = ObjectShoppingCart[1].SubTotal.substring(1);

                    let SubTotalPrice = parseInt(Subtotal1) + parseInt(Subtotal2);

                    cy.verifyBillingsummary(SubTotalPrice.toFixed(2), Totalprice);
                  });
              });
            // verificar el precio total mostrado sea igual a multimpliaccion entre cantidad y precio de cada producto
            cy.get(pagepushinIt.pageShoopingCart.goBillingSummaryButton).click();
            cy.get(pagepushinIt.pageShoopingCart.gocheckoutButton).click();
            cy.checkoutproduct(body3).then((payload) => {
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
                let payloadproducts = payload.request.body.products;
                payloadproducts.forEach((product) => {
                  product.price = parseFloat(product.price).toFixed(2);
                  product.total_price = parseFloat(product.total_price).toFixed(2);
                });

                expect(results.TablaSells).deep.eq(payloadproducts);
              });
            });
          });
        });
      });
    });
  });
});
