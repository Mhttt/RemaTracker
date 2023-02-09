export function getProductLink(productURL) {
	/*
  REGEX TO GET THE PRODUCT ID FROM THE PRODUCT IMAGE URL
  */
	const regex = /item\/{1}\d+/gm;
	// Alternative syntax using RegExp constructor
	// const regex = new RegExp('item\\/{1}\\d+', 'gm')

	const str = productURL;
	let m;
	let n;

	while ((m = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}

		n = m[0].slice(5);
	}

	const prefixLink = 'https://shop.rema1000.dk/varer/';
	const productLink = prefixLink + n;
	return productLink;
}
