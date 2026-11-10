import { test, expect } from '@playwright/test';
import { ProdutosPage } from '../pages/produtosPage';
import { CarrinhoPage } from '../pages/carrinhoPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.qapractice.com/practice-ecommerece-website');
});

test('teste end to end, comprando 4 coca-colas', async ({ page }) => {
    const productsPage = new ProdutosPage(page);
    const cartPage = new CarrinhoPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.search('coca cola');
    await productsPage.addToCart(4);
    await productsPage.goToCart();

    await cartPage.checkout();

    await checkoutPage.fillShippingDetails({
        name: 'Carlos Vasconcelos',
        street: 'Av. Cruz Cabugá, 560',
        city: 'Recife',
        state: 'PE',
        zip: '50000-000',
    });

    await checkoutPage.fillPaymentDetails({
        cardNumber: '456987613427520',
        expiry: '09/32',
        cvv: '159',
    });

    await checkoutPage.confirmPurchase();

// condição de aprovação
    await expect(page.getByText('Woohoo!! Successfully purchased')).toBeVisible();
    await expect(page.getByText('Coca Cola 250ml - $1 x 4')).toBeVisible();
});