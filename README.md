# Superfiliate - The Cereal Offer API

### Technology Stack

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
 </p>
 
 ### How to run it?

Clone the repository to your machine.

Install the dependencies:

```bash
$ npm install
```

Start the server:

```bash
$ npm run dev
```

### API routes

Inside root folder, there is a file called `requests.http`. This file contains examples of requests to the API, as shown below:

```txt
# Calculate the cart price with discounts
POST http://localhost:3333/cart/price HTTP/1.1
content-type: application/json

{
	"cart": {
		"reference": "2d832fe0-6c96-4515-9be7-4c00983539c1",
		"lineItems": [
			{ "name": "Peanut Butter", "price": "39.0", "collection": "BEST-SELLERS" },
			{ "name": "Banana Cake", "price": "34.99", "collection": "DEFAULT" },
			{ "name": "Cocoa", "price": "34.99", "collection": "KETO" },
			{ "name": "Fruity", "price": "32", "collection": "DEFAULT" }
		]
	}
}
```