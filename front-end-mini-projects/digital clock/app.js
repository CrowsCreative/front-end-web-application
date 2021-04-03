const clock = document.querySelector('.clock');

const tick = ()=>
{
    const now = new Date();
    const temp =
    `
    <span>${now.getHours()}</span> :
    <span>${now.getMinutes()}</span> :
    <span>${now.getSeconds()}</span>

    `;


    clock.innerHTML = temp;
    
}

setInterval(tick, 1000);