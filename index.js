
const jumpy = document.getElementById('character')
const jungle = document.getElementById('background')
const startbtn = document.getElementById('startbtn');
const stopbtn = document.getElementById('stopbtn');

// the canvas
const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

let counter = 0;



// the character

let character = {
    img: jumpy,
    h: 50,
    w: 50,
    x: (canvas.width / 2)-25,
    y: canvas.height - 60,
    jumpCounter: 0,
    acceleration: 0.1,
    upSpeed: 15,
    canvasSpeed: 2.5,
    jumpButton: false,
    downMovement: false,
    fallOff: false,
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    },
    jump: function () {
        this.downMovement = false;
        this.fallOff = false;
        this.y -= this.upSpeed;
        this.jumpCounter += 1;
        this.upSpeed -= this.acceleration;
        if (this.jumpCounter % 8 === 0) { this.acceleration += 0.05 };

    },
    land: function () {
        if (checkStages()) {
            this.jumpButton = false;
            this.jumpCounter = 0;
            this.acceleration = 0.1;
            this.downMovement = true;
            this.upSpeed = 10;
        }

    },
    fallOffTheEdge: function () {
        if (checkStages() === false) {
            this.upSpeed = -10
            this.y -= this.upSpeed
        }

    },
    moveLeft: function () {
        if (this.x - 20 > -10) {
            this.x -= 20
        }
    },
    moveRight: function () {
        if (this.x + 20 < canvas.width) {
            this.x += 20
        }
    },
    moveDown: function () {
        this.y += this.canvasSpeed;

    }


}


// the background

let canvasObj = {
    img: jungle,
    x: 0,
    y: 0,
    speed: 2.5,

    move: function () {
        this.y += this.speed;
        this.y %= canvas.height;
    },

    draw: function () {
        ctx.drawImage(this.img, 0, this.y);
        if (this.speed < 0) {
            ctx.drawImage(this.img, 0, this.y + this.img.height);
        } else {
            ctx.drawImage(this.img, 0, this.y - canvas.height);
        }
    },
};



// the stages

const stageList = [];

class Stage {
    constructor(width, height, x, y, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = 2.5;
    }
};

function newStage() {

    if (counter % 55 === 0) {
        counter = 0;
        let minWidth = 80;
        let maxWidth = 180;
        let x = Math.floor(Math.random() * (canvas.width - minWidth));
        let y = -15;
        let width = Math.floor(Math.random() * (maxWidth - minWidth)) + minWidth;
        let color = '#3D290F'
        //let width = Math.floor(Math.random() * canvas.width - minGap);
        let height = 15;


        stageList.push(new Stage(width, height, x, y, color))

    }
}



function updateStages() {
    if (stageList.length != 0) {
        stageList.forEach(e => {
            e.y += e.speed;
            ctx.fillStyle = e.color;
            ctx.fillRect(e.x, e.y, e.width, e.height);

            if (e.y > canvas.height) {
                stageList.splice(0, 1);

            }

        })
    }
}


// check for stages to land on 

function checkStages() {
    let jumpyX = character.x;
    let jumpyY = character.y + character.h;
    for (let i = 0; i < stageList.length; i++) {
        let stage = stageList[i];
        let stageX = stage.x;
        let stageY = stage.y;
        let stageWidth = stage.width;
        // check if stage and character are at the same height
        if (jumpyY + character.upSpeed > stageY && jumpyY + character.upSpeed < stageY + 22) {

            // check left corner of character with right corner of stage
            if (jumpyX <= stageX + (stage.width - 15) && (jumpyX + character.w) > (stageX + 15)) {
                character.y = stage.y - character.h;
                return true;
            } // check right vorner of character with left corner of stage

        };

    }
    return false

}




// run function
let intervalId;

function run() {
    intervalId = setInterval(() => {

        ctx.clearRect(0, 0, 400, 600);
        canvasObj.move();
        canvasObj.draw();
        newStage();
        updateStages();


        character.draw();
        if (character.jumpButton) {
            character.jump()
        };
        if (character.upSpeed < 0) {
            character.land();
        };
        if (character.downMovement) {
            character.moveDown();
            character.fallOff = true;
        }
        if (character.fallOff) {
            character.fallOffTheEdge();
        }
        if (character.y > canvas.height + character.h) {
            stop();
        }

        counter += 1

    }, 1000 / 60);


}

function stop() {
    clearInterval(intervalId);
}





document.addEventListener('keydown', event => {

    if (event.key === 'ArrowUp') {
        character.jumpButton = true;
    }
    if (event.key === 'ArrowLeft') { character.moveLeft() }
    if (event.key === 'ArrowRight') { character.moveRight() }
}
)

startbtn.addEventListener('click', run)
stopbtn.addEventListener('click', stop)

window.onload=canvasObj.draw();
window.onload=character.draw();

/* */