window.addEventListener('load', start);

var selectNumber = null;
var number = null;
var text = null;
var textNumber = null;

function start(){
    readForm();    
    selectNumber = document.querySelector('#selectNumber');
    number = document.querySelector('#number');
    text = document.querySelector('#text');
}

function readForm(){    
    var form = document.querySelector('form');
    form.addEventListener('input', handleFormSubmit);

    function handleFormSubmit(event){
        event.preventDefault();
    }
}

function readForm(){    
    var form = document.querySelector('form');
    form.addEventListener('input', handleForm);

    function handleForm(event){
        textNumber = textInNumber(event.target.value);        
    }

    function textInNumber(c){
        var ex = [
            ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", 
            "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", 
            "dezessete", "dezoito", "dezenove"],
            ["dez","vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
            ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", 
            "seiscentos", "setecentos", "oitocentos", "novecentos"],
        ];
       
        if(c < 20){            
            textCreated = ex[0][c];

            number.value = c;
            text.value = textCreated;

        } else if(c.length === 2 && c > 19){    
            if(c.substring(1, 2) == 0){
                textCreated = ex[1][c.substring(1, 0) - 1];
            } else {
                textCreated = ex[1][c.substring(1, 0) - 1] 
                + " e " + ex[0][c.substring(1, 2)];
            }

            number.value = c;
            text.value = textCreated;

        } else if(c.length === 3){

            if(c == 100){
                textCreated = ex[2][0]; 
            } else if(c.substring(1, 3) == 00){

                textCreated = ex[2][c.substring(1, 0)];
            } else if ( c.substring(1, 2) == 0 ){
                
                textCreated = ex[2][c.substring(1, 0)] + " e " 
                + ex[0][c.substring(2, 3)];

            } else if ( c.substring(1, 3) > 0 && c.substring(1, 3) < 20 ){

                textCreated = ex[2][c.substring(1, 0)] + " e " 
                + ex[0][c.substring(1, 3)];
            } else if ( c.substring(2, 3) == 0 ){

                textCreated = ex[2][c.substring(1, 0)] + " e " 
                + ex[1][c.substring(1, 2) - 1];
            }
            else {

                textCreated = ex[2][c.substring(1, 0)] + " e " 
                + ex[1][c.substring(1, 2) - 1] + " e "
                + ex[0][c.substring(2, 3)];
            }              

            number.value = c;
            text.value = textCreated;

        }
    }
}