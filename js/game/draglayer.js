var dragLayer = function()
{
  var that = this;
  that.image = new Image();

  // Init Standard Values
  that.width = 1500;
  that.height = 300;
  
  that.X = 0;
  that.Y = 0;
  
  that.image.src = imageLoc+"blank.png";  
  
  that.animate = function(){     
    that.X += touchOffsetMomentum;
    that.Y += 0;
  }
  
  that.draw = function(){
    try {
      that.edgeCheck();
      // Draw
      ctx.drawImage(that.image, that.width, that.height, that.width, that.height, that.X, that.Y, that.width, that.height);
    } 
    catch (e) {
    };
  }
  
  that.edgeCheck = function()
  {
    if(that.X >= 0)
    {
      that.X = 0;
      return true;
    }
    
    if( that.X <= ((0 - that.width) + width) )
    { 
      that.X = ((0 - that.width) + width);
      return true;
    }
    
    return false;
  }
};