
function main(){
  var player = document.getElementById('player');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var handleSuccess = function(stream) {
    player.srcObject = stream;
  };

  navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(handleSuccess)

  function drawFrame(video) {
  ctx.drawImage(video, 0, 0);

    setTimeout(function () {
      drawFrame(video);
    }, 10);
  }

  drawFrame(player);

}