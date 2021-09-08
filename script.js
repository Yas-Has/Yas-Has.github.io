

function main(){
  var player = document.getElementById('player');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var appliedFilters = document.getElementById('appliedFilters');
  var ctxAppliedFilters = appliedFilters.getContext('2d');
  



  var handleSuccess = function(stream) {
    player.srcObject = stream;
  };

  player.addEventListener('playing', function() {
    console.log(player.videoWidth);
    console.log(player.videoHeight);

    canvas.width = player.videoWidth;
    canvas.height = player.videoHeight;

    appliedFilters.width = canvas.width - 2;
    appliedFilters.height = canvas.height - 2;

  }, false);

  navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(handleSuccess)

  //color class
  // class Color{

  //   constructor(r, g, b){
  //     this.r = r;
  //     this.g = g;
  //     this.b = b;

  //   }

  //   // get r() {
  //   //   return this.r;
  //   // }

  //   // get g() {
  //   //   return this.g;
  //   // }

  //   // get b() {
  //   //   return this.b;
  //   // }

  //   // set r(newR) {
  //   //   this.r = newR;
  //   // }

  //   // set g(newG) {
  //   //   this.g = newG;
  //   // }

  //   // set b(newB) {
  //   //   this.b = newB;
  //   // }


  //   absoluteDistance(other){
  //     return Math.abs(this.r - other.r) + Math.abs(this.g - other.g) + Math.abs(this.b - other.b)
  //   }


  //   distance(other){
  //     return Math.pow(Math.pow(this.r - other.r, 2) + Math.pow(this.g - other.g, 2) + Math.pow(this.b - other.b, 2),1/2)
  //   }

  // }
/*
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
  
*/

  const kernel = [[0, 0, 0], [0, 1, 0], [0, 0, 0,]]
  const factor = 1

  function drawFrame(video) {
    ctx.drawImage(video, 0, 0);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //console.log(imageData.data)
    var imageDataFiltered = ctxAppliedFilters.createImageData(appliedFilters.width, appliedFilters.height);



    // let pixelArray = new Array(480);
    // for(let i = 0; i < pixelArray.length; i++){
    //   pixelArray[i] = new Array(640)
    // }


    // for(let i = 0; i < pixelArray.length; i++){
    //   for(let j = 0; j < pixelArray[i].length; j++){
    //     pixelArray[i][j] = new Color(imageData.data[i*640*4 + j*4], imageData.data[i*640*4 + j*4 + 1], imageData.data[i*640*4 + j*4 + 2])
    //   }
    // }

    for (let y = 1; y < player.videoHeight - 1; y++){
      for(let x = 1; x < player.videoWidth - 1; x++){
        let red = 0;
        let green = 0;
        let blue = 0;
        for(let ky = 0; ky < kernel.length; ky++){
          for(let kx = 0; ky < kernel[0].length; kx++){
            let imageX = x + (kx - 1);
            let imageY = y + (ky - 1);
            red += imageData.data[imageY*player.videoHeight*4 + imageX*4] * kernel[ky][kx];
            green += imageData.data[imageY*player.videoHeight*4 + imageX*4 + 1] * kernel[ky][kx];
            blue += imageData.data[imageY*player.videoHeight*4 + imageX*4 + 2] * kernel[ky][kx];
          }
        }
        imageDataFiltered[(y - 1) * player.videoHeight * 4 + (x - 1) * 4] = (red*factor)
        imageDataFiltered[(y - 1) * player.videoHeight * 4 + (x - 1) * 4 + 1] = (green*factor)
        imageDataFiltered[(y - 1) * player.videoHeight * 4 + (x - 1) * 4 + 2] = (blue*factor)
        imageDataFiltered[(y - 1) * player.videoHeight * 4 + (x - 1) * 4 + 3] = 255
      }
    }

   
    


    ctxAppliedFilters.putImageData(imageDataFiltered,0,0);


    //console.log(imageData.data)
    //console.log(pixelArray)




    /*

    // console.log("numColors: " + numColors)
    // console.log("numColors1: " + numColors1)

    let largestIndex = 0;
    let largestIndex1 = 0;

    for(let i = 0; i < numColors.length; i++){
      if(numColors[i] > numColors[largestIndex]){
        largestIndex = i;
      }
      if(numColors1[i] > numColors1[largestIndex1]){
        largestIndex1 = i;
      }
    }

    let mostColor = colorNames[largestIndex];
    let mostColor1 = colorNames[largestIndex1];

    document.getElementById("colorName").innerHTML = mostColor;
    document.getElementById("colorName1").innerHTML = mostColor1;
    //console.log(numColors)
    */

    setTimeout(function () {
      drawFrame(video);
    }, 10000);
  }

  drawFrame(player);

  


  


}


