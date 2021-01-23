import express from 'express';
import fs from 'fs';
let router = express.Router();
router.get('/', async function (req, res) {
    return res.json({
        data: "hola mundo"
    });
})

router.post('/', async function (req, res) {
    const data = await req.body;
    let names: any = await readFile();
    writeFile({prueba:true});
    return res.json({
        data: names
    });
})


async function readFile() {
    let names = {};
    let rawdata = fs.readFileSync(`${__dirname.replace('Router', '')}names.json`, "utf8");
    names = JSON.parse(rawdata);
    return names;
}
async function writeFile(names:any) {
    const new_json = JSON.stringify(names);
    fs.writeFileSync(`${__dirname.replace('Router', '')}names.json`, new_json);
}


let typeaheadRouter = router;

export { typeaheadRouter };
