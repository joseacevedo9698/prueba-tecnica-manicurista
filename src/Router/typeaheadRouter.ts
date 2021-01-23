import express from 'express';
import { Trie } from 'prefix-trie-ts';
import fs from 'fs';
let names: any = readFile();
let prefix = '';
let router = express.Router();
router.get('/:prefix', async function (req, res) {
    let names: any = await readFile();
    prefix = req.params.prefix;
    const trie = new Trie(Object.keys(names));
    let words = trie.getPrefix(prefix);

    let names_filter: any[] = [];
    words.forEach(function (word, key) {
        word = capitalize(word);
        names_filter.push({
            name: word,
            times: names[word]
        });
    });
    let aux_prefix;
    
    if (names[capitalize(prefix)]) {
        aux_prefix = names_filter.splice(0, 1);
    }
    
    names_filter.sort(comparation);
    if (aux_prefix) {
        names_filter.unshift(aux_prefix[0]);
    }
    const limit:any = process.env.SUGGESTION_NUMBER;
    names_filter.splice(limit-1,names_filter.length-limit);
    return res.status(200).json(names_filter);



})

router.post('/', async function (req, res) {
    const data = await req.body.name;
    if (data == undefined) return res.status(400).json({ error: "name field is required" })
    console.log(names[data]);
    
    if (names[data]) {
        names[data]++;
        writeFile(names);
        return res.status(200).json({ name: data, times: names[data] })
    } else {
        return res.status(400).json({ error: "name not found" })
    }

})


function readFile() {
    let names = {};
    let rawdata = fs.readFileSync(`${__dirname.replace('Router', '')}names.json`, "utf8");
    names = JSON.parse(rawdata);
    return names;
}
async function writeFile(names: any) {
    const new_json = JSON.stringify(names);
    fs.writeFileSync(`${__dirname.replace('Router', '')}names.json`, new_json);
}

function capitalize(data: string) {
    return data.replace(/\b(\w)/g, s => s.toUpperCase());
}

function comparation(a: any, b: any) {
    const timeA = a.times;
    const timeB = b.times;
    let comparison = 0;
    if (timeA < timeB) {
        comparison = 1;
    } else if (timeA > timeB) {
        comparison = -1;
    }else if (timeA == timeB){
        return a.name.localeCompare(b.name);
    }
    return comparison;
}

let typeaheadRouter = router;

export { typeaheadRouter };
