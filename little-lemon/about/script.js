(()=> {
  const tabs = document.querySelectorAll('section > ul > li >a');

  tabs.forEach(tab => {
    tab.addEventListener('click', selectTab);
  })

  function selectTab(){
    event.preventDefault();
    tabs.forEach(tab => {
      tab.removeAttribute('class');
    })
    this.className = 'active';

    const thisTab = this.getAttribute('href');
    const thisContent = document.querySelector(thisTab)

    const oldContent = document.querySelector('.visible');
    oldContent.className = 'visuallyhidden';
    oldContent.addEventListener('transitionend', ()=>{
      oldContent.className = 'hidden';
      thisContent.className = 'visible visuallyhidden';
      setTimeout(()=>{
        thisContent.classList.remove('visuallyhidden')
      },20);
    },{once:true})
  }

})()