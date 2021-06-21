
const jumpy = document.getElementById('character')
const startbtn = document.getElementById('startbtn');
const stopbtn = document.getElementById('stopbtn');

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
    canvasSpeed: 2.5,
    jumpButton: false,
    downMovement:false,
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    },
    jump: function () {
        this
        this.y -= this.upSpeed;
        this.jumpCounter += 1;
        this.upSpeed -= this.acceleration;
        if (this.jumpCounter % 10 === 0) { this.acceleration += 0.05 };
        if (this.y + this.upSpeed >= canvas.height - 40) {
            this.y = canvas.height - 40
            this.jumpButton = false;
            this.jumpCounter = 0;
            this.acceleration = 0.1;
            this.upSpeed = 12;
        }

    },
    land: function () {
        if (checkStages()) {
            this.jumpButton = false;
            this.jumpCounter = 0;
            this.acceleration = 0.1;
            this.downMovement=true;
            this.upSpeed=12;
        }

    },
    moveLeft: function () {
        this.x -= 12
    },
    moveRight: function () {
        this.x += 12
    },
    moveDown:function(){
        this.y+=this.canvasSpeed;

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
        this.speed = 2.5;
    }
};

function newStage() {

    if (counter % 80 === 0) {
        counter = 0;
        let minWidth = 55;
        let maxWidth = 150;
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
        if (jumpyY + character.upSpeed > stageY && jumpyY + character.upSpeed < stageY + 20) {
            if (jumpyX >= stageX && jumpyX <= stageX + stageWidth+character.w) {
                character.y=stage.y-character.h;
                return true;
            } // function below still has to be checked
            if (jumpyX+character.w >= stageX && jumpyX <= stageX + stageWidth+character.w) {
                
                return true;
            }


        };

    }
    return false

}




// run function
let intervalId;

function run() {
    intervalId = setInterval(() => {

        ctx.clearRect(0, 0, 400, 600)
        character.draw();
        newStage();
        updateStages();
        if (character.jumpButton) {
            character.jump()
        };
        if (character.upSpeed < 0) {
            character.land();
        };
        if(character.downMovement){
            character.moveDown();
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


/* */