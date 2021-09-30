const express = require('express');

const router = express.Router();

router.route('/:num1')
    .get(function (req, res) {

        // res.status(200).send(req.params);
        // res.status(200).send(req.query);

        let num1 = 0;
        let num2 = 0;
        num1 = parseInt(req.params.num1);
        if (req.query && req.query.num2)
            num2 = parseInt(req.query.num2);
        console.log("Product of", num1, "and", num2, "=", num1 * num2);
        res.status(200).send("Product of " + num1 + " and " + num2 + " = " + num1 * num2);

    });

module.exports = router;