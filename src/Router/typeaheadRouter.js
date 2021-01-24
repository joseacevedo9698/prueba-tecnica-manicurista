import express from 'express';
import TrieSearch from 'trie-search';
import fs from 'fs';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
let names = readFile();
let prefix = '';
let router = express.Router();
router.get('/:prefix?', async function (req, res) {
    const limit = process.env.SUGGESTION_NUMBER;
    prefix = req.params.prefix == undefined ? '' : req.params.prefix;
    let trie = new TrieSearch('name');
    trie.addFromObject(names);
    let names_filter = [];


    if(prefix == ''){
        const keys = Object.keys(names);
        keys.forEach(function (word){
            names_filter.push({
                name: word,
                times: names[word]
            });
        });
    }else{
        let words = trie.get(prefix);
        words.forEach(function (word) {
            let name_word = capitalize(word._key_);
            names_filter.push({
                name: name_word,
                times: word.value
            });
        });
    }
    
    
    let aux_prefix;
    
    if (names[capitalize(prefix)]) {
        aux_prefix = names_filter.splice(0, 1);
    }
    
    names_filter.sort(comparation);
    if (aux_prefix) {
        names_filter.unshift(aux_prefix[0]);
    }
    names_filter.splice(limit, names_filter.length - limit);
    return res.status(200).json(names_filter);
    
})

router.post('/', async function (req, res) {
    const data = capitalize(await req.body.name);
    if (data == undefined) return res.status(400).json({ error: "name field is required" })

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
async function writeFile(names) {
    const new_json = JSON.stringify(names);
    fs.writeFileSync(`${__dirname.replace('Router', '')}names.json`, new_json);
}

function capitalize(data) {
    return data.replace(/\b(\w)/g, s => s.toUpperCase());
}

function comparation(a, b) {
    const timeA = a.times;
    const timeB = b.times;
    let comparison = 0;
    if (timeA < timeB) {
        comparison = 1;
    } else if (timeA > timeB) {
        comparison = -1;
    } else if (timeA == timeB) {
        return a.name.localeCompare(b.name);
    }
    return comparison;
}

let typeaheadRouter = router;

export { typeaheadRouter };
