var myIndex = 0;
var btnMenu =document.getElementById('btnMenu')
var modal=document.querySelector('.modal-menu')


btnMenu.onclick = function() {
  if(!modal.classList.contains('appear')) {
    modal.classList.add('appear')
    btnMenu.innerHTML='X'
  } else {
    modal.classList.remove('appear')
    btnMenu.innerHTML='Menu'
  }
}

modal.onclick=function() {
  modal.classList.remove('appear')
  btnMenu.innerHTML='Menu'
}

carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); // Change image every 2 seconds
}


