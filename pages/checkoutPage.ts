import { Page, Locator, expect } from '@playwright/test';

export interface ShippingData {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface PaymentData {
    cardNumber: string;
    expiry: string;
    cvv: string;
}

export class CheckoutPage {
    readonly page: Page;

    // shipping
    readonly shipTitle: Locator;
    readonly nameField: Locator;
    readonly streetField: Locator;
    readonly cityField: Locator;
    readonly stateField: Locator;
    readonly zipField: Locator;
    readonly saveAddressButton: Locator;

    // payment
    readonly paymentTitle: Locator;
    readonly cardNumberField: Locator;
    readonly expiryField: Locator;
    readonly cvvField: Locator;
    readonly confirm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.shipTitle = page.getByRole('heading', { name: 'Shipping Address' });
        this.nameField = page.getByTestId('ecom-address-name');
        this.streetField = page.getByTestId('ecom-address-street');
        this.cityField = page.getByTestId('ecom-address-city');
        this.stateField = page.getByTestId('ecom-address-state');
        this.zipField = page.getByTestId('ecom-address-zip');
        this.saveAddressButton = page.getByRole('button', { name: /Save Address/ });

        this.paymentTitle = page.getByRole('heading', { name: 'Payment Details' });
        this.cardNumberField = page.getByTestId('ecom-card-number');
        this.expiryField = page.getByTestId('ecom-expiry');
        this.cvvField = page.getByTestId('ecom-cvv');
        this.confirm = page.getByRole('button', { name: 'Buy Now' });
    }

    async fillShippingDetails(data: ShippingData) {
        await expect(this.shipTitle).toBeVisible();

        await this.nameField.fill(data.name);
        await this.streetField.fill(data.street);
        await this.cityField.fill(data.city);
        await this.stateField.fill(data.state);
        await this.zipField.fill(data.zip);

        await expect(this.saveAddressButton).toBeVisible();
        await this.saveAddressButton.click();
    }

    async fillPaymentDetails(data: PaymentData) {
        await expect(this.paymentTitle).toBeVisible();

        await this.cardNumberField.fill(data.cardNumber);
        await this.expiryField.fill(data.expiry);
        await this.cvvField.fill(data.cvv);
    }

    async confirmPurchase() {
        await this.confirm.click();
    }
}