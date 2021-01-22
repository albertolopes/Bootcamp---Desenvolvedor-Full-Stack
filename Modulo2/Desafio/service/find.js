let fs = require("fs");

export function foo() {
    fs.readFile('./JsonFile/Cidades.json', "utf8", function(err, data){    
      if(err){
        return console.log("Erro ao ler arquivo");
      }
      
      var jsonData = JSON.parse(data); // faz o parse para json
    /**
      Se precisar em array use:
      jsonData = Object.keys(jsonData);
    / */
  });
}