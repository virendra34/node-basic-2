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
	let string = 'aB2cD3eF1';
	// let string = req.query.string;
	// console.log(string.split(''));
	let chars = string.split('');
	let finalString = '';
	let temp = '';
	for (let i = 0; i < chars.length; i++) {
		// step1: if s[i] is lowercase and s[i+1] is uppercase then exchange them and add * at s[i+2] position
		if (i < chars.length - 1 && chars[i] !== '*' && chars[i + 1] !== '*' && isNaN(chars[i]) && isNaN(chars[i + 1])) {
			if (chars[i] === chars[i].toLowerCase() && chars[i + 1] === chars[i + 1].toUpperCase()) {
				temp = chars[i];
				chars[i] = chars[i + 1];
				chars[i + 1] = temp;
				chars.splice(i + 2, 0, '*');
			}
		}
		// step2: if there ar any number at any position replace them with 0 and move that number at front
		if (parseInt(chars[i]) >= 1 && parseInt(chars[i]) <= 9) {
			temp = chars[i];
			chars[i] = '0';
			chars.unshift(temp);
			i++;
		}
	}
	// reverse
	let encryptedString = chars.join('');
	// remove unwanted chars from string except numbers
	chars = encryptedString.split('').reverse();
	for (let i = 0; i < chars.length; i++) {
		// step1: remove * from the encrypted string
		if (chars[i] === '*') {
			chars.splice(i, 1);
		}
		// step2: replace 0 with the right most number in the string
		if (parseInt(chars[i]) === 0) {
			chars[i] = chars[chars.length - 1];
			chars.splice(chars.length - 1, 1);
		}
		// step3: if s[i] is uppercase and s[i+1] is lowercase then exchange them
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

