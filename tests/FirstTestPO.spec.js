const {test, expect} =require ('@playwright/test');
const {POManager} =require ('../PageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorder_testdata.json')));
const dataset_array = JSON.parse(JSON.stringify(require('../utils/placeorder_testdata_array.json')));

//test.describe.configure({mode:'parallel'});
test('@Sanity First Test', async ({page})=>{
    const ProductName = dataset.productName;
    const username = dataset.username;
    const password = dataset.password;
    const cvvNo = dataset.CVV_no;
    const NameOnCard = dataset.NameOnCard;
    const countryCode = dataset.CountryCode;
    const countryName = dataset.CountryName;

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.landOnLogin();
    await loginPage.validLogin(username,password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(ProductName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    //await cartPage.getProductNameInCart(ProductName);
    await cartPage.VerifyProductIsDisplayed(ProductName);
    await cartPage.Checkout();
    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.enterCCDetails(cvvNo, NameOnCard);
    await orderReviewPage.SearchCountryAndSelect(countryCode,countryName);
    const orderId = await orderReviewPage.placeOrderAndgetOrderId();
    console.log(orderId);
    //await page.pause();

    //comment

} )


for (let data of dataset_array)
{
test(`Parameterized Test Data ${data.username}`, async ({page})=>{
    const ProductName = data.productName;
    const username = data.username;
    const password = data.password;
    const cvvNo = data.CVV_no;
    const NameOnCard = data.NameOnCard;
    const countryCode = data.CountryCode;
    const countryName = data.CountryName;

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.landOnLogin();
    await loginPage.validLogin(username,password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(ProductName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(ProductName);
    await cartPage.Checkout();
    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.enterCCDetails(cvvNo, NameOnCard);
    await orderReviewPage.SearchCountryAndSelect(countryCode,countryName);
    const orderId = await orderReviewPage.placeOrderAndgetOrderId();
    console.log(orderId);
    //await page.pause();

} )
}