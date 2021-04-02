//QUERY THE DOM: 
const res = document.querySelector("#result");
const length = document.querySelector("#length");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const generate = document.querySelector(".btn.btn-large");
const clipboard = document.querySelector("#clipboard");

//Set Functions
const  getRandomLower = () => {
return String.fromCharCode(Math.floor(Math.random() * 26) + 97);  
}

const  getRandomUpper = () => {
return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const getRandomNumber = () => {
return String.fromCharCode(Math.floor(Math.random() * 10) + 48);    
}

const getRandomSymbols = () => {
    const symbols = "@=/+*^{}[]-&!()#<>,;$€%?";
    return symbols[Math.floor(Math.random() * (symbols.length))];
}

const  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

const generatePassword = (passwordLength, lower, upper, number, symbol)=>
{
    console.log(passwordLength)
    let generatedPassword = [];
    const checkedOptionsArray = [{lower}, {upper}, {number}, {symbol}].filter(item =>  Object.values(item)[0]);
    const caller = checkedOptionsArray.slice();
    if(checkedOptionsArray.length === 0)
    {
        return generatedPassword;
    }
    for(let i = 0; i < passwordLength; i++)
    {
  
        if(checkedOptionsArray.length)
        {
            let index = Math.floor(Math.random() * (checkedOptionsArray.length));
            let callFunction = Object.keys(checkedOptionsArray[index])[0];
            
            generatedPassword.push(randomCharsGenerators[callFunction]());
            checkedOptionsArray.splice(index,1);
        }else
        {
            generatedPassword.push(randomCharsGenerators[Object.keys(caller[Math.floor(Math.random() * caller.length)])[0]]());
        }

    }
    //returning a password that don't pass the maximum length
    //In cas to not got password with length more then the given one
    console.log("normal array: " + generatedPassword);
    generatedPassword = shuffle(generatedPassword);
    console.log("shuffle array: " + generatedPassword);
    return String(generatedPassword.join('')).slice(0,passwordLength);
}
const enableIcon = ()=>
{
    clipboard.classList.add('copy');
}
const disableIcon = ()=>
{
    clipboard.classList.remove('copy');
}
//Set Data Structures
const randomCharsGenerators =  {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols
}
//Fireup the click even then callback the asyncronous code of generatePassword function
generate.addEventListener("click", ()=>
{
    disableIcon();
    //to parse the input from string to number value we use
    //Number() or just the + sign:
    let passwordLength = +length.value;
    if(passwordLength < 5 || passwordLength > 20)
    {
        passwordLength = 7;
    }
    const passwordHasLower = lowercase.checked;  
    const passwordHasUpper = uppercase.checked;
    const passwordHasNumbers = numbers.checked;
    const passwordHasSymbols = symbols.checked;
    res.textContent = generatePassword(passwordLength,passwordHasLower,passwordHasUpper,passwordHasNumbers,passwordHasSymbols);

});

clipboard.addEventListener("click", ()=>
{
enableIcon();
const textarea = document.createElement('textarea');
const password = res.textContent;
if(! password) return;
textarea.value = password;
document.body.appendChild(textarea);
textarea.select();
document.execCommand('copy');
textarea.remove();
alert("password is being copied in clipboard !");
});

