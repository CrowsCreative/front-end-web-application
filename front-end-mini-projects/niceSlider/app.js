const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
const slideLeft = document.querySelector('.left-slide');
const btnUp = document.querySelector('.up-button');
const btnDown = document.querySelector('.down-button');
const slidesLength = slideRight.querySelectorAll('div').length;

let activeSlideIndex = 0;
slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`
const changeSlide = (direction) =>
{
    
    const slideHeight = sliderContainer.clientHeight;
    if(direction === 'up')
    {
        activeSlideIndex++;
        if(activeSlideIndex > slidesLength - 1)
        {
            activeSlideIndex = 0;
        }
    }else if(direction === 'down')
    { 
        activeSlideIndex--;
        if(activeSlideIndex < 0)
        {
            activeSlideIndex = slidesLength - 1;
        }

    }

    slideRight.style.transform = `translateY(-${activeSlideIndex * slideHeight }px)`;
    slideLeft.style.transform = `translateY(${activeSlideIndex * slideHeight }px)`;
}



btnUp.addEventListener('click', ()=>changeSlide('up'));
btnDown.addEventListener('click', ()=>changeSlide('down'));
