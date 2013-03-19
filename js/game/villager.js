// define the villager Class
var villager = function(parentLayer,X,Y,imgSrc){ 
  var that = this;
  that.image = new Image();

  // Init Standard Values
  that.width = 50;
  that.height = 50;
  that.frames = 4; // Number of Frames
  that.actualFrame = 0;
  that.actionFrame = 0; // The Frame Height of The Action
  that.actionCounter = 0;
  that.action = "standing";
  
  that.actionFinished = true;
  
  that.xDir = 0;
  that.yDir = 0;
  
  that.moveSpeed = (Math.random() * 0.3) + 0.1;

  // Check Default Values
  that.image.src = imageLoc+parmCheck("villagers/" +imgSrc, "blank.png");
  that.X = parmCheck(X,(width/2));
  that.Y = parmCheck(Y,(height/2));
  
  
  function outsideBorder() {
  
    // Check X Border
    if(that.X <= parentLayer.X)
    {
    	return "Left";
    }
    else if((that.X + that.width) >= parentLayer.width)
    {
    	return "Right";
    }
    
    // Check Y Border
    if(that.Y <= parentLayer.Y)
    {
    	return "Up";
    }
    else if((that.Y + that.height ) >= parentLayer.height)
    {
    	return "Down";
    }
    
    return "No";
  }
  
  that.animate = function(){   
    
    switch(that.action)
    {
    case "wRight":
    
      that.xDir = 1;
      that.yDir = 0;
      
      break;
    case "wLeft":
    
      that.xDir = -1;
      that.yDir = 0;
      
      break;
    case "Special":
    
      that.xDir = 0;
      that.yDir = 0;
      
      break;
    default:
    
      that.xDir = 0;
      that.yDir = 0;
    }
    
    that.X += (that.xDir * that.moveSpeed);
    that.Y += (that.yDir * that.moveSpeed);
    
    // Delay Action
    if(that.actionCounter >= 240)
    {
      that.actionGen();
      
      // Reset Counter
      that.actionCounter = 0;
    }
    
    that.actionCounter += Math.random() * 10;
  }
  
  // Random Action Generator
  that.actionGen = function(){
    
    // Walking
    if( (((that.action == "wLeft") && (Math.random() < .6)) && (outsideBorder() != "Left")) )
    {
      // Walk Left
      that.action = "wLeft";
    }
    else if( (((that.action == "wRight") && (Math.random() < .6)) && (outsideBorder() != "Right")) )
    {
      // Walk Right
      that.action = "wRight";
    }
    else if( ((Math.random() < .35) && (outsideBorder() != "Left")) )
    {
      // Walk Left
      that.action = "wLeft";
    }
    else if( ((Math.random() < .5) && (outsideBorder() != "Right")) )
    {
      // Walk Right
      that.action = "wRight";
    }
    else if( Math.random() < .5 )
    {
      // Special
      that.action = "Special";
    }
    else
    {
       // Stand Still
       that.action = "Standing";
    }
    
  }
  
  that.interval = 0;
  that.draw = function(){
    
    // Get Proper Frame
    switch(that.action)
    {
    case "wRight":
      that.actionFrame = 1;
      break;
    case "wLeft":
      that.actionFrame = 2;
      break;
    case "Special":
      that.actionFrame = 3;
      break;
    default:
      that.actionFrame = 0;
    }

    try {
      // Draw
      ctx.drawImage(that.image, that.width * that.actualFrame, that.height * that.actionFrame,  that.width, that.height, that.X+parentLayer.X, that.Y+parentLayer.Y, that.width, that.height);
    } 
    catch (e) {
    };
    
    if (that.interval == 4 ) {
      if (that.actualFrame == that.frames) {
        that.actualFrame = 0;
        that.actionFinished = true;
      }
      else {
        that.actualFrame++;
        that.actionFinished = false;
      }
      that.interval = 0;
    }
    that.interval++;
  }
};