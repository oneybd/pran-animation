

let product = $(".slide_1 .product")[0];

slide_1_show();
function slide_1_show(){
  $(".slide_1").removeClass("hidden");
  $(".slide_1 .drag").addClass("shake");
}

function slide_2_show(){
  $(".slide_2").removeClass("hidden");
  setTimeout(function() {
    $(".slide_2 .buyButton").removeClass("hidden").addClass("showZoomIn");
    setTimeout(function() {
      $(".slide_2 .buyButton").removeClass("showZoomIn").addClass("flyingMove");
    }, 2e2);
  }, 200);

}

if (typeof window.orientation !== 'undefined'){dragElementMobile(product);}else{dragElement(product);}

function dragElement(elmnt) {
  var pos1 = 0, pos3 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    $(".slide_1 .drag").removeClass("shake").addClass("hidden");


    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;

    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    leftSpace = elmnt.offsetLeft - pos1;

    draggedResult(elmnt,leftSpace);
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function dragElementMobile(elmnt) {
  var pos1 = 0, pos3 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
  } else {
    elmnt.ontouchstart = dragMouseDown;
  }

  function dragMouseDown(e) {
    $(".slide_1 .drag").removeClass("shake").addClass("hidden");
    e.preventDefault();

    e = e.touches[0] || window.event;
    pos3 = e.clientX;

    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e.touches[0] || window.event;
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    leftSpace = elmnt.offsetLeft - pos1;

    draggedResult(elmnt,leftSpace);
  }
  function closeDragElement() {
    document.ontouchend = null;
    document.touchmove = null;
  }
}

function draggedResult(elmnt, leftSpace){
  if(leftSpace>172){
      $(".food").css('background','');
      $(".slide_1 .food img").addClass("hideZoomOut");
      $(".slide_1 .food").addClass("fadeInZoom");
      $(elmnt).addClass("hideZoomOut");
      $(".slide_1 .drag_output").removeClass("hidden").addClass("fadeInZoom");
      $(".slide_1 .drag_text").addClass("hideZoomOut");
      slide_2_show();
    }
    if (leftSpace<20) {leftSpace=20}
    if (leftSpace>230) {leftSpace=230}

    elmnt.style.top = "120px";
    elmnt.style.bottom = "8px";
    elmnt.style.left = leftSpace + "px";
}
