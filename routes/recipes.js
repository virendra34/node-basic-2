var recipes = require('../recipes.json');
var router = require('express').Router();


router.get('/shopping-list', (req, res) => {
	let ids = req.query.ids || null;
	if (!ids) {
		return res.status(400).send();
	}
	ids = ids.split(',');
	let finalRes = [];
	ids.map((id) => {
		let searchedIngredients = [];
		recipes.forEach((el, i) => {
			if (el.id == id) {
				searchedIngredients = searchedIngredients.concat(el.ingredients);
			}
		});
		if (searchedIngredients.length) {
			finalRes = finalRes.concat(searchedIngredients);
		}
	});
	if (finalRes.length) {
		return res.status(200).send(finalRes);
	} else {
		return res.status(404).send('NOT_FOUND');
	}
});

router.get('/test', (req, res) => {
	let string = 'aB2cD3ef1';
	// console.log(string.split(''));
	let chars = string.split('');
	let finalString = '';
	let temp = '';
	for (let i = 0; i < chars.length; i++) {
		if (i < string.length - 1 && chars[i] !== '*' && chars[i + 1] !== '*') {
			if (chars[i] === chars[i].toLowerCase() && chars[i + 1] === chars[i + 1].toUpperCase()) {
				temp = chars[i];
				chars[i] = chars[i + 1];
				chars[i + 1] = temp;
				chars.splice(i + 2, 0, '*');
			}
		}
		if (parseInt(chars[i]) >= 1 && parseInt(chars[i]) <= 9) {
			temp = chars[i];
			chars[i] = '0';
			// chars.splice(0, 0, temp);
			chars.unshift(temp);
			// i++;
		}
	}
	// reverse
	let encryptedString = chars.join('');
	// remove unwanted chars from string except numbers
	chars = encryptedString.split('').reverse();
	for (let i = 0; i < chars.length; i++) {
		if (chars[i] === '*') {
			chars.splice(i, 1);
		}
		if (parseInt(chars[i]) === 0) {
			chars[i] = chars[chars.length - 1];
			chars.splice(chars.length - 1, 1);
		}
		if (i < chars.length - 1 && isNaN(chars[i]) && isNaN(chars[i + 1])) {
			if (chars[i + 1] === chars[i + 1].toUpperCase() && chars[i] === chars[i].toLowerCase()) {
				temp = chars[i + 1];
				chars[i + 1] = chars[i];
				chars[i] = temp;
			}
		}
	}
	res.status(200).send({
		plainText: string,
		encrypted: encryptedString,
		decrypted: chars.reverse().join(''),
	});
});

module.exports = router;

