


const jumpy = document.getElementById('character');
const jungle = document.getElementById('background');
const startbtn = document.getElementById('startbtn');
const banana = document.getElementById('banana');
const points = document.getElementById('points');
const level = document.getElementById('level');
const beer = document.getElementById('beer');
const lives = document.getElementById('lives');
const start = document.getElementById('start');
const countdown1 = document.getElementById('countdown1');
const countdown2 = document.getElementById('countdown2');
const countdown3 = document.getElementById('countdown3');
const jump = document.getElementById('jump');
const gameover = document.getElementById('gameover');
const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const stage3 = document.getElementById('stage3');
const snake1 = document.getElementById('snake1');
const snake2 = document.getElementById('snake2');
const snake3 = document.getElementById('snake3');
const snake4 = document.getElementById('snake4');
const snake5 = document.getElementById('snake5');


// the canvas
const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

let counter = 0;


// THE GAME OBJECT  // LEVELS  // POINTS 

// Interval-Id for the start / end
let startIntervalId;
let endIntervalId;

let game = {

    level: 1,
    levelSpeed: 19,  /// BEEN WORKING ON CHANGING THE JUMPING SPEED BY REFERENCING A GAME "LEVELSPEED"!
    levelAccileration: 0.4,
    levelStageModulo: 35,
    drunkness: 0,
    points: 0,
    name: 'abc',
    counter: 0,
    timeOutCounter: 0,
    gameSpeed: 2.5,
    lives: 3,
    ep: 100,
    lifeImg: lives,
    startImg: start,
    cdImg1: countdown1,
    cdImg2: countdown2,
    cdImg3: countdown3,
    cdImg0: jump,
    countdownY3: 0 - countdown3.height * 2,
    countdownY2: 0 - (countdown2.height * 6),
    countdownY1: 0 - (countdown1.height * 8.5),
    countdownY0: 0 - (countdown1.height * 12),
    gameoverImg: gameover,
    gameoverStatus: false,
    running: false,
    updatePoints: function () {
        points.innerHTML = `Points: ${this.points}`;

    },
    displayCountdown: function () {

        if (this.countdownY0 < canvas.height) {
            this.countdownY1 += 12;
            ctx.drawImage(this.cdImg3, canvas.width / 2 - (this.cdImg1.width / 2), this.countdownY3);
            this.countdownY2 += 12;
            ctx.drawImage(this.cdImg2, canvas.width / 2 - (this.cdImg1.width / 2), this.countdownY2);
            this.countdownY3 += 12;
            ctx.drawImage(this.cdImg1, canvas.width / 2 - (this.cdImg1.width / 2), this.countdownY1);
            this.countdownY0 += 12;
            ctx.drawImage(this.cdImg0, canvas.width / 2 - (this.cdImg0.width / 2), this.countdownY0);
        }
    },

    checkForActions: function () {
        this.timeOutCounter += 1;
        if (this.timeOutCounter === 360) {


            if (character.y === canvas.height - 60) {
                this.countdownY0 = -180



            }
        }



        if (this.timeOutCounter === 600) {

            if (character.y === canvas.height - 60) {
                stop();

            }
        }


    },

    displayLives: function () {
        let w = this.lifeImg.width;
        let h = this.lifeImg.height;
        for (let i = 0; i < this.lives; i++) {
            ctx.drawImage(this.lifeImg, canvas.width - w * (1 + i), 0);

        }
    },
    displayStart: function () {
        let x = (canvas.width - this.startImg.width) / 2
        let y = (canvas.height - this.startImg.height) / 2
        let w = this.startImg.width;
        let h = this.startImg.height;
        let zoom = 0;

        startIntervalId = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            canvasObj.draw();
            character.draw();
            game.displayLives();
            if (zoom < 100) {
                zoom += 1;
                x -= 0.05;
                y -= 0.05;
                w += 0.1;
                h += 0.1;

                ctx.drawImage(this.startImg, x, y, w, h)
            }
            if (zoom >= 100) {
                zoom += 1;
                x += 0.05;
                y += 0.05;
                w -= 0.1;
                h -= 0.1;
                ctx.drawImage(this.startImg, x, y, w, h)
                if (zoom === 200) { zoom = 0; }
            }


        }, 1000 / 60);
    },
    displayEnd: function () {

        if (this.lives < 1) {
            let x = 0;
            let y = 0;
            let vertical = 0.3;
            let horizontal = 0.2;
            game.running = false;
            game.gameoverStatus = true;
            clearInterval(intervalId);
            endIntervalId = setInterval(() => {
                x += horizontal;
                y += vertical;
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(jungle, 0, 0)
                ctx.drawImage(this.gameoverImg, x, y);
                if (x > canvas.width - this.gameoverImg.width) {
                    horizontal = -0.2
                }
                if (y > canvas.height - this.gameoverImg.height) {
                    vertical = -0.3
                }
                if (x < 0) {
                    horizontal = 0.2
                }
                if (y < 0) {
                    vertical = 0.3
                }




            })
        }
    },

    updateLevel: function () {
        if (this.points > 250) {
            this.gameSpeed = 3.0;
            this.levelSpeed = 21;
            this.levelAccileration = 0.5;
            this.level = 2;

        }
        if (this.points > 400) {
            this.gameSpeed = 3.5;
            this.levelSpeed = 21;
            this.levelAccileration = 0.6;
            this.level = 3;
        }
        if (this.points > 550) {
            this.gameSpeed = 4.5;
            this.levelSpeed = 23;
            this.levelAccileration = 0.7;
            this.levelStageModulo = 28;
            this.level = 4;
        }
        if (this.points > 650) {
            this.gameSpeed = 5.5;
            this.levelSpeed = 24;
            this.levelAccileration = 0.9;
            this.levelStageModulo = 15;
            this.level = 5;
        }

    },
    reset: function () {
        this.lives -= 1;
        character.x = (canvas.width / 2) - 25;
        character.y = canvas.height - 60;
        character.upSpeed = game.levelSpeed;
        ctx.clearRect(0, 0, 400, 600);
        canvasObj.draw();
        character.draw();
        character.stageLandedOnX = undefined;
        character.stageLandedOnWidth = undefined;
        character.jumpButton = false;
        character.downMovement = false;
        itemList = [];
        stageList = [];
        treeList = [];
        character.jumpCounter = 0;
        counter = 0;
        character.acceleration = 0.7;
        this.countdownY3 = 0 - countdown3.height * 2;
        this.countdownY2 = 0 - (countdown2.height * 6);
        this.countdownY1 = 0 - (countdown1.height * 8.5);
        this.countdownY0 = 0 - (countdown1.height * 12);
        this.timeOutCounter = 0;
        this.gameoverStatus = false;
        snakes.snakeList = [];
        snakes.snakeCounter = 0;
        this.ep=100;


    },
    displayLevel: function () {
        level.innerHTML = `Level ${this.level}`;


    },
    displayEp: function () {
        let ep = game.ep;
        ctx.fillStyle = 'black';
        ctx.fillRect(10, 10, 102, 12)
        ctx.clearRect(11, 11, 100, 10)
        ctx.fillStyle = '#FFEB00';
        ctx.fillRect(11, 11, ep, 10)

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
    acceleration: 0.7,
    upSpeed: game.levelSpeed,
    canvasSpeed: game.gameSpeed,
    jumpButton: false,
    downMovement: false,
    stageLandedOnX: undefined,
    stageLandedOnWidth: undefined,
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    },
    jump: function () {
        this.stageLandedOnWidth = undefined;
        this.stageLandedOnX = undefined;
        this.downMovement = false;
        if (this.y - this.upSpeed <= 0) {
            this.upSpeed = -0.1;
            //this.acceleration *= 1.5;

        }
        this.y -= this.upSpeed;
        this.jumpCounter += 1;
        this.upSpeed -= this.acceleration;
        if (this.jumpCounter % 7 === 0) {
            this.acceleration += 0.05
        };
        if (game.drunkenRandomizer < 5 && this.x + game.drunkness < canvas.width - character.w) {
            if (this.x + game.drunkness < canvas.width - character.w) {

                this.x += (game.drunkness / 20);
            }

        }
        if (game.drunkenRandomizer > 5 && this.x + game.drunkness < canvas.width - character.w) {
            if (this.x - game.drunkness > 0) {

                this.x -= (game.drunkness / 20);
            }

        }

    },
    land: function () {
        if (checkStages()) {

            this.jumpButton = false;
            this.jumpCounter = 0;
            this.acceleration = 0.7;
            this.upSpeed = game.levelSpeed;
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

        this.y += game.gameSpeed;

    }

}


