
// variables
var colors = [];
var pickedColor;
var numberOfSquares = 6;
// selectors
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var backgroundDisplay = document.getElementsByTagName("h1");
var resetButton = document.querySelector("#reset");
var easyMode = document.querySelector("#easy");
var hardMode = document.querySelector("#hard");
var squares = document.querySelectorAll(".square");

// logic
colors = generateRandomColors(numberOfSquares);
easyMode.addEventListener("click", function()
{
    numberOfSquares = 3;
    easyMode.classList.add("selected");
    hardMode.classList.remove("selected");
    colors = generateRandomColors(numberOfSquares);
    colorsAffect(numberOfSquares);
    pickedColor = generatePickedColor(pickedColor);
    // change try Again or Correct message to not display
    messageDisplay.textContent = ""

});

hardMode.addEventListener("click", function()
{
    numberOfSquares = 6;
    hardMode.classList.add("selected");
    easyMode.classList.remove("selected");
    colors = generateRandomColors(numberOfSquares);
    colorsAffect(numberOfSquares);
    pickedColor = generatePickedColor(pickedColor);
    // change try Again or Correct message to not display
    messageDisplay.textContent = ""
});


resetButton.addEventListener("click", function()
{
    // generate random colors
    colors = generateRandomColors(numberOfSquares);
    // pick a new random colors from an array + generate picked color
    pickedColor = generatePickedColor(pickedColor);
    //change colors to square
    colorsAffect(numberOfSquares);
    // change try Again or Correct message to not display
    messageDisplay.textContent = ""
    // play again? to new colors
    this.textContent = "New Colors";
    

});

pickedColor = generatePickedColor(pickedColor);
colorsSquares();



// functions:
// generate picked colors text
function generatePickedColor(picked)
{
    picked = pickColor();
    colorDisplay.textContent = picked;
    return picked;
}

// change all squares and background to same picked color
function changeColor()
{
    for(var j=0; j < squares.length; j++)
           {
                squares[j].style.backgroundColor = pickedColor; 
           }
    backgroundDisplay[0].style.backgroundColor = pickedColor;
}

// picking random color
function pickColor()
{
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// generate random colors
function generateRandomColors(number)
{
    var arr = [];
    for(var i = 0; i < number; i++)
    {
        arr.push(randomColor());
    }

    return arr;
}

function randomColor()
{
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";  
}


// change colors to squares:

function colorsSquares()
{
    for(var i = 0; i < squares.length; i++)
    {   
        // add initinal colors randomly
        squares[i].style.backgroundColor = colors[i];
        // add the event 
        squares[i].addEventListener("click", function()
        {
           // grap the clicked square color
           var clickedColor = this.style.backgroundColor;
           // compared with picked color
           if(clickedColor === pickedColor)
           {
            messageDisplay.textContent = "Correct !"    
            changeColor(); 
            // playagain button
            resetButton.textContent = "Play Again?";  
           }else
           {
            messageDisplay.textContent = "Try Again !"   
            this.style.backgroundColor = "#232323";
    
           }
        });
    }
        
}


// colors affecting
function colorsAffect(numberOfSquares)
{
    if(numberOfSquares === 3)
    {
        for(var i = 0; i < squares.length; i++)
        {   
            // add initinal colors randomly
            if(colors[i])
            {
                squares[i].style.backgroundColor = colors[i];
            }else
            {
                squares[i].style.display = "none"
            }
            
        }
    }else
    {
        for(var i = 0; i < squares.length; i++)
        {   
            // add initinal colors randomly
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block"
        }
    }
 
    backgroundDisplay[0].style.backgroundColor = "steelblue";
}