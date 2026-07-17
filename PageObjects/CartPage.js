const { expect } = require('@playwright/test');
class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }
    async VerifyProductIsDisplayed(productName)
    {
        // console.log("Current URL:", this.page.url());
        // console.log("Page Title:", await this.page.title());
        // console.log("All H3s:", await this.page.locator("h3").allTextContents());
        await expect(this.getProductLocator(productName)).toBeVisible();
    }

    async Checkout()
    {
        await this.checkout.click();
    }

    getProductLocator(productName)
    {
        return this.page.getByRole('heading', {name: productName})
    }

    async getProductNameInCart(productName)
    {
        const allProducts = await this.page.locator("h3").allTextContents();
        console.log("Products in cart:", allProducts);
        console.log("Expected:", productName);
    }
}

module.exports = {CartPage}