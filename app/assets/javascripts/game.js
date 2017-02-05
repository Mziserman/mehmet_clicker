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
}

function draw() {
    for (i = 0; i < bubbles.length; i++) {
    	b = bubbles[i]
    	// stroke(167)
    	fill(200)
    	ellipse(b.x, b.y, 80, 80)
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
	this.y = mouseX
	this.bonus = bonus
	this.up_strength = 20
	this.down_strength = 9.8
	this.right_strength = Math.random(10)
	this.left_strength = Math.random(10)
}