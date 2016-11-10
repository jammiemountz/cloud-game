var gameOver = false;
var numClouds = 10;
var score = 0;
$('.score-text').html(score);
var cloudPositionArray= cloudPositionGenerator();
var game = setInterval(createCloud, 2000);
document.getElementById("game").focus();
checkOverlap();



$(document).keydown(function(e) {
    switch(e.which) {

        case 38: // up
        var position = parseInt($('.player').css('top'))
        if (position > 0) {
          $('.player').css({'top': position-50})
        }
        break;

        case 40: // down
        var position = parseInt($('.player').css('top'))
        if (position < 200) {
          $('.player').css({'top': position+50})
        }
        break;

        default: return;
    }
    e.preventDefault();
});


function cloudPositionGenerator() {
  // 0, 50, 100, 150, 200
  var gamePositionArr = [];
  for (var i = 0; i<numClouds; i++) {
    var newPosition = Math.floor(Math.random()*5)*50 + 120;
    gamePositionArr.push(newPosition);
    // if (newPosition !== gamePositionArr[i-1]) {
    // }
  }
  return gamePositionArr;
}

function createCloud() {
  if (cloudPositionArray.length !== 0){
    var cloud = $('<div class="cloud"></div>');
    cloud.css({"top": cloudPositionArray.pop()})
    $('#game').append(cloud);
  } else {
    setTimeout(endGame,1000)
    clearInterval(game)
  }
}

function updateScore() {
  score +=1;
  $('.score-text').html(score);
}

function endGame() {
  gameOver = true;
  if(score === numClouds) {
    $('.gameover-text').html('winner')
  } else {
    $('.gameover-text').html('you lose')
  }
}

function checkOverlap() {
  console.log('checking...');
  if (gameOver === true) {
    return;
  } else {
    var clouds = $('.cloud');
    for (var i=0; i<clouds.length; i++) {
      var isSameHorizontal = (parseInt($(clouds[i]).css('top'))-120) === parseInt($('.player').css('top'));
      var isPassed = parseInt($(clouds[i]).css('left'))<50;
      var hasNotAlreadyBeenCounted = !($(clouds[i]).hasClass('popped'));
      if (isSameHorizontal && isPassed && hasNotAlreadyBeenCounted) {
        $(clouds[i]).addClass('popped');
        updateScore();
      }
    }
    return setTimeout(checkOverlap,100)
  }
}

function valueInRange(value,min, max) {
   return (value >= min) && (value <= max);
}

function overlap (x1,y1,w1,h1,x2,y2,w2,h2) {
   xOverlap = valueInRange(x1, x2, x2 + w2) || valueInRange(x2, x1, x1 + w1);
   yOverlap = valueInRange(y1, y2, y2 + h2) || valueInRange(y2, y1, y1 + h1);
   return xOverlap && yOverlap;
}
