import { CalculatePriceSchema, cartSchema } from "../schemas/cart.schema";

export class CartService {
	async calculatePrice(param: CalculatePriceSchema) {
		const data = cartSchema.parse(param);

		// Discount offer

		let qttyDiscountEligible = 0;

		let cartDiscountEligibleTotal = 0;
		let cartDiscountNotEligibleTotal = 0;

		data.cart.lineItems.map(item => {
			if (item.collection === 'KETO') {
				cartDiscountNotEligibleTotal += item.price;
			} else {
				qttyDiscountEligible++;
				cartDiscountEligibleTotal += item.price;
			}
		})

		let discountOffer = 0;

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