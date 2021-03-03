//=============================================== L E X I C A L ====================================
//Object literals and regEX part (revisions)
const lexicalRules = 
{
    primitiveDataType: /integer|float|chars|boolean|long/g,
    builtInObjectType: /String|Array|Symbol|Object|Heap|Tree/g,
    identifiers: /(_?|\$?)[a-zA-Z]+[\w\-]*/g,
    operators: /\|\||\&\&|\+|\*\*|\*|=|\-|\%|\/|!|>=|<=|==|===|!==|!==|>|</g,
    reserved: ["if","else","break","switch","skip","and","or","in","next","for","while","do","until","default","goto"]
}
const syntaxRules = 
{
    definition: /(integer|float|chars|boolean|long|String|Array|Symbol|Object|Heap|Tree) (_?|\$?)[a-zA-Z]+[\w\-] *= *(["|\s\w\.]+) *;$/,
    declaration : /(integer|float|chars|boolean|long|String|Array|Symbol|Object|Heap|Tree) (_?|\$?)[a-zA-Z]+[\w\-] *;$/,
    condition: /if\((_?|\$?)[a-zA-Z]+[\w\-]*(>=|<=|==|===|!==|!==|>|<)?((_?|\$?)[a-zA-Z]+[\w\-])?\)\{\w*\}(else)?(\{\w*\})?/
}
//Selecting elements (not cover yet a lot)
const content = document.querySelector("textarea");
const lexical = document.querySelector("#lexical");
const syntax = document.querySelector("#syntax");
const reset = document.querySelector("button[type=reset]");
const lOutput = document.querySelector("#l");
const sOutput = document.querySelector("#s");

//Arrays revision
let primitives = [];
let structured = [];
let operators = [];
let identifiers = [];
let reservedKeyWords = [];
let reserved = ["if","else","break","switch","skip","and","or","in","next","for","while","do","until","default","goto"];
//Callback funtions high order functions revision
lexical.addEventListener("click", function()
{
    lOutput.classList.replace("hide", "show");
    //check for primitives data type    
if(lexicalRules.primitiveDataType.test(String(content.value)))
{
    primitives = String(content.value).match(lexicalRules.primitiveDataType);
    console.log("primitive dataype: ", primitives);
}

//check for structured data type
if(lexicalRules.builtInObjectType.test(String(content.value)))
{
    structured = String(content.value).match(lexicalRules.builtInObjectType);
    console.log("structed dataype: ", structured);
}

//check for operators
if(lexicalRules.operators.test(String(content.value)))
{
    operators = String(content.value).match(lexicalRules.operators);
    console.log("operators: ", operators);
}


//check for identifiers
if(lexicalRules.identifiers.test(String(content.value)))
{
    
    let primitive= ["integer","float","chars","boolean","long"];
    let struct = ["String","Array","Symbol","Object","Heap","Tree"];
    identifiers = String(content.value).match(lexicalRules.identifiers);
   for(let i = 0; i < identifiers.length; i++)
   {   
       for(let j=0; j < reserved.length; j++)
       {
        
        if(identifiers[i] === reserved[j])
        {
            
            identifiers[i] = "";
            break;
        }
       }

       for(let z=0; z < primitive.length; z++)
       {
        if(identifiers[i] === primitive[z])
        {
            identifiers[i] = "";
            break;
        }
       }

       for(let k=0; k < struct.length; k++)
       {
        if(identifiers[i] === struct[k])
        {
            identifiers[i] = "";
            break;
        }
       }
   }
//    identifiers.sort();
  
//     for(let i=0; i < identifiers.length + count; i++)
//     {
//         if(!identifiers[i])
//         {
//             //delete identifiers[i];
//             identifiers.shift();
//         }
//     }

    console.log("identifiers: ", identifiers);
}
//String methods revision
let args = String(content.value).split(' ');
    
//check for resrverd keywords
let t=0;
for(let i=0; i< args.length; i++)
{
    for(let j=0; j< reserved.length; j++)
    {
        if(args[i] === reserved[j])
        {
            reservedKeyWords[t] = reserved[j];
            t++;
            break;
        }
    }
    
}
console.log("reserved keywords: ",reservedKeyWords);
//String template part + forEach + arrow function (revision)
// ------------- primitives datatype -------------
let t1 = ` `;
let output1 = document.querySelector("#prim");
primitives.forEach(prim => 
    {
        t1 +=`<span class="elements">${prim}</span> `; 
    });
output1.innerHTML = t1;

//------------- Structured datatype -------------
let t2 = ` `;
let output2 = document.querySelector("#struct");
structured.forEach(struc => 
    {
        t2 +=`<span class="elements">${struc}</span> `; 
    });
    output2.innerHTML = t2;

//------------- reserved keywords -------------

let t3 = ` `;
let output3 = document.querySelector("#res");
reservedKeyWords.forEach(keyword => 
    {
        t3 +=`<span class="elements">${keyword}</span> `
    });
    output3.innerHTML = t3;

//------------- identifiers datatype -------------
let t4 = ` `;
let output4 = document.querySelector("#ident");
identifiers.forEach(identifier => 
    {
        if(identifier)
        {
            t4 +=`<span class="elements">${identifier}</span> `; 
        }
        
    });
    output4.innerHTML = t4;

//------------- operators datatype -------------
let t5 = ` `;
let output5 = document.querySelector("#op");
operators.forEach(op => 
    {
        t5 +=`<span class="elements">${op}</span> `; 
    });
    output5.innerHTML = t5;


});

//=============================================== S Y N T A X ====================================

syntax.addEventListener("click", function()
{
    sOutput.classList.replace("hide", "show");
    let compilerExpected = "";
    const s = document.querySelector("div#s p");
    console.log(s);
    if(syntaxRules.definition.test(String(content.value)))
    {
        s.classList.replace("warning", "results");
        console.info(content.value, "is a correct definition syntax");
        compilerExpected = `${content.value}, is a correct definition syntax`;
        s.textContent = compilerExpected;
    }else if(syntaxRules.declaration.test(String(content.value)))
    {
        s.classList.replace("warning", "results");
        console.info(content.value, "is a correct declaration syntax");
        compilerExpected = `${content.value}, is a correct declaration syntax`;
        s.textContent = compilerExpected;
    }else if (syntaxRules.condition.test(String(content.value)))
    {
        s.classList.replace("warning", "results");
        console.info(content.value, "is a correct condition syntax");
        compilerExpected = `${content.value}, is a correct condition syntax`;
        s.textContent = compilerExpected;
    }else
    {
        s.classList.replace("results", "warning");
        console.warn("our compiler does reconigsed this");
        compilerExpected = `our compiler does reconigsed this<br>compiler expected:<br><ul><li>&lt;datatype&gt; &lt;identifiers&gt; &lt;;&gt;</li><li> &lt;datatype&gt; &lt;identifiers&gt; &lt;=&gt; &lt;value&gt; &lt;;&gt;</li><li>&lt;if&gt; &lt;(condition)&gt; &lt;{...&gt; &lt;;&gt;</li></ul>`;
        
        s.innerHTML = compilerExpected;
    }

});

//========================== R E S E T ======================
reset.addEventListener("click", ()=>
{
    compilerExpected = "";
    primitives = [];
    structured = [];
    operators = [];
    identifiers = [];
    reservedKeyWords = [];
    lOutput.classList.replace("show", "hide");
    sOutput.classList.replace("show", "hide");
});






