export const pagepushinIt = {
  pageLogin: {
    user: '[data-cy="user"]',
    pass: '[data-cy="pass"]',
    Male: '[data-cy="Male"]',
    Female: '[data-cy="Female"]',
    Other: '[data-cy="Other"]',
    day: '[data-cy="day"]',
    month: '[data-cy="month"]',
    year: '[data-cy="year"]',
    submitForm: '[data-cy="submitForm"]',
    registertoggle: '[data-cy="registertoggle"]',
    registertoggleDetails: {
      usernameInput: '[data-cy="user"]',
      passwordInput: '[data-cy="pass"]',
      submitButton: '[data-cy="submitForm"]',
    },
  },
  pageHome: {
    moduletodolist: '[data-cy="todolistlink"]',
    moduleOnlineShop: '[data-cy="onlineshoplink"]',
  },
  pageOnlineShop: {
    addProductoButton: '[data-cy="add-product"]',
    addProductoButtonDetails: {
      productNameInput: '[data-cy="productName"]',
      productPriceInput: '[data-cy="productPrice"]',
      productCardInput: '[data-cy="productCard"]',
      productIdInput: '[data-cy="productID"]',
      createProductButton: '[data-cy="createProduct"]',
    },
    searchTypecombobox: '[data-cy="search-type"]',
    searchproductInput: '[data-cy="search-bar"]',
    deleteproductButton: '[data-cy="delete-idproduct"]',
    deleteproductDetails: {
      acceptdeleteButton: '[id="saveEdit"]',
    },
    addtocartproductoButton: '[data-cy="add-to-cart-productid"]',
    addtocartproductoDetails: {
      closeButton: '[data-cy="closeModal"]',
    },
    goshoopingcartButton: '[data-cy="goShoppingCart"]',
  },
  pageShoopingCart: {
    gocheckoutButton: '[data-cy="goCheckout"]',
  },
  pageCheckout: {
    firstnameLabel: '[data-cy="firstName"]',
    lastnameLabel: '[data-cy="lastName"]',
    cardnumberLabel: '[data-cy="cardNumber"]',
    purchaseButton: '[data-cy="purchase"]',
  },
};
