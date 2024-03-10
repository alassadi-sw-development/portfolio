window.addEventListener('load', function(){
  const slideCount = document.querySelectorAll('#slider-wrapper ul li').length;
  const slideWidth = document.querySelector('#slider-wrapper').offsetWidth;

  const totalWidth = slideWidth * slideCount + 'px';

  const slider = document.querySelector('#slider-wrapper ul');
  const next = document.querySelector('#next');
  const previous = document.querySelector('#prev');

  let leftPosition = 0;
  let counter = 0;
  slider.style.width= totalWidth;

  let sliding = setInterval(automatic,5000);

  next.addEventListener('click', (event)=>{
    event.preventDefault();
    counter++;
    if(counter == slideCount){counter=0;}
    leftPosition = `-${counter * slideWidth}px`;
    slider.style.left = leftPosition;
  });
  previous.addEventListener('click', function(event){
    event.preventDefault();
    counter--;
    if(counter == -1){counter = slideCount-1;}
      leftPosition = `-${counter * slideWidth}px`
      slider.style.left = leftPosition;
  });
  function automatic(){
    counter++
    if(counter == slideCount){counter = 0;}
    leftPosition = `-${counter * slideWidth}px`
    slider.style.left = leftPosition;
  }

  document.querySelector('#slider-wrapper').addEventListener('mouseover', ()=>{
    clearInterval(sliding);
  })
  document.querySelector('#slider-wrapper').addEventListener('mouseout', ()=>{
    sliding = setInterval(automatic, 5000);
  });
})