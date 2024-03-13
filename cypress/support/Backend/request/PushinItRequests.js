//* funcion para agregar un producto
import { pagepushinIt } from "../../../e2e/InfoGlobal";

Cypress.Commands.add('iniciarSesion', (username, passaword) => {
  const url1 = new URL(pagepushinIt.BaseUrl + pagepushinIt.login)
  const pageUrl = url1.href
  cy.request({
    method: 'POST',
    url: pageUrl,
    body: {
      username: username,
      password: passaword,
    },
  }).then((response) => {
    console.log(response)

    return { token: response.body.token }
  })
})

Cypress.Commands.add('crearProducto', (acces_token, body) => {
  const url1 = new URL(pagepushinIt.BaseUrl + pagepushinIt.createproduct)
  const pageUrl = url1.href

  cy.request({
    method: 'POST',
    url: pageUrl,
    body: body,
    header: {
      Authorization: "Bearer" + acces_token
    }
  }).then((response) => {
    console.log(response)

    // return { token: response.body.token }
  })
})



Cypress.Commands.add('buscarProducto', (acces_token, idproduct) => {
  console.log(acces_token, idproduct)
  const url1 = new URL(pagepushinIt.BaseUrl + pagepushinIt.searchproduct)
  const filter = new URLSearchParams(url1)
  idproduct && filter.append("id", idproduct)
  url1.search = filter.toString()
  console.log(url1)
  const pageUrl = url1.href
  console.log(pageUrl)
  //https://pushing-it.onrender.com/api/products?id=11
  cy.request({
    method: 'GET',
    url: pageUrl,
    header: {
      Authorization: "Bearer" + acces_token
    },
    // body: { id: idproduct }
  }).then((response) => {
    console.log(response)

    // return { token: response.body.token }
  })
})