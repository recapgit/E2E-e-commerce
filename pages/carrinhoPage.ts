import { Page, Locator, expect } from '@playwright/test';
 
export class CarrinhoPage {
    readonly page: Page;
    readonly proceedToBuyButton: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.proceedToBuyButton = page.getByTestId('ecom-proceed-to-buy');
    }
 
    async checkout() {
        await expect(this.proceedToBuyButton).toBeVisible();
        await this.proceedToBuyButton.click();
    }
}
 