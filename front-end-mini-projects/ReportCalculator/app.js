const buttons = document.querySelectorAll("button");
const form = document.querySelector("form");
const content = document.querySelector(".content");


const reportCalculator = (units)=>
{
    let mean;
    let results = [];
   
    units.forEach(unit =>
        {
            if(unit.td && unit.tp)
            {
                mean = ((unit.exam * 0.6) + ((unit.td + unit.tp)/2) * 0.4) * unit.conf;
            }else if(unit.td && !unit.tp)
            {
                mean = ((unit.exam * 0.6) + (unit.td * 0.4)) * unit.conf;
            }else if(!unit.td && unit.tp)
            {
                mean = ((unit.exam * 0.6) + (unit.tp * 0.4)) * unit.conf;
            }else
            {
                mean = unit.exam  * unit.conf;
            }
            results.push({name: unit.name, mean: mean, conf: unit.conf});
            
        })

        return results;
}

const meanSet = (results) =>
{
    let result = 0;
    let confs  = 0; 
    results.forEach(res =>
        {
            result += res.mean;
            confs +=  res.conf;
        })

        if(confs)
        {
            return result/confs;
        }
}

const showResults = (mean,content,user)=>
{
    if(!mean)
    {
        content.innerHTML += `<div><p><strong>OPPS FILL AT LEAST ONE MODULE !</strong></p></div>`;
        return;
    }
    if(mean >= 10)
    {
        content.innerHTML += `<div><p class="name">${user} : Admits</p><p class="success">${mean}</p></div>`;
    }else
    {
        content.innerHTML += `<div><p class="name">${user} : Ajourned</p><p class="fail">${mean}</p></div>`;
    }    
    
}



//============================ main code ==================================
//add a module for calculation:
buttons[1].addEventListener("click", ()=>
{  
    
    let module = `<div class="form-group module item fade-in">
                  <span class="exit"><i class="far fa-trash-alt"></i></span>
                  <label for="module" class="label">Module:</label>
                  <input type="text" name="module">
                  <span class="inputs">
                  
                  <label for="Exam">Exam:</label>
        <input type="number" name="Exam" min="0" max="20">
        <label for="TD">TD:</label>
        <input type="number" name="TD" min="0" max="20">
        <label for="username">TP:</label>
        <input type="number" name="TP" min="0" max="20">
        <label for="conf">conf:</label>
        <input type="number" name="conf" min="0" max="20">
    </span>
</div>`;
    const  units = document.querySelectorAll(".item");
    
    units.forEach(unit => 
        {
            unit.classList.remove("fade-in");
        })
    form.innerHTML += module;
    //removes a module if you want:
    const exit = document.querySelectorAll(".exit");
    exit.forEach(item =>
        {
           
            
            item.addEventListener("click", ()=>
            {
                item.parentElement.classList.add("fade-out");
                setTimeout(()=>
                {
                    item.parentElement.remove();
                }, 1000);
                
            })
        })


});

//performs all calculations:
buttons[0].addEventListener("click", ()=>
{
    const modules = document.querySelectorAll(".module");
    console.log(modules);
    const units = [];
    let results;
    let mean;
    //put condition here is better ....!
    modules.forEach(unit => 
        {
            
            if(unit.childNodes.item(5).value && unit.childNodes.item(7).childNodes.item(3).value && unit.childNodes.item(7).childNodes.item(15).value)
            {
                units.push({
                    name: unit.childNodes.item(5).value,
                    exam: Number(unit.childNodes.item(7).childNodes.item(3).value),
                    td: Number(unit.childNodes.item(7).childNodes.item(7).value),
                    tp: Number(unit.childNodes.item(7).childNodes.item(11).value),
                    conf: Number(unit.childNodes.item(7).childNodes.item(15).value)
                });
            }   
        });
        //console.log(units)
        units.forEach(u =>
        {
            console.log(u);
        });
       
        results = reportCalculator(units);
        mean = meanSet(results);
        showResults(mean.toFixed(2), content, form.childNodes.item(1).childNodes.item(3).value);
        content.parentElement.parentElement.style.display = "block";
        
})

content.previousElementSibling.addEventListener("click", ()=>
{
    content.innerHTML = "";
    content.parentElement.parentElement.style.display = "none";
})





/*
algo:  56, conf: 4
arch: 39, conf: 3
thg: 24, conf:  2 
mn: 19, conf:  1
*/
