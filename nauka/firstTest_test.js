const variables = require("./pages/variables");

Feature("My Application Test");

// const selectors = {
//   name: "[data-test-selector='table-header']:nth-child(1)",
// };

// const header = ["UUID", "Names", "Country", "Email", "Phone"];

Scenario("First Page #1", async ({ I }) => {
  I.amOnPage("http://localhost:3000/");
  I.see("List of Customers");
  I.seeElement(variables.buttonNodes);
  I.click(variables.buttonList);
  I.seeCurrentUrlEquals("http://localhost:3000/List");
});
Scenario("Second Page #2", async ({ I }) => {
  I.amOnPage("http://localhost:3000/List");
  I.see("GraphQL Project");
  I.seeElement(variables.searchComponent);
  I.seeElement("#tableSummary");
  I.seeElement(".MuiTable-root");
  I.seeElement(variables.pagination);
});
Scenario("Search #3", async ({ I }) => {
  I.amOnPage("http://localhost:3000/List");
  I.seeElement(variables.input);
  I.seeElement(variables.buttonSearch);
  I.seeElement(variables.buttonClear);
  I.fillField(".MuiInputBase-input", "344f2077-84a2-401b-bf29-69bbf2bf892f");
  I.click(variables.buttonSearch);
  I.click(variables.buttonClear);
  I.seeElement("tbody>tr:nth-child(3)");
  I.click(variables.buttonNewCustomer);
  I.seeCurrentUrlEquals("http://localhost:3000/List/NewCustomer");
});
Scenario("Edit #4", async ({ I }) => {
  I.amOnPage("http://localhost:3000/List");
  I.click(variables.editCustomer);
  I.seeElement(".MuiDialog-container");
  I.seeElement(variables.editFieldCountry);
  I.clearField("country");
  I.fillField("country", "Polskas");
  I.click(variables.editButtonSubmit);
  I.see("Polskas");
});
Scenario("Add Customer #5", async ({ I }) => {
  I.amOnPage("http://localhost:3000/List");
  I.click(variables.buttonNewCustomer);
  I.fillField("name", "NowyCustomer");
  I.fillField("email", "NowyCustomer@wp.pl");
  I.fillField("phone", "111-111-111-111");
  I.fillField("country", "Polska");
  I.click(variables.buttonCreateNewCustomer);
  I.see("NowyCustomer");
});
Scenario("Delete #6", async ({ I }) => {
  I.amOnPage("http://localhost:3000/List");
  I.seeElement(variables.deleteButton);
  I.see("NowyCustomer");
  I.click(variables.deleteButton);
  I.dontSee("NowyCustomer");
});
Scenario.only("Show Customer #7", async ({ I }) => {
  I.amOnPage("http://localhost:3000/List");
  I.click(variables.buttonNewCustomer);
  I.fillField("name", "ShowCustomer");
  I.fillField("email", "ShowCustomer@wp.pl");
  I.fillField("phone", "222-222-222-222");
  I.fillField("country", "Germany");
  I.click(variables.buttonCreateNewCustomer);
  I.see("ShowCustomer");
  I.click(variables.viewCustomer);
  const id = I.grabTextFrom(variables.grabText);
  I.seeInCurrentUrl(await id);
  I.amOnPage("http://localhost:3000/List");
  I.click(variables.deleteButton);
  I.dontSee("NowyCustomer");
});

//tbody>tr:nth-child(1)>td:nth-child(2)>div>svg:nth-child(1)
