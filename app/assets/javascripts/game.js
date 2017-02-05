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
		'pointer-events': 'none'})
    textAlign(CENTER)
    textSize(16);
    colorMode('RGBA')
}

function draw() {
	clear()
    for (var i = 0; i < bubbles.length; i++) {
    	b = bubbles[i]
    	if (b.alpha <= 0) {
    		toRemove.push(i)
		}
    	// fill(255, 59, 158, b.alpha)
    	// stroke(255, 59, 158, b.alpha + 30)
    	// ellipse(b.x, b.y, 80, 80)
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
	if (bubbles.length < 30) {
		b = new Bubble(bonus)
		b.index = bubbles.push(b)
	}
}

Bubble = function(bonus) {
	this.init(bonus)
}
Bubble.prototype.init = function(bonus) {
	this.x = mouseX
	this.y = mouseY
	this.bonus = bonus
	this.speed = Math.random(7, 10)
	this.alpha = 350
	this.decay = -1
	this.angle = random(TWO_PI)
}

Bubble.prototype.update_position = function() {
	this.x += cos(this.angle) * this.speed
	this.y += sin(this.angle) * this.speed
	this.alpha += this.decay
}