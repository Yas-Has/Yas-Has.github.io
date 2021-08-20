

function main(){
  var player = document.getElementById('player');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  



  var handleSuccess = function(stream) {
    player.srcObject = stream;
  };

  navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(handleSuccess)

  class Color{

    constructor(r, g, b, a){
      this.r = r;
      this.g = g;
      this.b = b;
      this.distVals = [];
      this.color = "";

    }

    absoluteDist(other){
      return Math.abs(this.r - other.r) + Math.abs(this.g - other.g) + Math.abs(this.b - other.b)
    }

    set color(color){
      this.color = color;
    }

  }

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

  const colorValues = [white, silver, gray, black, red, maroon,yellow, olive, lime, green, aqua, teal, blue, navy, fuchsia, purple];

  const colorNames = ["White", "Silver", "Gray", "Black", "Red", "Maroon", "Yellow", "Olive", "Lime", "Green", "Aqua", "Teal", "Blue", "Navy", "Fuchsia", "Purple"];
  const numColors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


  function drawFrame(video) {
    ctx.drawImage(video, 0, 0);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //console.log(imageData.data)
    let currentPixel;
    for(let i = 0; i < imageData.data; i += 4){
      currentPixel = new Color(i, i+1, i+2);
      let lowestIndex = 0;
      for(let j = 0; j < colorValues.length(); j++){

        let value = currentPixel.absoluteDist(colorValues[j])
        if(value < colorValues[lowestIndex]){
          lowestIndex = j;
        }
        currentPixel.distVals.push(value);
      }
      console.log(currentPixel.distVals)
      //currentPixel.color(colorNames[lowestIndex]);
      numColors[lowestIndex] = numColors[lowestIndex] + 1;
    }

    console.log(numColors)

    setTimeout(function () {
      drawFrame(video);
    }, 10);
  }

  drawFrame(player);

  


  


}


