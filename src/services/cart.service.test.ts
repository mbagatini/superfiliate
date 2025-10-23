import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CartService } from './cart.service';

// PRO: Multiple tests to cover different scenarios.
describe('cart', () => {
	it('should calculate the total price correctly - no discount (only KETO)', async () => {
		const data = {
			cart: {
				reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
				lineItems: [
					{ name: "Peanut Butter", price: 39.0, collection: "KETO" },
					{ name: "Banana Cake", price: 33.1, collection: "KETO" },
					{ name: "Cocoa", price: 35.7, collection: "KETO" },
					{ name: "Fruity", price: 32, collection: "KETO" }
				]
			}
		}

		const cartService = new CartService();

		const result = await cartService.calculatePrice(data);

		assert.equal(result.cart.cartDiscountedPrice, 139.8);
	});

	it('should calculate the total price correctly - no discount (less than 2 items)', async () => {
		const data = {
			cart: {
				reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
				lineItems: [
					{ name: "Peanut Butter", price: 39.0, collection: "DEFAULT" },
					{ name: "Cocoa", price: 35.7, collection: "KETO" }
				]
			}
		}

		const cartService = new CartService();

		const result = await cartService.calculatePrice(data);

		assert.equal(result.cart.cartDiscountedPrice, 74.7);
	});

	it('should calculate the total price correctly - 5%', async () => {
		const data = {
			cart: {
				reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
				lineItems: [
					{ name: "Peanut Butter", price: 39.0, collection: "BEST-SELLERS" },
					{ name: "Banana Cake", price: 34.99, collection: "DEFAULT" },
					{ name: "Cocoa", price: 34.99, collection: "KETO" },
					{ name: "Fruity", price: 32, collection: "KETO" }
				]
			}
		}

		const cartService = new CartService();

		const result = await cartService.calculatePrice(data);

		assert.equal(result.cart.cartDiscountedPrice, 137.28);
	});

	it('should calculate the total price correctly - 10%', async () => {
		const data = {
			cart: {
				reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
				lineItems: [
					{ name: "Peanut Butter", price: 39.0, collection: "BEST-SELLERS" },
					{ name: "Banana Cake", price: 34.99, collection: "DEFAULT" },
					{ name: "Cocoa", price: 34.99, collection: "KETO" },
					{ name: "Fruity", price: 32, collection: "DEFAULT" }
				]
			}
		}

		const cartService = new CartService();

		const result = await cartService.calculatePrice(data);

		assert.equal(result.cart.cartDiscountedPrice, 130.38);
	});

	it('should calculate the total price correctly - 20%', async () => {
		const data = {
			cart: {
				reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
				lineItems: [
					{ name: "Peanut Butter", price: 39.0, collection: "BEST-SELLERS" },
					{ name: "Banana Cake", price: 34.99, collection: "KETO" },
					{ name: "Apple Pie", price: 36, collection: "DEFAULT" },
					{ name: "Banoffee", price: 38.6, collection: "BEST-SELLERS" },
					{ name: "Cocoa", price: 34.99, collection: "KETO" },
					{ name: "Fruity", price: 32, collection: "DEFAULT" }
				]
			}
		}

		const cartService = new CartService();

		const result = await cartService.calculatePrice(data);

		assert.equal(result.cart.cartDiscountedPrice, 186.46);
	});

	it('should calculate the total price correctly - 25%', async () => {
		const data = {
			cart: {
				reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
				lineItems: [
					{ name: "Peanut Butter", price: 39.0, collection: "BEST-SELLERS" },
					{ name: "Banana Cake", price: 34.99, collection: "KETO" },
					{ name: "Apple Pie", price: 36, collection: "DEFAULT" },
					{ name: "Banoffee", price: 38.6, collection: "BEST-SELLERS" },
					{ name: "Strawberry", price: 37.2, collection: "DEFAULT" },
					{ name: "Cocoa", price: 34.99, collection: "KETO" },
					{ name: "Fruity", price: 32, collection: "DEFAULT" },
					{ name: "Blueberry", price: 33, collection: "DEFAULT" }
				]
			}
		}

		const cartService = new CartService();

		const result = await cartService.calculatePrice(data);

		assert.equal(result.cart.cartDiscountedPrice, 231.83);
	});
});
