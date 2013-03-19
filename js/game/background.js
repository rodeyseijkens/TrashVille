var background = function(parentLayer, imgSrc, width, height, posX, posY, parallaxOffsetX, parallaxOffsetY)
{
  var mainBG = false;
  var that = this;
  that.image = new Image();

  // Init Standard Values
  that.width = width;
  that.height = height;
  that.frames = 0; // Number of Frames
  that.actualFrame = 0;
  that.actionFrame = 0; // The Frame Height of The Action
  that.actionCounter = 0;
  that.action = "default";
  
  that.parallaxOffsetX =  parmCheck(parallaxOffsetX, 1);
  that.parallaxOffsetY =  parmCheck(parallaxOffsetY, 1);
  
  that.posX = parmCheck(posX, 0);
  that.posY = parmCheck(posY, 0);
  
  that.X = 0+posX;
  that.Y = 0+posY;
  
  that.image.src = imageLoc+ parmCheck("backgrounds/" +imgSrc,"blank.png");  
  
  that.interval = 0;
  that.draw = function(){
    
    // Get Proper Frame
    switch(that.action)
    {
    case "Special":
      that.actionFrame = 1;
      break;
    default:
      that.actionFrame = 0;
    }

    try {
      // Draw
      ctx.drawImage(that.image, that.width * that.actualFrame, that.height * that.actionFrame,  that.width, that.height, that.X+(parentLayer.X * that.parallaxOffsetX), that.Y+(parentLayer.Y * that.parallaxOffsetY), that.width, that.height);
    } 
    catch (e) {
    };
    
    if (that.interval == 4 ) {
      if (that.actualFrame == that.frames) {
        that.actualFrame = 0;
      }
      else {
        that.actualFrame++;
      }
      that.interval = 0;
    }
    that.interval++;
  }
};