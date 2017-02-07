// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var mouseX, mouseY;
var bubbles = [];
var toRemove = [];


$(document).mousemove(function(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
})

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  $('#defaultCanvas0').css({'position': 'absolute', 'bottom': 0,
		'right': 0,
		'left': 0,
		'top': 0,
		'z-index': 20,
		'pointer-events': 'none'});
  textAlign(CENTER);
  textSize(16);
  colorMode('RGBA');
}

function draw() {
	clear()
  for (var i = 0; i < bubbles.length; i++) {
  	b = bubbles[i]
  	if (b.alpha <= 0) {
  		toRemove.push(i)
	  }
  	b.update_position()
   	fill(255, 255, 255, b.alpha)
  	text("+ " + Math.floor(b.bonus), b.x, b.y)
  }
  for (var i = 0; i < toRemove.length; i++) {
    bubbles.splice(toRemove[i], 1)
  }
  toRemove = [];
}

function bubble(bonus) {
	if ($('#defaultCanvas0').length == 0) {
		setup()
	}
	if (bubbles.length < 300) {
		b = new Bubble(bonus)
		b.index = bubbles.push(b)
	}
}

$(document).on('click', '#clicker', function(e) {
  e.preventDefault();
  App.game.click();
  bubble(bonus);
  var score = parseInt($('.score').html().replace(/\s/g, ''))

  score += bonus;
  str = score.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
  str = str.substring(0, str.length - 3);

  if ($('.score.' + team_name).html() != undefined) {
  	var current = parseInt($('.score.' + team_name).html().replace(/\s/g, ''))
  	if (current < score) {
      $('.score.' + team_name).html(str);
      $('.team_score.' + team_name).html(str);
    } 
  }
  // $('.team_score.' + team_name).html(str);
  // $('.score').html(str);
})

$(document).on('click', '.level_up_bonuses a', function(e) {
  bonus_id = $(e.target).parents('div').data("id")
  var current = parseInt($('.score.' + team_name).html().replace(/\s/g, ''))
  App.game.update_score(current)
  App.game.level_up(bonus_id)
  e.preventDefault()
})

$(document).on('click', '.level_up_auto_bonuses a', function(e) {
  bonus_id = $(e.target).parents('div').data("id")
  var current = parseInt($('.score.' + team_name).html().replace(/\s/g, ''))
  App.game.update_score(current)
  App.game.level_up_auto(bonus_id)
  e.preventDefault()
})

update_score = function() {

}

Bubble = function(bonus) {
	this.init(bonus)
}
Bubble.prototype.init = function(bonus) {
	this.x = mouseX
	this.y = mouseY
	this.bonus = bonus
	this.speed = Math.random() + 1
	this.alpha = 350
	this.decay = -Math.random() * 2 - 1
	this.angle = random(TWO_PI)
}

Bubble.prototype.update_position = function() {
	this.x += cos(this.angle) * this.speed
	this.y += sin(this.angle) * this.speed
	this.alpha += this.decay
}