import express from 'express';
let router = express.Router();

router.get('/', async function (req, res) {
    return res.json({
        data: "hola mundo"
    });
})
let typeaheadRouter = router;

export { typeaheadRouter };
