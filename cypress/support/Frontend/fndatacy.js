Cypress.Commands.add('selectorDatacy', (module) => {
 let datacy ={}
  cy.get('[data-cy]').each(elemento => {
        const valorDataCy = elemento.attr('data-cy').trim();
        const selector = `[data-cy="${valorDataCy}"]`
        cy.log(`Selector:${selector}`);
        datacy[valorDataCy] = `${selector}`;
    });
    console.log(datacy)

  
    cy.writeFile(`cypress/e2e/fixtures/${module}.js`,datacy)
})