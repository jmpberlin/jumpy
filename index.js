
const jumpy = document.getElementById('character');
const jungle = document.getElementById('background');
const startbtn = document.getElementById('startbtn');
const stopbtn = document.getElementById('stopbtn');
const banana = document.getElementById('banana');
const points = document.getElementById('points');

// the canvas
const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

let counter = 0;


// THE GAME OBJECT  // LEVELS  // POINTS 


let game = {
    level: 0,
    points: 0,
    name: 'abc',
    counter: 0,
    gameSpeed: 2.5,
    updatePoints:function (){
        points.innerHTML=`Pooooints: ${this.points}`;

    }


}

// the character

let character = {
    img: jumpy,
    h: 50,
    w: 50,
    x: (canvas.width / 2) - 25,
    y: canvas.height - 60,
    jumpCounter: 0,
    acceleration: 0.1,
    upSpeed: 15,
    canvasSpeed: game.gameSpeed,
    jumpButton: false,
    downMovement: false,
    fallOff: false,
    stageLandedOnX: undefined,
    stageLandedOnWidth: undefined,
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    },
    jump: function () {
        this.stageLandedOnWidth = undefined;
        this.stageLandedOnX = undefined;
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
            this.upSpeed = 10;
            this.downMovement = true;

        }

    },
    fallOffTheEdge: function () {

        if (this.x > this.stageLandedOnWidth) {
            this.upSpeed = -10
            this.y -= this.upSpeed
        }
        if (this.x + this.w < this.stageLandedOnX) {
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
        if (this.x + 50 < canvas.width) {
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
    speed: game.gameSpeed,

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



// CREATING STAGES  // UPDATING STAGES 

const stageList = [];

class Stage {
    constructor(width, height, x, y, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = game.gameSpeed;
    }
};

function newStage() {

    if (game.counter % 40 === 0) {
        let minWidth = 80;
        let maxWidth = 180;
        let x = Math.floor(Math.random() * (canvas.width - minWidth));
        let y = -15;
        let width = Math.floor(Math.random() * (maxWidth - minWidth)) + minWidth;
        let color = '#3D290F'
        let height = 15;


        stageList.push(new Stage(width, height, x, y, color))

    }
}

// MOVE THE STAGES AND REMOVE THE INVISIBLE ONES
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


// CREATING ITEMS 


let itemList = [];

class Item {
    constructor(x, y) {
        this.img = banana;
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.speed = game.gameSpeed;
    }
};



function createItems() {
    if (game.counter % 30 === 0 && game.counter > 0) {
        let randX = Math.floor(Math.random() * canvas.width - 20)
        let y = -10;
        itemList.push(new Item(randX, y))

    }

}

function updateItems() {
    for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i];
        item.y += item.speed;
        ctx.drawImage(item.img, item.x, item.y, item.w, item.h);
        // delete obsolete Items!
        if (item.y > canvas.height) { itemList.splice(itemList.indexOf(item), 1) }

    }

}

// Check if MOnkey hits the Item

function collectItems() {
    for (let i=0;i<itemList.length;i++){
        let item=itemList[i];
        // check for the same height
        if(character.y>=item.y-character.h&&character.y<=item.y+item.h){
            // check for the same 'width'
            if(character.x>=item.x-character.w && character.x<=item.x+item.w){
                
                game.points+=10;
                itemList.splice(itemList.indexOf(item),1)

            }
        }


    }

}


// CHECK IF MONKEY HAS LANDED

function checkStages() {

    let jumpyX = character.x;
    let jumpyY = character.y + character.h;


    for (let i = 0; i < stageList.length; i++) {
        let stage = stageList[i];
        let stageWidth = stage.width;
        let stageX = stage.x;
        let stageY = stage.y;
        // check if stage and character are at the same height
        if (jumpyY - character.upSpeed > stageY && jumpyY < stageY) {

            // check left corner of character with right corner of stage
            if (jumpyX <= stageX + (stage.width - 15) && (jumpyX + character.w) > (stageX + 15)) {
                character.y = stage.y - character.h;
                character.stageLandedOnX = stageList[i].x;
                character.stageLandedOnWidth = stageList[i].x + stageList[i].width;
                game.points += 1;

                return true;
            } // check right vorner of character with left corner of stage

        };

    }
    return false

};







// run function
let intervalId;

function run() {
    intervalId = setInterval(() => {

        ctx.clearRect(0, 0, 400, 600);
        canvasObj.move();
        canvasObj.draw();

        // create and update Stages 

        newStage();
        updateStages();

        // create and update  and collect Bananas

        createItems();
        updateItems();
        collectItems();

        if (character.jumpButton) {
            character.jump()
        };
        if (character.upSpeed < 0) {
            character.land();
        };
        if (character.downMovement) {
            character.moveDown();
        }
        if (character.stageLandedOnWidth != undefined) {
            character.fallOffTheEdge()
            if (checkStages()) { character.stageLandedOnWidth = undefined }
        }



        character.draw();



        if (character.y > canvas.height + character.h) {
            stop();
        }

        game.counter += 1

        game.updatePoints();

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

let abc = setTimeout(() => { canvasObj.draw() }, 300)
let def = setTimeout(() => { character.draw() }, 300)
/*
window.onload=canvasObj.draw();
window.onload=character.draw();

 */