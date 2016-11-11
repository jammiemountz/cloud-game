var game;
$('.playGame').on('click', startGame);
$('.exclamation').on('click', startGame);

function startGame() {
  game = {
    isOver:false,
    numClouds: 10,
    score: -1,
    cloudPositions: [],
    instance: setInterval(createCloud, 2000)
  }
  $('.exclamation').addClass('hidden');
  $('.playGame').addClass('hidden');
  $('.error').addClass('hidden');
  $('.rays').addClass('rays-animation');
  $('.earth').addClass('earth-animation');
  $('.sun').addClass('sun-animation');
  $('.player').addClass('player-animation')
  cloudPositionGenerator();
  updateScore();
  checkOverlap();
  document.getElementById("game").focus();
}

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
  for (var i = 0; i<game.numClouds; i++) {
    var newPosition = Math.floor(Math.random()*5)*50 + 120;
    gamePositionArr.push(newPosition);
  }
  game.cloudPositions = gamePositionArr;
}

function createCloud() {
  if (game.cloudPositions.length !== 0){
    var cloud = $('<div class="cloud"></div>');
    cloud.css({"top": game.cloudPositions.pop()})
    $('#game').append(cloud);
  } else {
    setTimeout(endGame,1000)
  }
}

function endGame() {
  clearInterval(game.instance)
  game.isOver = true;
  if(game.score === game.numClouds) {
    $('.gameover-text').html('winner')
  } else {
    $('.gameover-text').html('you lose')
  }
  $('.playGame').removeClass('hidden');
}

function cloudPopped(cloud) {
  $(cloud).addClass('popped');
  $('.player').addClass('squawk');
  setTimeout(function(){ $('.player').removeClass('squawk'); }, 400)
  updateScore();
}

function checkOverlap() {
  if (game.isOver === true) {
    return;
  } else {
    var clouds = $('.cloud');
    for (var i=0; i<clouds.length; i++) {
      var isSameHorizontal = (parseInt($(clouds[i]).css('top'))-120) === parseInt($('.player').css('top'));
      var isPassed = parseInt($(clouds[i]).css('left'))<50;
      var hasNotAlreadyBeenCounted = !($(clouds[i]).hasClass('popped'));
      if (isSameHorizontal && isPassed && hasNotAlreadyBeenCounted) {
        cloudPopped(clouds[i]);
      }
    }
    return setTimeout(checkOverlap,100)
  }
}

function updateScore() {
  game.score +=1;
  $('.score-text').html(game.score);
  $('.score-text').addClass('score-animation');
  setTimeout(function(){ $('.score-text').removeClass('score-animation'); }, 1000)
}
