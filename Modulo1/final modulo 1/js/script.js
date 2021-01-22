let allUsers = [];
let filterData = [];
let name = null;
let button = null;
let countUsers = 0;
let tabUsers = null;
let genreMale = null;
let genreFemale = null;
let sumUsersAge = null;
let avarageUsersAge = null;

window.addEventListener('load', () => {
    name = document.querySelector('#name');
    button = document.querySelector('#button');
    countUsers = document.querySelector('#countUsers');
    tabUsers = document.querySelector('#tabUsers');
    genreMale = document.querySelector('#genreMale');
    genreFemale = document.querySelector('#genreFemale');
    sumUsersAge = document.querySelector('#sumUsersAge');
    avarageUsersAge = document.querySelector('#avarageUsersAge');

    fetchUser();
    readForm();   
});

async function fetchUser() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();

    allUsers = json.results.map(user => {
        const {login, gender, name, dob, picture} = user;
            
        return {
            id: login.uuid,
            genre: gender,
            name: name,
            age: dob.age,
            picture: picture
        };
    });
}

function readForm(){    
    let label = document.querySelector('#name');
    label.addEventListener('keyup', handleForm);

    let button = document.querySelector('#button');
    button.addEventListener('click', handleForm);

    function handleForm(event){
        if(event.key == "Enter"){
            render(event.target.value);
        } else if(event.type == "click"){
            render(document.getElementById('name').value);
        }        
    }
}

function render(event){
    if(event.toLowerCase() == "male" 
    || event.toLowerCase() == "female"){
        filterGenre(event);
    } 
    else if(isNumeric(event)){
        filterAge(event);
    }
    else{
        filterNames(event);
    }

    renderUsers();
    sumAge();
    averageAge();
    countGenre();
}

function renderUsers() {
    let usersHTML = "<div class='selectedUsers'>";
  
    filterData.forEach(user => {
        const {picture, name, age} = user;
  
      const favoriteCountryHTML = `
        <div class='showUsers'>
          <div>
            <img src="${picture.medium}" alt="${name.first}" />
          </div>
          <div>
            <ul>
              <li>${name.first} ${name.last}, ${age} anos<li>
            </ul>
          </div>
        </div>
      `;
  
      usersHTML += favoriteCountryHTML;
    });
    
    tabUsers.innerHTML = usersHTML;
    countUsers.innerHTML = filterData.length;
}

function sumAge(){
    let sumAge = 0;

    filterData.forEach(user => {
        const {age} = user;
          sumAge += age;
    });    

    sumUsersAge.innerHTML = sumAge;
}

function averageAge(){
    let sumAge = 0;

    filterData.forEach(user => {
        const {age} = user;
          sumAge += age;
    });    

    avarageUsersAge.innerHTML = sumAge / filterData.length;
}

function countGenre(){
    let male = [];
    let female = [];

    male = filterData.filter(function(el) {
        return el.genre == "male";
    }) 

    female = filterData.filter(function(el) {
        return el.genre == "female";
    }) 

    genreMale.innerHTML = male.length;
    genreFemale.innerHTML = female.length;
}

function filterNames(event) {    
    let firstName = allUsers.filter(function(el) {
        return el.name.first.toLowerCase().indexOf(event.toLowerCase()) > -1;
    }) 

    let lastName = allUsers.filter(function(el) {
        return el.name.last.toLowerCase().indexOf(event.toLowerCase()) > -1;
    }) 

    var unico = firstName.concat(lastName).filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });
     
    filterData = unico;
}

function filterAge(event){    
    filterData = allUsers.filter(function(el) {
        return el.age == event;
    }) 
}

function filterGenre(event){
    filterData =
     allUsers.filter(function(el) {
        return el.genre == event;
    }) 
}

function isNumeric(str)
{
  var er = /^[0-9]+$/;
  return (er.test(str));
}
