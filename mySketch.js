class Ball{
	constructor(args){
		this.r = args.r || 100
		this.p = args.p || createVector(width/2, height/2)//{x:width/2, y:height/2}
		this.v = args.v || p5.Vector.random2D().mult(5)//{x:random(-2,2), y:random(-2,2)}
		this.a = args.a || createVector(0, 0)//{x:0, y:0}
		this.color = random(["#FDFFFC","#235789","#C1292E","#F1D302"])
		this.mode = random(["happy","sad"])
		this.rId = random(10000)
	}
	draw(){
		push()
			translate(this.p.x, this.p.y)
			fill(this.color)
			noStroke()
			ellipse(0,0,this.r)	
			if(this.mode =="happy"){
				fill(255)
				ellipse(0,0,this.r/2)
				fill(0)
				ellipse(0,0,this.r/3)
			}else{
				fill(255)
				arc(0,0,this.r/2,this.r/2,0,PI)
				fill(0)
				arc(0,0,this.r/3,this.r/3,0,PI)
			}
			stroke(this.color)
			strokeWeight(4)
			noFill()
			for(var o=0; o<8; o++){
				rotate(PI/4)
				beginShape()
					for(var i=0; i<30; i++){
						vertex(this.r/2 + i, sin(i/5 - frameCount/5 + this.rId) * 5)
					}
				endShape()
			}
		
		pop()
	}
	update(){
		this.p.add(this.v)
		this.v.add(this.a)
		// this.p.x += this.v.x
		// this.p.y += this.v.y
		// this.v.x += this.a.x
		// this.v.y += this.a.y
		
		let mouseV = createVector(mouseX, mouseY)
		let delta = mouseV.sub(this.p).limit(5)
		this.p.add(delta)
		
		if(this.mode =="happy"){
			this.p.y += sin(frameCount/(10+ this.rId /100)) * 5
		}
		
		this.v.mult(0.99)
		// this.v.x *= 0.99
		// this.v.y *= 0.99
		
		if(this.p.y>height){
			this.v.y = -abs(this.v.y)
		}
	}
	
	escape(){
		this.v.x = random(-10, 10)
		
	}
	
	setHappy(){
		this.mode ="happy"
	}
	setMode(mode){
		this.mode = mode
	}
	isBallInRange(){
		let d = dist(mouseX, mouseY, this.p.x, this.p.y)
		if(d<this.r){
			return true
		}else{
			return false
		}
	}
}


var balls = []
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	for(var i=0; i<50; i++){
		let ball = new Ball({
			r:random(10, 100),
			p:createVector(random(width), random(height))
		})
		balls.push(ball)
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)

}

function draw() {
	background(0)
	for(let ball of balls){
		ball.draw();
		ball.update();
		if(ball.isBallInRange()){
			ball.color = "#41f25e"
		}
	}
}

function mousePressed(){
	let ball = new Ball({
			r:random(100),
			p:createVector(mouseX,mouseY)//{x:mouseX, y:mouseY}
		})
		balls.push(ball)
	
	
	for(let ball of balls){
		ball.setHappy()
		ball.escape()
	}
}