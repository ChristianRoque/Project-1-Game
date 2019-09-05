//  select canvas 
const cvs = document.getElementById("canvas")
const ctx = cvs.getContext("2d")

//  game vars and const 
let running = true
let frames = 0
let jumped = false
let slashed = false
let score = 0
let enemyArr = []

for (let i = 0; i < 100; i++) {
    enemyArr.push({ x: i + 800, y: 360 })
}

// load sprite

// const start = new Image()
// start.src = "img/background.png"


const knight = new Image()
knight.src = "img/adventurer-v1.5-Sheet.png"

const knightInverse = new Image()
knightInverse.src = "img/02095342_adventurer-v1.5-Sheetcopy.png"

const sprite = new Image();
sprite.src = "img/sprite.png"

const hearts = new Image()
hearts.src = "img/heart_animated_2.png"

const enemySprite = new Image()
enemySprite.src = ""


// Sound effects 
const jumpingSFX = new Audio()
jumpingSFX.volume = 0.0
jumpingSFX.src = "img/jumping-sfx.mp3"

const walkingSFX = new Audio()
walkingSFX.volume = 0.0
walkingSFX.src = "img/walking-sfx.mp3"

const slashSFX = new Audio()
slashSFX.volume = 0.0
slashSFX.src = "img/sword-sfx.mp3"

const music = new Audio()
music.volume = 0.0
music.src = "img/Dark Cloud Soundtrack - The Village Festival.mp3"

// game current 
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
}

// background infinite

var bg = new Image();
bg.src = "img/bg2.png";


let background = {
    src: "img/bg2.png",
    x: 0,
    y: 0
}

//  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   MAIN CODE   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// controller 

document.addEventListener("click", function (e) {
    switch (state.current) {
        case state.getReady:
            state.current = state.game;
            music.play()
            break;
        case state.game:
            break;
        case state.over:
            state.current = state.getReady;
            break;

    }
})

let controller = {


    left: false,
    right: false,
    up: false,
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37:// left key
                controller.left = key_state;
                break;
            case 38:// up key
                controller.up = key_state;
                jumpingSFX.play()
                break;
            case 39:// right key
                controller.right = key_state;
                break;
            case 32:// spacebar
                controller.space = key_state;
                break;
        }

    }

};


// Enemies 


const enemy = {

    animation: [{ sX: 0, sY: 0 }],
    w: 40,
    h: 40,
    x: 200,
    y: 100,
    health: 1,
    attack: 1,

    frame: 0,

    draw: function () {
        if (this.health <= 0) {
            let enemy = enemyArr[0]
            ctx.drawImage(knight, 0, 0, this.w, this.h, enemy.x, enemy.y, 60, 80)
        }

        else {
            let enemy = enemyArr[0]
            ctx.drawImage(knight, 0, 0, this.w, this.h, enemy.x, enemy.y, 60, 80)
        }
    },


    right: function () {
        enemyArr[0].x -= 2
    },

    left: function () {
        enemyArr[0].x += 2
    },

    slashedd: function () {
        enemyArr[0].x -= 3
    },

    update: function () {
        this.period = state.current == state.getReady ? 10 : 10;
        this.frame += frames % this.period == 0 ? 1 : 0;
        this.frame = this.frame % 10;
    }

}

// Hero 

const hero = {

    animation: [
        [{ sX: 50, sY: 40 },
        { sX: 100, sY: 40 },
        { sX: 150, sY: 40 },
        { sX: 200, sY: 40 },
        { sX: 250, sY: 40 },
        { sX: 300, sY: 40 }],

        [{ sX: 0, sY: 0 },
        { sX: 50, sY: 0 },
        { sX: 100, sY: 0 },
        { sX: 150, sY: 0 },
        { sX: 100, sY: 0 },
        { sX: 50, sY: 0 }],

        [{ sX: 150, sY: 80 },
        { sX: 150, sY: 80 },
        { sX: 150, sY: 80 },
        { sX: 200, sY: 80 },
        { sX: 200, sY: 80 },
        { sX: 200, sY: 80 }],

        [{ sX: 285, sY: 40 },
        { sX: 235, sY: 40 },
        { sX: 185, sY: 40 },
        { sX: 135, sY: 40 },
        { sX: 85, sY: 40 },
        { sX: 35, sY: 40 }],

        [{ sX: 150, sY: 480 },
        { sX: 300, sY: 480 },
        { sX: 0, sY: 520 },
        { sX: 50, sY: 520 },
        { sX: 150, sY: 480 },
        { sX: 300, sY: 480 }],

        [{ sX: 300, sY: 295 },
        { sX: 0, sY: 333 },
        { sX: 50, sY: 333 },
        { sX: 100, sY: 333 },
        { sX: 150, sY: 333 },
        { sX: 200, sY: 333 }]


    ],

    w: 40,
    h: 40,
    x: 20,
    y: 150,

    frame: 0,


    speed: 0,
    gravity: 0.25,
    jump: 6.5,

    chests: 0,
    health: 4,

    draw: function () {


        if (controller.up && this.y < 340) {
            let hero = this.animation[2][this.frame]
            ctx.drawImage(knight, hero.sX, hero.sY, this.w, this.h, this.x, this.y, 60, 80)
        }

        else if (controller.right) {
            let hero = this.animation[0][this.frame]
            ctx.drawImage(knight, hero.sX, hero.sY, this.w, this.h, this.x, this.y, 60, 80)
        }

        else if (controller.left) {
            let hero = this.animation[3][this.frame]
            ctx.drawImage(knightInverse, hero.sX, hero.sY, this.w, this.h, this.x, this.y, 60, 80)
        }

        else if (controller.space) {
            let hero = this.animation[4][this.frame]
            ctx.drawImage(knight, hero.sX, hero.sY, 60, 40, this.x, this.y - 20, 75, 95)
        }

        else if (this.health <= 0) {
            let hero = this.animation[5][this.frame]
            ctx.drawImage(knight, hero.sX, hero.sY, this.w, this.h, this.x, this.y, 60, 80)
        }

        else {
            let hero = this.animation[1][this.frame];
            ctx.drawImage(knight, hero.sX, hero.sY, this.w, this.h, this.x, this.y, 60, 80)
        }

    },


    heartsDraw: function () {
        switch (this.health) {

            case (this.health = 4):// left key
                ctx.drawImage(hearts, 0, 0, 17, 20, 40, 450, 30, 30)
                break;
            case (this.health = 3):// left key
                ctx.drawImage(hearts, 17, 0, 17, 20, 40, 450, 30, 30)
                break;
            case (this.health = 2):// left key
                ctx.drawImage(hearts, 34, 0, 17, 20, 40, 450, 30, 30)
                break;
            case (this.health = 1):// left key
                ctx.drawImage(hearts, 51, 0, 17, 20, 40, 450, 30, 30)
                break;
            case (this.health = 0):// left key
                ctx.drawImage(hearts, 68, 0, 17, 20, 40, 450, 30, 30)
                break;
        }
    },


    jumping: function () {
        this.speed = - this.jump
        jumped = true
    },

    right: function () {
        this.x += 0.5
    },

    left: function () {
        this.x -= 3
    },

    slash: function () {
        this.x += 3
        slashed = true
    },

    isAlive: function () {
        if (this.health <= 0) {
            state.current = 2

            setTimeout(function () {
                hero.w = 0
                hero.h = 0
            }, 750)
        }
    },

    collision: function () {
        if (this.x + 25 > enemyArr[0].x && this.x < enemyArr[0].x + 25 && this.y + this.h > enemyArr[0].y && this.y < enemyArr[0].y + 25 && slashed == false) {
            console.log("hurts")
            hero.x -= 60
            enemyArr[0].x += 60
            hero.health -= 1
        }
        else if (this.x + 25 > enemyArr[0].x && this.x < enemyArr[0].x + 25 && this.y + this.h > enemyArr[0].y && this.y < enemyArr[0].y + 25 && slashed == true) {
            console.log("hurts him")
            enemy.health -= 50
            if (enemy.health <= 0) {
                setTimeout(function () { enemyArr.shift(); }, 1000);
            }
            hero.x -= 60
            enemyArr[0].x += 60
        }

    },

    update: function () {
        this.period = state.current == state.getReady ? 10 : 10;
        this.frame += frames % this.period == 0 ? 1 : 0;
        this.frame = this.frame % 6;

        if (state.current == state.getReady) {
            this.y = 360
        }
        else {
            this.speed += this.gravity;
            this.y += this.speed;
            if (this.y >= 360) {
                this.y = 360
                jumped = false
            }
        }
    }
}

// get ready 

const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width / 2 - 173 / 2,
    y: 80,

    draw: function () {
        if (state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
        }
    }
}

// 

const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width / 2 - 225 / 2,
    y: 90,

    draw: function () {
        if (state.current == state.over) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
            ctx.drawImage(knight, 200, 333, 40, 40, hero.x, hero.y, 60, 80)
        }
    }
}


//  draw 


function draw() {
    ctx.fillStyle = "rgb(21,24,37)"
    ctx.fillRect(0, 0, cvs.width, cvs.height)
    for (var w = 0; w < 1000; w++) {
        ctx.drawImage(bg, (w * cvs.width * 2.2) + background.x, 0);
        //context.drawImage(bg, w*background.x, 0); trippy

    }
    enemy.draw()
    hero.draw()
    getReady.draw()
    gameOver.draw()
    hero.heartsDraw()

}

//  update 

function update() {
    enemy.update()
    hero.update()
    hero.isAlive()
}

//  loop 

function loop() {
    update();
    draw();
    frames++;
    if (controller.up && jumped == false) {
        hero.jumping()
        jumpingSFX.play();
    }

    else if (controller.right) {
        hero.right()
        enemy.right()
        background.x -= 3;
        if (jumped == false) {
            walkingSFX.play()
        }
    }

    else if (controller.left) {
        hero.left()
        enemy.left()
        background.x += 3;
        if (jumped == false) {
            walkingSFX.play()
        }
    }

    else if (controller.space && slashed == false) {
        hero.slash()
        enemy.slashedd()
        background.x -= 4
        slashSFX.play()
        slashed = true
    }

    if (hero.x < 32) {

        hero.x = 32;

    } else if (hero.x > 550) {// if rectangle goes past right boundary

        hero.x = 550;
    }

    setTimeout(function () {
        slashed = false
    }, 3000)
    hero.collision()
    requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop);
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


$(document).ready(function() {
    var canvas = $('#canvasRain')[0];
    canvas.width = 600;
    canvas.height = 430;
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        ctx.strokeStyle = 'rgba(250,250,250,0.5)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        var init = [];
        var maxParts = 1000;
        for (var a = 0; a < maxParts; a++) {
            init.push({
                x: Math.random() * w,
                y: Math.random() * h,
                l: Math.random() * 1,
                xs: -4 + Math.random() * 4 + 2,
                ys: Math.random() * 10 + 10
            })
        }
        var particles = [];
        for (var b = 0; b < maxParts; b++) {
            particles[b] = init[b];
        }
        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (var c = 0; c < particles.length; c++) {
                var p = particles[c];
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                ctx.stroke();
            }
            move();
        }
        function move() {
            for (var b = 0; b < particles.length; b++) {
                var p = particles[b];
                p.x += p.xs;
                p.y += p.ys;
                if (p.x > w || p.y > h) {
                    p.x = Math.random() * w;
                    p.y = -20;
                }
            }
        }
        setInterval(draw, 50);
    }
 });
 
 
 