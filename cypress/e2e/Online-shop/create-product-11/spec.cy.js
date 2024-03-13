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
    let linkimageproduct =
        "https://www.e-paimun.com.ar/wp-content/uploads/2020/03/antiparra-Ruiz-1.jpg";
    let acces_token;

    let body1 = { "name": nameproduct, "price": priceproduct, "img": linkimageproduct, "id": idproduct }

    before(() => {
        cy.iniciarSesion(datos.username, datos.password).then(({ token }) => { acces_token = token });


        // cy.crearProducto(acces_token, body1)
    });

    it(`Desafio 2 : el producto ${idproduct}`, () => {
        console.log(acces_token);
        cy.buscarProducto(acces_token, idproduct)


    });
});
