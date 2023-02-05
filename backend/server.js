const axios = require('axios');
const express = require('express');
const cors = require("cors");

const PORT = process.env.PORT || 5050;
const app = express();
app.use(
	cors({
		origin: 'https://mhttt.github.io/rematrackerv2/',
	})
);

let allProducts = [];

axios
	.post(
		'https://flwdn2189e-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.21.1&x-algolia-application-id=FLWDN2189E&x-algolia-api-key=91ff119df3e6ee7aee99ae097fd41309',
		{
			requests: [
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A10%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A20%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A30%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A40%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A50%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A60%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A70%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A80%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A90%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A100%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A110%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A120%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A130%22%5D&filters=',
				},
				{
					indexName: 'aws-prod-products',
					params:
						'query=&hitsPerPage=9999&facets=%5B%22labels%22%5D&facetFilters=%5B%22labels%3Aavisvare%22%2C%22department_id%3A140%22%5D&filters=',
				},
			],
		}
	)
	.then((res) => {
		let data = res.data;
		let results = data.results;
		for (let i = 0; i < results.length; i++) {
			for (let j = 0; j < results[i].hits.length; j++) {
				const imageUrlPrefix = 'https://cphapp.rema1000.dk/api/v1';
				allProducts.push({
					productName: results[i].hits[j].name,
					productPrice: results[i].hits[j].pricing.price,
					productOldPrice: results[i].hits[j].pricing.normal_price,
					productOnDiscount: results[i].hits[j].pricing.is_on_discount,
					productFullDescription: results[i].hits[j].declaration,
					productUnderlineDescription: results[i].hits[j].underline,
					productImageUrl: imageUrlPrefix + results[i].hits[j].image_url,
				});
			}
		}
	})
	.catch((err) => console.error(err));

app.get('/api/products', (req, res) => {
	res.send(allProducts);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
