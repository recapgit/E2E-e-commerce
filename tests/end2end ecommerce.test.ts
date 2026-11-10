<<<<<<< HEAD
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
=======
import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto("https://www.qapractice.com/practice-ecommerece-website")
    })

test('teste end to end, comprando 4 coca-colas', async ({page}) => {        
    //pesquisando produto
    await page.getByPlaceholder('Search for awesome products...').click()
    await page.getByPlaceholder('Search for awesome products...').fill('coca cola')
    await expect(page.getByPlaceholder('Search for awesome products...')).toBeVisible();

    //adicionando no carrinho   
    await page.locator('[data-testid="quantity-7"]').fill('4');
    await page.getByTestId('add-to-cart-7').click();
	

    //continuar para a compra
	await page.locator('button#ecom-cart-button').click();
    await expect(page.getByTestId('ecom-proceed-to-buy')).toBeVisible()
    await page.getByTestId('ecom-proceed-to-buy').click();

    //endereço para envio

    await expect(page.getByRole('heading', {name: 'Shipping Address'})).toBeVisible();

    await page.getByTestId('ecom-address-name').fill('Carlos Vasconcelos');
    await page.getByTestId('ecom-address-street').fill('Av. Cruz Cabugá, 560');
    await page.getByTestId('ecom-address-city').fill('Recife');
    await page.getByTestId('ecom-address-state').fill('PE');
    await page.getByTestId('ecom-address-zip').fill('50000-000');
    await expect(page.getByRole('button', {name: /Save Address/})).toBeVisible()
	await page.getByRole('button', {name: /Save Address/}).click();

    //detalhes do pagamento

    await expect(page.getByRole('heading', { name: 'Payment Details' })).toBeVisible();
	await page.getByTestId('ecom-card-number').fill('456987613427520')
	await page.getByTestId('ecom-expiry').fill('09/32')
	await page.getByTestId('ecom-cvv').fill('159')

    await page.getByRole('button', {name: 'Buy Now'}).click();

    //confirmação de compra das 4 coca-colas
    await expect(page.getByText('Woohoo!! Successfully purchased')).toBeVisible();
    await expect(page.getByText('Coca Cola 250ml - $1 x 4')).toBeVisible();
    await page.getByRole('button', {name: 'Done'}).click()
})

>>>>>>> refs/rewritten/onto
