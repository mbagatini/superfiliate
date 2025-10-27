import { CalculatePriceSchema, cartSchema, ItemPriceSchema } from "../schemas/cart.schema";

export class CartService {
	// PRO: Usage of typescript schema to validate the input data
	// CON: This function doesn't need to be async since it's not doing any asynchronous operations
	calculatePrice(param: CalculatePriceSchema) {
		const data = cartSchema.parse(param);

		// Discount offer

		let qttyDiscountEligible = 0;

		let cartDiscountEligibleTotal = 0;
		let cartDiscountNotEligibleTotal = 0;

		// CON: Using map without actually returning a new value, ideally you would use forEach instead.
		data.cart.lineItems.forEach(item => {
			if (item.collection === 'KETO') {
				cartDiscountNotEligibleTotal += item.price;
			} else {
				qttyDiscountEligible++;
				cartDiscountEligibleTotal += item.price;
			}
		})

		
		// CON: Could probably refactor this into a map object and remove the switch case.
		const discountRates = new Map([
			[0, 0],
			[1, 0],
			[2, 5],
			[3, 10],
			[4, 20],
			[5, 25],
		]);
		
		let discountOffer = qttyDiscountEligible > 5
			? discountRates.get(5)!
			: discountRates.get(qttyDiscountEligible)!;

		const discountPercentage = (100 - discountOffer) / 100;

		// Applying discount rate

		const cartDiscountedPrice = cartDiscountNotEligibleTotal + (cartDiscountEligibleTotal * discountPercentage);

		const cartWithDiscountedPrice = {
			cart: {
				...data.cart,
				// PRO: Correct usage of map here to return a new object with the discounted price.
				// CON: Could probably seperate this map logic into a different function to keep the return value clean.
				lineItems: this.calculateItemsDiscountedPrice(data.cart.lineItems, discountPercentage),
				cartDiscountedPrice: parseFloat(cartDiscountedPrice.toFixed(2))
			}
		}

		return cartWithDiscountedPrice;
	}

	private calculateItemsDiscountedPrice(items: ItemPriceSchema[], discountPercentage: number) {
		const discountedItems = items.map(item => {
			let discountedPrice = item.price;

			if (item.collection !== 'KETO') {
				discountedPrice = item.price * discountPercentage
			}

			return {
				...item,
				discountedPrice: parseFloat((discountedPrice).toFixed(2))
			}
		});

		return discountedItems;
	}

}