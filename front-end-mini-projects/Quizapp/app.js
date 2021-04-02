const correctAnswers = ['A','A','C','C'];
const form = document.querySelector('.quiz-form');
const resutls = document.querySelector('.result');
console.log(form);
form.addEventListener('submit', (e)=>
{
e.preventDefault();
let score = 0;
const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];
// showScore = results.querySelector('span');
const showScore = resutls.childNodes.item(1).childNodes.item(1).childNodes.item(1);
userAnswers.forEach((answer,index)=>
{
    if(answer === correctAnswers[index])
    {
        score += 25; 
    }
});
    //show results on a page
    let i = 503;
    const scrolle = setInterval(()=>
    {
        scrollTo(0,i);
        if(i < 0)
        {
            clearInterval(scrolle);
        }else if(i >= 0 && i<=100)
        {
            i--;
        }else
        {
            i-=10;
        }
    }, 1)
    
    resutls.classList.remove('d-none');
    let output=0;
    const timer = setInterval(()=>
    {
        showScore.textContent = `${output}%`;
        if(output === score)
        {
            clearInterval(timer);
        }else
        {
            output++;
        }
    }, 10);
     
    
})