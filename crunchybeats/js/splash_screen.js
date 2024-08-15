(()=>{
  window.addEventListener('load', function() {
    const gifs = document.getElementsByClassName('entry_dance');
    Array.from(gifs).forEach(function(gif) {
        const src = gif.src;
        gif.src = ''; // Clearing the source
        gif.src = src; // Setting the source again
    });
  
    document.getElementById('splash_closing_arrow_link').addEventListener('click', closeSplash);

  });
  
  function closeSplash(event){
    event.preventDefault();
    document.getElementById('splash_screen_container').classList.add('hide');

  }  
})()