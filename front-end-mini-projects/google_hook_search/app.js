const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const html = document.querySelector('html');

btn.addEventListener('click', ()=>
{
    search.classList.add("active");
    setTimeout(()=>
    {
        btn.setAttribute('type','submit');

    }, 1000);
    input.focus();
})

html.addEventListener('dblclick', ()=>
{
    search.classList.remove("active");
    btn.setAttribute('type','button');
})