let readline = require("readline");
let fs = require("fs");

var dataCity = fs.readFileSync('./JsonFile/Cidades.json', "utf8");
var dataState = fs.readFileSync('./JsonFile/Estados.json', "utf8");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

createStatesJson();
// issue();
FindStatesWithMoreCities();
// FindStatesWithLessCities()
// findBigName();
// findLittleName();
// findBiggestName();
// findLittlestName();

function createStatesJson() {
    JSON.parse(dataState).forEach(state => {
        let filter = JSON.parse(dataCity).filter(function(city) {
            return city.Estado == state.ID;
        })
        fs.writeFileSync("./JsonFile/Write/" + state.Sigla + ".json", JSON.stringify(filter));
    });   
}

function issue(){
    rl.question("Type one of command: ", uf => {
        console.log(findCitiesForState(uf));
        issue();
    })
}

function findCitiesForState(uf){
    let cities = fs.readFileSync("./JsonFile/Write/" + uf + ".json", "utf8");
    let count = 0;
    JSON.parse(cities).forEach(() => {
        count += 1;
    })
    return count;
}

function FindStatesWithMoreCities(){
    let list = [];

    JSON.parse(dataState).forEach(state => {
        let object = {};

        let count = findCitiesForState(state.Sigla);

        object.value = count;
        object.uf = state.Sigla;

        list.push(object)
    });

    list.sort(function(a, b){
        return b.value - a.value;
    });
    
    console.log(list)
}

function FindStatesWithLessCities(){
    let list = [];

    JSON.parse(dataState).forEach(state => {
        let object = {};

        let count = findCitiesForState(state.Sigla);

        object.value = count;
        object.uf = state.Sigla;

        list.push(object)
    });

    list.sort(function(a, b){
        return a.value - b.value;
    });
    
    console.log(list)
}

function findBigName(){
    let list = [];
    
    JSON.parse(dataState).forEach(state => {
        let cities = fs.readFileSync("./JsonFile/Write/" + state.Sigla + ".json", "utf8");   
        stringLength = 0;
        stringName = null;

        JSON.parse(cities).forEach(cities => {
            if(cities.Nome.length > stringLength){
                stringLength = cities.Nome.length;
                stringName = cities.Nome;
            }
        })

        list.push(state.Sigla+ " - " + stringName)        
    });
    console.log(list);
}

function findLittleName(){
    let list = [];
    
    JSON.parse(dataState).forEach(state => {
        let cities = fs.readFileSync("./JsonFile/Write/" + state.Sigla + ".json", "utf8");   
        stringName = null;
        stringLength = 1000;

        JSON.parse(cities).forEach(cities => {    
            if(cities.Nome.length < stringLength){                
                stringLength = cities.Nome.length;
                stringName = cities.Nome;
            }
        })
        list.push(stringName + " - " + state.Sigla)        
    });
    console.log(list);
}

function findBiggestName(){
    stringLength = 0;
    stringName = null;
    stateUF = null
    
    JSON.parse(dataState).forEach(state => {
        let cities = fs.readFileSync("./JsonFile/Write/" + state.Sigla + ".json", "utf8");

        JSON.parse(cities).forEach(cities => {
            if(cities.Nome.length > stringLength){
                stringLength = cities.Nome.length;
                stringName = cities.Nome;
                stateUF = state.Sigla;
            }
        })
    });   
    console.log(stringName + " - " + stateUF);         
}

function findLittlestName(){
    stringLength = 1000;
    stringName = null;
    stateUF = null;
    
    JSON.parse(dataState).forEach(state => {
        let cities = fs.readFileSync("./JsonFile/Write/" + state.Sigla + ".json", "utf8");

        JSON.parse(cities).forEach(cities => {
            if(cities.Nome.length < stringLength){
                stringLength = cities.Nome.length;
                stringName = cities.Nome;
                stateUF = state.Sigla;
            }
        })
    });   
    console.log(stringName + " - " + stateUF);         
}