// the background

let canvasObj = {
    img: jungle,
    x: 0,
    y: 0,

    move: function () {

        this.y += game.gameSpeed;
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



// SNAKE OBJECT -

class Snake {
    constructor(width, height, x, y, random) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;


    }
};

let snakes = {
    snakeList: [],
    snakeCounter: 0,
    movementCounter: 0,
    snakeImg1: snake1,
    snakeImg2: snake2,
    snakeImg3: snake3,
    snakeImg4: snake4,
    snakeImg5: snake5,
    createSnake: function () {
        this.snakeCounter += 1;
        if (this.snakeCounter % (game.levelStageModulo * 12) === 0) {
            let stage = treeList[treeList.length - 1]
            let width = snake1.width;
            let height = snake1.height;
            let y = stage.y - snake1.height;
            let x = stage.x;
            this.snakeList.push(new Snake(width, height, x, y))

        }
    },
    updateSnakes: function () {
        if (this.snakeList.length != 0) {
            this.snakeList.forEach(e => {
                this.movementCounter += 1;
                let c = this.movementCounter;
                e.y += game.gameSpeed;
                if (c < 80) {
                    ctx.drawImage(snake1, e.x, e.y)
                }
                if (c >= 80 && c < 83) {
                    ctx.drawImage(snake2, e.x, e.y)

                }
                if (c >= 83 && c < 86) {
                    ctx.drawImage(snake3, e.x, e.y)

                }
                if (c >= 86 && c < 99) {
                    ctx.drawImage(snake4, e.x, e.y)

                }

                if (c >= 89 && c < 92) {
                    ctx.drawImage(snake5, e.x, e.y)

                }
                if (c > 92) {
                    this.movementCounter = 0;
                }

                if (e.y > canvas.height) {
                    this.snakeList.splice(0, 1);

                }

            })
        }

    },
    checkForSnakeBites: function () {

        for (let i = 0; i < this.snakeList.length; i++) {
            let snake = this.snakeList[i];
            let snakeY = snake.y;
            let snakeX = snake.x;
            let characterX = character.x;
            let characterY = character.y + character.h
            let c = this.movementCounter;
            // CHECK FOR THE SAME HEIGHT
            if (characterY >= snake.y && characterY < snakeY + snake.height + character.h) {
                // CHECK FOR THE "RESTING"-SNAKE ( FRAME 1 )
                if (c < 80) {
                    // CHECK FOR THE SAME HORIZONTAL POSITION 
                    if (characterX > snakeX - character.w && characterX < snake.x + snake.width) {
                        game.ep -= 1;
                        if(game.ep<=0){
                            game.lives--;
                            stop();}
                    }
                }
                if (c >= 80) {
                    // CHECK FOR THE SAME HORIZONTAL POSITION 
                    if (characterX > snakeX - character.w && characterX < snake.x + snake5.width) {
                        game.ep -= 1;
                        if(game.ep<=0){
                            game.lives-=2;
                            stop();}
                    }
                }
            }
        }



    }
}


// CREATING STAGES  // UPDATING STAGES  -- OBSOLETE - DELETE LATER!
/*
let stageList = [];

class Stage {
    constructor(width, height, x, y, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        // this.speed = game.gameSpeed;
    }
};

function newStage() {                  // -- OBSOLETE - DELETE LATER!

    if (game.counter % game.levelStageModulo === 0) {
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

// MOVE THE STAGES AND REMOVE THE INVISIBLE ONES  // -- OBSOLETE - DELETE LATER!
function updateStages() {
    if (stageList.length != 0) {
        stageList.forEach(e => {

            e.y += game.gameSpeed;
            ctx.fillStyle = e.color;
            ctx.fillRect(e.x, e.y, e.width, e.height);

            if (e.y > canvas.height) {
                stageList.splice(0, 1);

            }

        })
    }
}

*/



// CREATING Trees  // UPDATING Trees! 

let treeList = [];

class Tree {
    constructor(width, height, x, y, random) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.random = random;

    }
};


