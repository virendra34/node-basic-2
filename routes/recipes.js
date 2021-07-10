var recipes = require('../recipes.json');
var router = require('express').Router();


getshoppingList = (req, res) => {
	const ids = req.query.ids
	if (!ids)  return res.status(400).send()
	id_list = ids.split(",");
	let answer= [];
	id_list.forEach(id => {
		flag = false;
		for(i=0; i < recipes.length; i++) {
			if(parseInt(recipes[i].id) == parseInt(id)) {
				answer = [...answer, ...recipes[i].ingredients];
				flag = true;
			}
		}
		if(!flag)  return res.status(404).send('NOT_FOUND')
	});
	return res.status(200).send(answer);
}

router.get("/shopping-list", getshoppingList);

module.exports = router;

