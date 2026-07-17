const {expect} = require ('@playwright/test');
class OrderReviewPage
{
    constructor(page)
    {
        this.page=page;
        this.country = page.locator("[placeholder='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name input[type='text']");
        this.submitbtn = page.locator(".action__submit");
        this.thnkUText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.cvvCode = page.locator("div:has-text('CVV Code ') + input");
        this.nameOnCard = page.locator("div:has-text('Name on Card ') + input");

    }
    
    async enterCCDetails(cardCVV, nameOnCard)
    {
        await this.cvvCode.fill(cardCVV);
        await this.nameOnCard.fill(nameOnCard);
    }

    async SearchCountryAndSelect(countryCode, countryName)
    {
        await this.country.pressSequentially(countryCode,{delay: 150});
        await this.dropdown.waitFor();
        
        const dropdownOptionsCount = await this.dropdown.locator("button").count();
        for (let i=0;i<dropdownOptionsCount;i++)
        {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName)
            {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async placeOrderAndgetOrderId()
    {
        await this.submitbtn.click();
        await expect (this.thnkUText).toBeVisible();
        const orderId = await this.orderId.textContent();
        return orderId.split(" ")[2];
    }

}

module.exports = {OrderReviewPage}