const navLinks = document.querySelectorAll('#navigation_bar li a');
navLinks.forEach((link)=>{
  link.addEventListener('click', smoothScroll)
});

function smoothScroll(event){
  event.preventDefault();

  const targetID = event.target.getAttribute('href');
  const targetArticle = document.querySelector(targetID);
  const orginalTop = Math.floor(targetArticle.getBoundingClientRect().top);
  window.scrollBy({
    top: orginalTop,
    left: 0,
    behavior: 'smooth'
  });
/*   console.log(orginalTop); */
}

window.addEventListener('load', ()=>{
  const posts = document.querySelectorAll('article');
  let postTops = [];
  let pageTop;
  let counter = 1;
  let prevCounter = 1;
  let doneResizing;

  restPagePosition();
  window.addEventListener('scroll', ()=>{
    pageTop = (window.scrollY)+10;

    if(pageTop>postTops[counter]){
      counter++;
  /*     console.log(`scrolling down ${counter}`); */
    }else if (counter > 1 && pageTop < postTops[counter-1]){
      counter--;
/*       console.log(`scrolling up ${counter}`) */
    }
    if(counter != prevCounter){
      navLinks.forEach((link)=>{
        link.removeAttribute('class');
      });
      const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
      thisLink.className = "selected";
      prevCounter=counter;
    }
  });

  window.addEventListener('resize', ()=>{
    clearTimeout(doneResizing);
    doneResizing = setTimeout(()=>{
      restPagePosition();
    }, 500);
  });
  window.addEventListener('keyup', ()=>{
    clearTimeout(doneResizing);
    doneResizing = setTimeout(()=>{
      restPagePosition();
    }, 1000);
  });

/*   document.getElementById("course-name").addEventListener('keyup', ()=>{
    const input = document.getElementById("course-name");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("courses-table");
    const tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
  }) */

  function restPagePosition(){
    postTops = [];

    posts.forEach((post)=>{
      postTops.push(Math.floor(post.getBoundingClientRect().top + window.scrollY));
    });

    const pagePosition = window.scrollY +10;
    counter = 0;

    postTops.forEach((post)=>{
      if(pagePosition > post){
        counter++
      }
    });

    navLinks.forEach((link)=>{
      link.removeAttribute('class');
    });
    const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
    thisLink.className = "selected";
  }
  
});