const form = document.querySelector(".sign-up");
const pattren = /^[A-Za-z]{6,12}$/;
let bool = false;
let username = '';
form.addEventListener("submit", (e)=>
{
    e.preventDefault();
 
if(bool)
{
    alert("success: submited data = " + username);
}
});

form.username.addEventListener("keyup", (e)=>
{
    console.log(e.target.value);
    if(pattren.test(e.target.value))
    {
        e.target.setAttribute("class", "success");
        bool = true;
        username= e.target.value;
    }else
    {
        e.target.setAttribute("class", "error");
        bool=false;
    }
});
