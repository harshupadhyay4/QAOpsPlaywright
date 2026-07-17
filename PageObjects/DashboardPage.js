const {expect} = require('@playwright/test');

class DashboardPage
{
    constructor(page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.toast = page.locator("#toast-container");
    }

    async searchProductAddCart(productName) {

    await expect(this.products.first()).toBeVisible();

    const count = await this.products.count();

    for (let i = 0; i < count; i++) {

        const product = this.products.nth(i);

        if ((await product.locator("b").textContent())?.trim() === productName) {

            await Promise.all([
                this.toast.waitFor({ state: "visible" }),
                product.getByRole("button", { name: "Add To Cart" }).click()
            ]);

            await expect(this.toast).toContainText("Product Added To Cart");
            await expect(this.toast).toBeHidden();

            return;
        }
    }

    throw new Error(`Product '${productName}' not found on Dashboard`);
}

async navigateToCart() {

    await Promise.all([
        this.page.waitForURL("**/cart"),
        this.cart.click()
    ]);

    await expect(
        this.page.getByRole("heading", { name: "My Cart" })
    ).toBeVisible();

    await this.page.waitForLoadState("networkidle");
}

}


module.exports = {DashboardPage}