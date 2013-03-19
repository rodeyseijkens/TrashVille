var width = window.innerWidth;
var height = 300;
var gLoop;
var frameRate = 30;

var c = document.getElementById('c'); 
var ctx = c.getContext('2d');
  c.width = width;
  c.height = height;

var imageLoc = "images/";  
var maxVillagers = 20;
var villagersArray = [];

// Scroll Offset
var touchOffsetMomentum = 0;
var touchOffsetX = 0;
var touchOffsetY = 0;

var globalMouse = false;


// Music
var bgMusic = new Audio();
bgMusic.src = "bgSound.mp3";
bgMusic.loop = true;
bgMusic.play();


// Orientation Change
window.onorientationchange = function() {
  width = window.innerWidth;
    c.width = width;
    c.height = height;
}
/////////////////////

// For getting the fps
var timeInterval = 0;
var lastTime = 0;
var frame = 0;
var avgFps = 0;

function getfps() {	   
     frame ++; 
     var date = new Date();
     var thisTime = date.getTime();
     timeInterval = 1000 / (thisTime - lastTime);
     lastTime = thisTime;

     if (frame % 10 == 0) {
          avgFps = Math.round(timeInterval * 10) / 10;
     }

     return avgFps.toFixed(0);
};
//////////////////////

////// CHECK MOBILE
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// WindowAnimation
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
///////////////////






if(isMobile.any())
{
  // prevent elastic scrolling
  document.body.addEventListener('touchmove',function(event)
  {
    event.preventDefault();
  },false);	// end body:touchmove

  // attach the touchstart, touchmove, touchend event listeners.
  c.addEventListener('touchstart',touchStartEvent, false);
  c.addEventListener('touchmove',touchMoveEvent, false);
  c.addEventListener('touchend',touchEndEvent, false);

  // touch functions
  function touchStartEvent(e)
  {   
    var touch = e.targetTouches[0];
    
    touchStartPosX = touch.pageX;
    touchStartPosY = touch.pageY;
    
    touchOffsetMomentum = 0;
  }
  function touchMoveEvent(e)
  {
    var touch = e.targetTouches[0];

    if(touchStartPosX < touch.pageX)
    {
      touchOffsetX = touch.pageX - touchStartPosX;
    }
    else if(touchStartPosX > touch.pageX)
    {
      touchOffsetX = touch.pageX - touchStartPosX;
    }
    
    if(touchStartPosY < touch.pageY)
    {
      touchOffsetY = touch.pageY - touchStartPosY;
    }
    else if(touchStartPosY > touch.pageY)
    {
      touchOffsetY = touch.pageY - touchStartPosY;
    }
    
    touchOffsetMomentum = (0.1* touchOffsetX);
  }
  function touchEndEvent(e)
  {
     //event.targetTouches[0].pageX
     //event.targetTouches[0].pageY
     
     touchOffsetMomentum-= touchOffsetMomentum;
  }
}
else
{
  // attach the mouse event listeners.
  c.addEventListener("mousedown", mouseStartEvent, false);
  c.addEventListener("mousemove", mouseMoveEvent, false);
  c.addEventListener("mouseup", mouseEndEvent, false);

  // touch functions
  function mouseStartEvent(e)
  {    
    touchStartPosX = e.pageX
    touchStartPosY = e.pageY;
    
    touchOffsetMomentum = 0;
    
    globalMouse = true;
  }
  function mouseMoveEvent(e)
  {
    
    if(globalMouse)
    {
      var touch = e;

      if(touchStartPosX < touch.pageX)
      {
        touchOffsetX = touch.pageX - touchStartPosX;
      }
      else if(touchStartPosX > touch.pageX)
      {
        touchOffsetX = touch.pageX - touchStartPosX;
      }
      
      if(touchStartPosY < touch.pageY)
      {
        touchOffsetY = touch.pageY - touchStartPosY;
      }
      else if(touchStartPosY > touch.pageY)
      {
        touchOffsetY = touch.pageY - touchStartPosY;
      }
      
      // Output
      touchOffsetMomentum = (0.05* touchOffsetX);
    }
  }
  function mouseEndEvent(e)
  {     
    touchOffsetMomentum-= touchOffsetMomentum;
    globalMouse = false;
  }
}



var clear = function()
{
  ctx.clearRect(0, 0, width, height);
}

var parmCheck = function(arg, def){
   return (typeof arg == 'undefined' ? def : arg);
}


var gameInit = function(){

  // Create background
  baseLayer = new dragLayer();
  
  bg0 = new background(baseLayer,"bg.png", 700, 300, 0, 0, 0.05, 1);
  bg1 = new background(baseLayer,"topCave.png", 825, 146, -50, 0, 0.1, 1);
  bg2 = new background(baseLayer,"botCave.png", 599, 70, 100, 220, 0.3, 1);
  bg3 = new background(baseLayer,"ground.png", 1600, 29, -50, 271, 1, 1);
  
  // Buildings - parentLayer, imgSrc, width, height, posX, posY, parallaxOffsetX, parallaxOffsetY
  building0 = new building(baseLayer, "building0.png", 103, 180, 90, 110, 0.90, 1);
  building1 = new building(baseLayer, "building2.png", 206, 150, 280, 140, 0.90, 1);
  building2 = new building(baseLayer, "building1.png", 102, 160, 182, 130, 0.90, 1);
  building3 = new building(baseLayer, "building3.png", 246, 100, 490, 190, 0.90, 1);
  building4 = new building(baseLayer, "building4.png", 95, 160, 740, 131, 0.90, 1);
  
  
  // Create Villagers
  for (var iV=0;iV<maxVillagers;iV++)
  {
    var rN = iV + 1;
    
    if(iV <= 10)
    {
      imgSRC = "villager"+iV+".png";
      
      villagersArray[iV] = new villager(baseLayer,(((baseLayer.width)/maxVillagers)*rN), height-53, imgSRC);
    }
    else
    {
      villagersArray[iV] = new villager(baseLayer,(((baseLayer.width)/maxVillagers)*rN), height-53, "villager1.png");
    }
  }
  
  // Last Checks
  if(isMobile.any())
  {
    frameRate = 60;
  }
  
	gameLoop();
}    
    
var gameLoop = function(){

  clear();
  
  // Drag Layer
  baseLayer.draw();
  baseLayer.animate();
  
  // Background
  bg0.draw();
  
  // topCave
  bg1.draw();
  
  // botCave
  bg2.draw();
  
  // Buildings
  building0.draw();
  building1.draw();
  building2.draw();
  building3.draw();
  building4.draw();
  
  // Ground
  bg3.draw();
  
  
  // Villagers
  for (var iV=0;iV<maxVillagers;iV++)
  {    
    villagersArray[iV].draw();
    villagersArray[iV].animate();
  }
  
  // Return Loop  
  gLoop = setTimeout(function() {
        window.requestAnimationFrame(gameLoop);
  }, 1000 / frameRate);
  
  // DRAW FPS
  document.getElementById("scoreBar").innerHTML = "fps: " + getfps();
}

gameInit();