// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var mouseX, mouseY;
var bubbles = [];
$(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
})


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    $('#defaultCanvas0').css({'position': 'fixed', 'bottom': 0,
		'right': 0,
		'left': 0,
		'top': 0,
		'z-index': 20,
		'pointer-events': 'none'})
    textAlign(CENTER)
    textSize(16);
    colorMode('RGBA')
    noStroke()
}

function draw() {
	clear()
    for (i = 0; i < bubbles.length; i++) {
    	b = bubbles[i]
    	fill(200, 0, 0, b.alpha)
    	ellipse(b.x, b.y, 80, 80)
    	b.update_position()
	   	fill(0, 0, 0, b.alpha)

    	text("+ " + Math.floor(b.bonus), b.x, b.y)
    }
}

function bubble(bonus) {
	b = new Bubble(bonus)
	bubbles.push(b)
}

Bubble = function(bonus) {
	this.init(bonus)
}
Bubble.prototype.init = function(bonus) {
	this.x = mouseX
	this.y = mouseY
	this.bonus = bonus
	this.right_strength = Math.random(10)
	this.left_strength = Math.random(10)
	this.x_speed = Math.random(5)
	this.y_speed = Math.random(6)
	this.alpha = 360
	this.decay = -1
}

Bubble.prototype.update_position = function() {
	this.x -= this.x_speed
	this.y += (this.right_strength - this.left_strength) * this.y_speed
	this.alpha += this.decay
}