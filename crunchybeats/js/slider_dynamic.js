window.addEventListener('load', ()=>{

document.getElementById('event1').addEventListener('click', (event)=>{
  event.preventDefault();
  document.getElementById('events-slider').style.display = "block";
  renderHTML(1, 5);
  activate_slider();
  closeSlider();
});
document.getElementById('event2').addEventListener('click', (event)=>{
  event.preventDefault();
  document.getElementById('events-slider').style.display = "block";
  renderHTML(2, 4);
  activate_slider();
  closeSlider();
});
document.getElementById('event3').addEventListener('click', (event)=>{
  event.preventDefault();
  document.getElementById('events-slider').style.display = "block";
  renderHTML(3, 6);
  activate_slider();
  closeSlider();
});
document.getElementById('event4').addEventListener('click', (event)=>{
  event.preventDefault();
  document.getElementById('events-slider').style.display = "block";
  renderHTML(4, 4);
  activate_slider();
  closeSlider();
});
})




function renderHTML(eventNr, slides){
document.querySelector('#event-slider-wrapper ul').innerHTML = "";
event_number = eventNr;
slideCount = slides;

for(i=1; i<=slideCount; i++){
  document.querySelector('#event-slider-wrapper ul').innerHTML += `
  <li class="events_listitems" style="background-image:url(images/event${event_number}/event${event_number}_pic${i}.jpg);background-position:center;">
    <a class="close_slider_btn" href="#events-slider">
      <img class="close" src="images/close_btn.png">
    </a>
  </li>
  `;
}}

function activate_slider(){
  const slideCount = document.querySelectorAll('#event-slider-wrapper ul li').length;

  const slideWidth = document.querySelector('#event-slider-wrapper').offsetWidth;

  const totalWidth = slideCount * slideWidth+ 'px';

  const slider = document.querySelector('#event-slider-wrapper ul');
  const next = document.querySelector('#next');
  const previous = document.querySelector('#prev');

  let leftPosition = 0;
  let counter = 0;
  slider.style.width= totalWidth;

  next.addEventListener('click', (event)=>{
    event.preventDefault();
    counter++;
    if(counter == slideCount){counter = 0;}
      leftPosition = `-${counter * slideWidth}px`;
      slider.style.left = leftPosition;
  });
  previous.addEventListener('click', (event)=>{
    event.preventDefault();
    counter--;
    if(counter < 0){counter = slideCount-1;}
      leftPosition = `-${counter * slideWidth}px`;
      slider.style.left = leftPosition;
  });
}

function closeSlider() {
    const closeButtons = document.querySelectorAll('.close_slider_btn');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            document.getElementById('events-slider').style.display = "none";
        });
    });
}