function newTree() {

    if (game.counter % game.levelStageModulo === 0) {
        let minWidth = 80;
        let maxWidth = 180;
        let x = Math.floor(Math.random() * (canvas.width - minWidth));
        let y = -115;
        let width;
        let height = 25;
        let randomNum = Math.floor(Math.random() * 100)
        let random;

        if (randomNum < 33) {
            random = 1;
            width = stage1.width;
        }
        if (randomNum > 33 && randomNum < 66) {
            random = 2;
            width = stage2.width;
        }
        if (randomNum > 66) {
            random = 3;
            width = stage3.width;
        }



        treeList.push(new Tree(width, height, x, y, random))


    }
}

function updateTrees() {
    if (treeList.length != 0) {
        treeList.forEach(e => {

            e.y += game.gameSpeed;
            if (e.random === 1) {
                ctx.drawImage(stage1, e.x, e.y);
            }
            if (e.random === 2) {
                ctx.drawImage(stage2, e.x, e.y);
            }
            if (e.random === 3) {
                ctx.drawImage(stage3, e.x, e.y);
            }
            if (e.y > canvas.height) {
                treeList.splice(0, 1);

            }

        })
    }


};


// CREATING ITEMS 


let itemList = [];

class Item {
    constructor(x, y, w, h, name) {
        this.name = name;
        this.imgBanana = banana;
        this.imgBeer = beer;
        this.imgLives = lives;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

    }
};



