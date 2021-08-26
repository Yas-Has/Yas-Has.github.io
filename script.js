

function main(){
  var player = document.getElementById('player');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  



  var handleSuccess = function(stream) {
    player.srcObject = stream;
  };

  navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(handleSuccess)

  //color class
  class Color{

    constructor(r, g, b){
      this.r = r;
      this.g = g;
      this.b = b;
      this.distVals = [];

    }


  


    distance(other){
      return Math.pow(Math.pow(this.r - other.r, 2) + Math.pow(this.g - other.g, 2) + Math.pow(this.b - other.b, 2),1/2)
    }

  }

  //base colors
  const white = new Color(255, 255, 255);
  const silver = new Color(192, 192, 192);
  const gray = new Color(128, 128, 128);
  const black = new Color(0, 0, 0);
  const red = new Color(255, 0, 0);
  const maroon = new Color(128, 0, 0);
  const yellow = new Color(255, 255, 0);
  const olive = new Color(128, 128, 0);
  const lime = new Color(0, 255, 0);
  const green = new Color(0, 128, 0);
  const aqua = new Color(0, 255, 255);
  const teal = new Color(0, 128, 128);
  const blue = new Color(0, 0, 255);
  const navy = new Color(0, 0, 128);
  const fuchsia = new Color(255, 0, 255);
  const purple = new Color(128, 0, 128);

  //array of all colors, used to get absolute distance from each point
  const colorValues = [white, silver, gray, black, red, maroon, yellow, olive, lime, green, aqua, teal, blue, navy, fuchsia, purple];
  //used to get actual color names
  const colorNames = ["White", "Silver", "Gray", "Black", "Red", "Maroon", "Yellow", "Olive", "Lime", "Green", "Aqua", "Teal", "Blue", "Navy", "Fuchsia", "Purple"];
  


  function drawFrame(video) {
    ctx.drawImage(video, 0, 0);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //console.log(imageData.data);
    const numColors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


    for(let i = 0; i < 1499999; i += 4){
      let currentPixel = new Color(imageData.data[i], imageData.data[i+1], imageData.data[i+2]);

      //console.log(i);
      
      //console.log(currentPixel.r)
      for(let j = 0; j < colorValues.length; j++){

        let value = currentPixel.distance(colorValues[j])
        //console.log(value);
        // if(value < currentPixel.distVals[lowestIndex]){
        //   lowestIndex = j;
        // }
        currentPixel.distVals.push(value);
        value = 0;
      }
      let lowestIndex = 15;

      for(let j = 0; j < colorValues.length; j++){
        if(currentPixel.distVals[j] < currentPixel.distVals[lowestIndex]){
          lowestIndex = j;
        }

        
      }
      //console.log(currentPixel.distVals)
      //console.log(lowestIndex);
      //console.log(currentPixel.distVals);
      //currentPixel.color(colorNames[lowestIndex]);
      numColors[lowestIndex] = numColors[lowestIndex] + 1;
    }

    let largestIndex = 0;
    for(let i = 0; i < numColors.length; i++){
      if(numColors[i] > numColors[largestIndex]){
        largestIndex = i;
      }
    }

    let mostColor = colorNames[largestIndex];
    document.getElementById("colorName").innerHTML = mostColor;
    //console.log(numColors)

    setTimeout(function () {
      drawFrame(video);
    }, 10);
  }

  drawFrame(player);

  


  


}


