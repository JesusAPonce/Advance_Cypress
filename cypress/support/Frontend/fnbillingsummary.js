import { pagepushinIt } from "../../e2e/pagepushinIt";
Cypress.Commands.add("verifyBillingsummary", (SubTotal, TotalPrice) => {
  expect(SubTotal).to.be.equal(TotalPrice);
});