function createItems() {
    if (game.counter % 30 === 0 && game.counter > 0) {
        let randomNum = Math.floor(Math.random() * 100);
        let randomName;
        let randX = Math.floor(Math.random() * canvas.width - 20)
        let y = -10;
        if (randomNum <= 70) { randomName = 'banana'; itemList.push(new Item(randX, y, 20, 20, randomName)) };
        if (randomNum > 70 && randomNum < 98) { randomName = 'beer'; itemList.push(new Item(randX, y, 40, 40, randomName)) };
        if (randomNum > 98) { randomName = 'lives'; itemList.push(new Item(randX, y, 50, 50, randomName)) }
    }


}




function updateItems() {
    for (let i = 0; i < itemList.length; i++) {

        let item = itemList[i];
        item.y += game.gameSpeed;
        if (item.name === 'banana') {

            ctx.drawImage(item.imgBanana, item.x, item.y, item.w, item.h);
        }
        if (item.name === 'beer') {
            ctx.drawImage(item.imgBeer, item.x, item.y, item.w, item.h);
        }
        if (item.name === 'lives') {
            ctx.drawImage(item.imgLives, item.x, item.y, item.w, item.h);
        }
        // delete obsolete Items!
        if (item.y > canvas.height) { itemList.splice(itemList.indexOf(item), 1) }

    }

}

// Check if MOnkey hits the Item

function collectItems() {
    for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i];
        // check for the same height
        if (character.y >= item.y - character.h && character.y <= item.y + item.h) {
            // check for the same 'width'
            if (character.x >= item.x - character.w && character.x <= item.x + item.w) {
                if (item.name === 'banana') {
                    game.points += 10;
                    itemList.splice(itemList.indexOf(item), 1)
                }
                if (item.name === 'beer') {
                    game.points += 30;
                    game.drunkness += 1;
                    itemList.splice(itemList.indexOf(item), 1)
                }
                if (item.name === 'lives') {
                    itemList.splice(itemList.indexOf(item), 1);
                    game.lives += 1;
                }
            }
        }


    }

}


// CHECK IF MONKEY HAS LANDED //  OLD VERSION - DELETE IF NOT NECESSARY ANY MORE!

/*
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

*/



// CHECK IF MONKEY HAS LANDED ON A TREE (NEW VERSION) -- old version above 


function checkStages() {

    let jumpyX = character.x;
    let jumpyY = character.y + character.h;


    for (let i = 0; i < treeList.length; i++) {
        let stage = treeList[i];
        let stageWidth = stage.width;
        let stageX = stage.x;
        let stageY = stage.y;
        // check if stage and character are at the same height
        if (jumpyY - character.upSpeed > stageY && jumpyY < stageY) {

            // check left corner of character with right corner of stage
            if (jumpyX <= stageX + (stage.width - 15) && (jumpyX + character.w) > (stageX + 15)) {
                character.y = stage.y - character.h;
                character.stageLandedOnX = treeList[i].x;
                character.stageLandedOnWidth = treeList[i].x + treeList[i].width;
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
    if (game.running === false) {
        intervalId = setInterval(() => {
            clearInterval(startIntervalId);

            //set the status of the game to running!
            game.running = true;

            ctx.clearRect(0, 0, 400, 600);
            canvasObj.move();
            canvasObj.draw();

            // create and update Stages - OBSOLETE - delete later!

            // newStage();
            //  updateStages();


            /// create and update treeSTAGES


            newTree();
            updateTrees();

            // Create and update the SNAKES

            snakes.createSnake();
            snakes.updateSnakes();
            snakes.checkForSnakeBites();
            game.displayEp();

            // create and update  and collect Bananas

            createItems();
            updateItems();
            collectItems();

            // Game functions = display lives - startInterval - update level


            game.displayLives();
            game.displayLevel();
            game.displayCountdown();

            game.updateLevel();
            game.checkForActions();

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

}

function stop() {
    game.running = false;
    clearInterval(intervalId);
    game.reset();
    game.displayLives();
    game.displayEnd();
    if (game.lives > 0) { game.displayStart(); }



}





document.addEventListener('keydown', event => {

    if (event.key === 'ArrowUp') {
        if (game.running === true) {
            character.jumpButton = true;
            game.drunkenRandomizer = Math.floor(Math.random() * 10);
        }
    }
    if (event.key === 'ArrowLeft') { if (game.running === true) { character.moveLeft() } }
    if (event.key === 'ArrowRight') { if (game.running === true) { character.moveRight() } }
}
);

document.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        if (game.gameoverStatus === false) {
            run();
        }

    }
    if (event.keyCode == 32) {
        event.preventDefault()
    }
})





// I didnt check out the "onload" function of JS, so I used a timeout to draw the beginning 

let def = setTimeout(() => {
    canvasObj.draw()
    game.displayStart();
    character.draw();
    game.displayLives();

}, 300)
