let timeInterval = 0.01;
const e = 8.8;
const G = 6.67 * Math.pow(10, -11);

var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

// var particlula = new particle(50, 30, 10, 0, false, 0, 0);
const culori = ["red", "blue", "white", "yellow", "brown", "green"];
const particule = [];

class particle {
    constructor(posX, posY, mass, charge, isFixed, velX, velY, color) {
        this.posX = posX;
        this.posY = posY;
        this.mass = mass;
        this.charge = charge;
        this.isFixed = isFixed;

        this.velocityX = velX;
        this.velocityY = velY;

        this.accelX = 0.0;
        this.accelY = 0.0;

        this.color = color;

        ctx.beginPath();
        ctx.arc(this.posX, this.posY, 4, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();

    }
    move() {
        if(!this.isFixed){
            this.velocityX += this.accelX * timeInterval;
            this.velocityY += this.accelY * timeInterval;
    
            this.posX += this.velocityX * timeInterval;
            this.posY += this.velocityY * timeInterval;
        }

        ctx.beginPath();
        ctx.arc(this.posX, this.posY, 4, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

class fieldLines {
    constructor(posX, posY, mass, charge, isFixed, velX, velY, color) {
        this.posX = posX;
        this.posY = posY;
        this.mass = mass;
        this.charge = charge;
        this.isFixed = isFixed;

        this.velocityX = velX;
        this.velocityY = velY;

        this.accelX = 0.0;
        this.accelY = 0.0;

        this.color = color;

        ctx.beginPath();
        ctx.arc(this.posX, this.posY, 2, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();

    }
    move() {
        if(!this.isFixed){
            this.velocityX = this.accelX * timeInterval;
            this.velocityY = this.accelY * timeInterval;
    
            this.posX += this.velocityX * timeInterval;
            this.posY += this.velocityY * timeInterval;
        }

        ctx.beginPath();
        ctx.arc(this.posX, this.posY, 2, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

function addParticle() {
    let posX = parseFloat(document.getElementById("posX").value);
    let posY = parseFloat(document.getElementById("posY").value);
    let mass = parseFloat(document.getElementById("masa").value);
    let charge = parseFloat(document.getElementById("sarcina").value);
    let isFixed = document.getElementById("eFix").checked;

    let velX = parseFloat(document.getElementById("vitX").value);
    let velY = parseFloat(document.getElementById("vitY").value);
    let color = 0x050709;
    color += particule.length * 101;
    console.log(posX, posY, mass, charge, isFixed, velX, velY, culori[particule.length]);
    particule.push(new particle(posX, posY, mass, charge, isFixed, velX, velY, culori[particule.length]));
}

function animate() {
    timeInterval = document.getElementById("timespeed").value;
    for (let i = 0; i < particule.length; i++) {
        for (let j = 0; j < particule.length; j++) {
            if (i != j) {
                // console.log(i, j, particule.length);
                if((particule[j].posY - particule[i].posY) != 0) particule[i].accelY += -1 * ((Math.pow(10, 12) / Math.PI * 4 * e) * ((particule[i].charge * particule[j].charge) / (Math.pow(Math.sqrt(Math.pow(particule[j].posX - particule[i].posX, 2) + Math.pow(particule[j].posY - particule[i].posY, 2)), 3)) )) * (particule[j].posY - particule[i].posY) / particule[i].mass;
                if((particule[j].posX - particule[i].posX) != 0) particule[i].accelX += -1 * ((Math.pow(10, 12) / Math.PI * 4 * e) * ((particule[i].charge * particule[j].charge) / (Math.pow(Math.sqrt(Math.pow(particule[j].posX - particule[i].posX, 2) + Math.pow(particule[j].posY - particule[i].posY, 2)), 3)) )) * (particule[j].posX - particule[i].posX) / particule[i].mass;

                if((particule[j].posY - particule[i].posY) != 0) particule[i].accelY += G * ((particule[i].mass * particule[j].mass) / (Math.pow(Math.sqrt(Math.pow(particule[j].posX - particule[i].posX, 2) + Math.pow(particule[j].posY - particule[i].posY, 2)), 3)) ) * (particule[j].posY - particule[i].posY) / particule[i].mass;
                if((particule[j].posX - particule[i].posX) != 0) particule[i].accelX += G * ((particule[i].mass * particule[j].mass) / (Math.pow(Math.sqrt(Math.pow(particule[j].posX - particule[i].posX, 2) + Math.pow(particule[j].posY - particule[i].posY, 2)), 3)) ) * (particule[j].posX - particule[i].posX) / particule[i].mass;
            }
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // if(particule[1].posY < 220 && particule[1].posY > 180){
        // console.log(particule[0].accelX, particule[0].accelY)
    // }
    for (let i = 0; i < particle.length; i++) {
        particule[i].move();
    }

}
var siminterval;
function start() {
    siminterval = setInterval(animate, timeInterval * 1000)
}
function stop() {
    clearInterval(siminterval)
}
// particule.push(new fieldLines(75.0, 220.0, 0.001, 0.01, false, 0.0, 0.0, "yellow"))
// particule.push(new particle(270.0, 1520.0, 10.0, 0.0, false, 0.0, 0.0, "blue"));
// particule.push(new particle(600.0, 1220.0, 10000000000000.0, 0.0, false, -1.0, 0.0, "green"));
// particule.push(new particle(600.0, 1420.0, 100000.0, 0.0, false, 0.0, 0.0, "red"));
// particule.push(new particle(600.0, 1620.0, 10000000000000.0, 0.0, false, 1.0, 0.0, "yellow"));

// siminterval = setInterval(animate, timeInterval * 1);
// ctx.beginPath();
// ctx.arc(50, 50, 4, 0, 2 * Math.PI);
// ctx.fillStyle = "red";
// ctx.fill();
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(100, 100, 4, 0, 2 * Math.PI);
// ctx.fillStyle = "green";
// ctx.fill();
