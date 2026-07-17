class LoginPage
{
    constructor(page)
    {
        this.userEmail = page.locator("#userEmail");
        this.userpassWord = page.locator("#userPassword");
        this.signInbutton = page.locator("#login");
        this.page = page;

    }

    async landOnLogin()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(username, password)
    {
        await this.userEmail.fill(username);
        await this.userpassWord.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage}