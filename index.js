
const jumpy = document.getElementById('character')

// the canvas
const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

let counter = 0;



// the character

let character = {
    img: jumpy,
    h: 40,
    w: 20,
    x: canvas.width / 2,
    y: canvas.height - 40,
    jumpCounter: 0,
    acceleration: 0.1,
    upSpeed: 12,
    downSpeed: 5,
    jumpButton: false,
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    },
    jump: function () {
        this.y -= this.upSpeed;
        this.jumpCounter += 1;
        this.upSpeed -= this.acceleration;
        if (this.jumpCounter % 10 === 0) { this.acceleration += 0.05 }
        //if(this.jumpCounter>=)
        if (this.y + this.upSpeed >= canvas.height - 40) {
            console.log('down')
            this.y = canvas.height - 40
            this.jumpButton = false;
            this.jumpCounter = 0;
            this.acceleration = 0.1;
            this.upSpeed = 12;
        }

    },
    moveLeft: function () {
        this.x -= 12
    },
    moveRight: function () {
        this.x += 12
    }


}


// the background

let canvasObj = {
    width: canvas.width,
    height: canvas.height,


}

// the stages

const stageList = [];

class Stage {
    constructor(width, height, x, y, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = 1.5;
    }
};

function newStage() {

    if (counter % 190 === 0) {
        counter = 0;
        let minGap = 55;
        let maxGap = 150;
        let x = 0;
        let y = 0;
        let width = Math.floor(Math.random() * canvas.width - minGap);
        let height = 15;
        let minWidth = canvas.width - width;
        let secondX = width + Math.floor(Math.random() * ((maxGap - minGap))) + minGap;
        let color = '#3D290F';

        stageList.push(new Stage(width, height, x, y, color))
        stageList.push(new Stage(minWidth, height, secondX, y, color))
    }
}



function updateStages() {
    if (stageList.length != 0) {
        stageList.forEach(e => {
            e.y += e.speed;
            ctx.fillStyle = e.color;
            ctx.fillRect(e.x, e.y, e.width, e.height);

            if (e.y > canvas.height) {
                stageList.splice(0, 2);

            }

        })
    }
}
// run function


function run() {
    const intervalId = setInterval(() => {
        ctx.clearRect(0, 0, 400, 600)
        character.draw();
        newStage();
        updateStages();
        if (character.jumpButton) {
            character.jump()
        };
        counter += 1

    }, 1000 / 60);


}



run();

document.addEventListener('keydown', event => {

    if (event.key === 'ArrowUp') {
        character.jumpButton = true;
    }
    if (event.key === 'ArrowLeft') { character.moveLeft() }
    if (event.key === 'ArrowRight') { character.moveRight() }
}
)


/* */