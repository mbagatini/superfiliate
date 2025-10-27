import { CalculatePriceSchema, cartSchema } from "../schemas/cart.schema";

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
		data.cart.lineItems.map(item => {
			if (item.collection === 'KETO') {
				cartDiscountNotEligibleTotal += item.price;
			} else {
				qttyDiscountEligible++;
				cartDiscountEligibleTotal += item.price;
			}
		})

		let discountOffer = 0;

		// CON: Could probably refactor this into a map object and remove the switch case.
		if (qttyDiscountEligible > 1) {
			switch (qttyDiscountEligible) {
				case 2:
					discountOffer = 5;
					break;
				case 3:
					discountOffer = 10;
					break;
				case 4:
					discountOffer = 20;
					break;
				default:
					discountOffer = 25;
					break;
			}
		}

		const discountPercentage = (100 - discountOffer) / 100;

		// Applying discount rate

		const cartDiscountedPrice = cartDiscountNotEligibleTotal + (cartDiscountEligibleTotal * discountPercentage);

		const cartWithDiscountedPrice = {
			cart: {
				...data.cart,
				// PRO: Correct usage of map here to return a new object with the discounted price.
				// CON: Could probably seperate this map logic into a different function to keep the return value clean.
				lineItems: data.cart.lineItems.map(item => {
					let discountedPrice = item.price;

					if (item.collection !== 'KETO') {
						discountedPrice = item.price * discountPercentage
					}

					return {
						...item,
						discountedPrice: parseFloat((discountedPrice).toFixed(2))
					}
				}),
				cartDiscountedPrice: parseFloat(cartDiscountedPrice.toFixed(2))
			}
		}

		return cartWithDiscountedPrice;
	}
}