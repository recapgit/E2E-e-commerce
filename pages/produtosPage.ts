import { Page, Locator, expect } from '@playwright/test';
 
export class ProdutosPage {
    readonly page: Page;
    readonly searchField: Locator;
    readonly cartButton: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.searchField = page.getByPlaceholder('Search for awesome products...');
        this.cartButton = page.locator('button#ecom-cart-button');
    }

    async search(name: string) {
        await expect(this.searchField).toBeVisible();
        await this.searchField.click();
        await this.searchField.fill(name);
    }
 
    async addToCart(quantity: number) {
        await this.page.getByTestId(`quantity-7`).fill(String(quantity));
        await this.page.locator(`[data-testid="add-to-cart-7"]`).click();
    }
 
    async goToCart() {
        await this.cartButton.click();
    }
}
 