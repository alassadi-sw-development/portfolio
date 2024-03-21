  const articleTop = document.getElementById('about_opening');
  const movingImage = document.getElementById('about_scrolling_img');
  const movingImageInitialTop = parseInt(window.getComputedStyle(movingImage).top);
  const movingImageInitialright = parseInt(window.getComputedStyle(movingImage).right);
  const rotatingText = document.getElementById('about_rotate');
  const p1 = document.getElementById('about_top1');
  const p2 = document.getElementById('about_top2');
  const p3 = document.getElementById('about_top3');

  window.addEventListener('load', ()=>{

  let factorWidth = calculateFactorWidth();
  let factorheight = calculateFactorheight();
  let pageTop;
  let doneResizing;
  let postTops = restPagePosition();
    console.log(postTops)
  window.addEventListener('scroll', ()=>{
    pageTop = (window.scrollY);
    console.log(postTops[0]);
    if (pageTop > postTops[0] && pageTop < postTops[1] ) {
      const scrollAmount = pageTop - postTops[0];
      movingImage.style.top = `calc(${movingImageInitialTop}px + ${scrollAmount * factorheight}px + 1rem)`;
      movingImage.style.right = movingImageInitialright + scrollAmount * factorWidth + 'px';
      rightAmout= movingImageInitialright + scrollAmount * factorWidth + 'px';
      movingImage.src = 'images/crunchyBeats_logo.JPG';
    } else if (pageTop > postTops[1] && pageTop < postTops[2] ) {
      const scrollAmount = pageTop - postTops[0];
      movingImage.style.top = movingImageInitialTop + scrollAmount-100 + 'px';
          if (window.innerWidth > 1420) {
            movingImage.style.right = 30* factorWidth + 'rem'
          } else if (window.innerWidth <= 1420 && window.innerWidth > 750) {
          movingImage.style.right = 20* factorWidth + 'rem'
          } else if (window.innerWidth <= 750) {
          movingImage.style.right = 16* factorWidth + 'rem'
          }
      movingImage.src = 'images/scroll/Sara1.jpg';
      p1.style.textShadow = '1px 1px 50px violet';
      p1.style.transform = 'scaleX(1.1)';
    } else if (pageTop > postTops[2] && pageTop < postTops[3] ) {
      const scrollAmount = pageTop - postTops[0];
          movingImage.style.top = movingImageInitialTop + scrollAmount-100 + 'px';
          if (window.innerWidth > 1420) {
            movingImage.style.right = 30* factorWidth + 'rem'
          } else if (window.innerWidth <= 1420 && window.innerWidth > 750) {
          movingImage.style.right = 20* factorWidth + 'rem'
          } else if (window.innerWidth <= 750) {
          movingImage.style.right = 16* factorWidth + 'rem'
          }
      movingImage.src = 'images/scroll/Sara2.jpg';
      p2.style.textShadow = '1px 1px 50px violet'
      p2.style.transform = 'scaleX(1.1)';
    } else if (pageTop > postTops[3] && pageTop < postTops[4] -(300*factorheight)) {
      const scrollAmount = pageTop - postTops[0];
      movingImage.style.top = movingImageInitialTop + scrollAmount-100 + 'px';
          if (window.innerWidth > 1420) {
            movingImage.style.right = 30* factorWidth + 'rem'
          } else if (window.innerWidth <= 1420 && window.innerWidth > 750) {
          movingImage.style.right = 20* factorWidth + 'rem'
          } else if (window.innerWidth <= 750) {
          movingImage.style.right = 16* factorWidth + 'rem'
          }
      movingImage.src = 'images/scroll/Sara3.jpg';
      p3.style.textShadow = '1px 1px 50px violet'
      p3.style.transform = 'scaleX(1.1)';
    } else if (pageTop > postTops[4]){
          if (window.innerWidth > 1420) {
            movingImage.style.right = 30* factorWidth + 'rem'
          } else if (window.innerWidth <= 1420 && window.innerWidth > 750) {
          movingImage.style.right = 20* factorWidth + 'rem'
          } else if (window.innerWidth <= 750) {
          movingImage.style.right = 16* factorWidth + 'rem'
          }
    }

    if (pageTop > postTops[1]){
      rotatingText.style.transform = 'rotate(90deg)';
      rotatingText.style.backgroundColor = 'hsla(291, 98%, 56%, 1)'
      rotatingText.style.textTransform = 'uppercase'
      rotatingText.style.width = '95rem'
    }else if (pageTop < postTops[1]) {
      rotatingText.style.transform = 'rotate(0deg)';
      rotatingText.style.backgroundColor = 'transparent'
      rotatingText.style.textTransform = 'none'
      rotatingText.style.width = '100%'
    }

  });

  window.addEventListener('resize', ()=>{
    factorWidth = calculateFactorWidth();
    factorheight = calculateFactorheight();
    if (window.innerWidth > 1420) {
      movingImage.style.right = 30* factorWidth + 'rem'
    } else if (window.innerWidth <= 1420 && window.innerWidth > 750) {
    movingImage.style.right = 20* factorWidth + 'rem'
    } else if (window.innerWidth <= 750) {
    movingImage.style.right = 16* factorWidth + 'rem'
    }
    console.log('done!')
    clearTimeout(doneResizing);
    doneResizing = setTimeout(()=>{
    postTops = restPagePosition();
    }, 500);
  });
  
  function calculateFactorWidth() {
    const windowWidth = window.innerWidth;
    let factor;
  
    if (windowWidth >= 1600) {
      factor = 0.75;
    } else if (windowWidth <= 350) {
      factor = 0.1;
    } else {
      // Calculate relative value between 0.999 and 0.211
      const range = 1600 - 350;
      const relativeValue = (windowWidth - 350) / range;
      factor = 0.211 + relativeValue * (0.999 - 0.211);
    }
  
    return factor;
  }
  function calculateFactorheight() {
    const windowWidth = window.innerWidth;
    let factor;
  
    if (windowWidth >= 1600) {
      factor = 0.75;
    } else if (windowWidth <= 350) {
      factor = 0.5;
    } else {
      // Calculate relative value between 0.999 and 0.211
      const range = 1600 - 350;
      const relativeValue = (windowWidth - 350) / range;
      factor = 0.211 + relativeValue * (0.999 - 0.211);
    }
  
    return factor;
  }

  function restPagePosition(){
    let postTops = [];
/*    articleTopCalc = postTops[0];
      station1 = postTops[1];
      station2 = postTops[2];
      station3 = postTops[3];
      station4 = postTops[4]; 
      movingImageInitialTop = postTops[5];
      movingImageInitialright = postTops[6];
      */

      postTops.push(Math.floor(articleTop.getBoundingClientRect().top) + window.scrollY);
      postTops.push(Math.floor(document.getElementById('about_rotate').getBoundingClientRect().top) + window.scrollY);
      postTops.push(Math.floor(document.getElementById('about_top1').getBoundingClientRect().top) + window.scrollY);
      postTops.push(Math.floor(document.getElementById('about_top2').getBoundingClientRect().top) + window.scrollY);
      postTops.push(Math.floor(document.getElementById('about_top3').getBoundingClientRect().top) + window.scrollY);
      postTops.push(parseInt(window.getComputedStyle(movingImage).top));
      postTops.push(parseInt(window.getComputedStyle(movingImage).right));

      return postTops;
    }
  })

