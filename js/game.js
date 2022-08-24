class Game {

    constructor() {
        this.backgroundImages
        this.puppyImage
        this.mushroomImage
        this.backgroundSong
        this.arcadeFont
        this.button
    }
    
    preload() {
        this.backgroundImages = [
            { src: loadImage('assets/background/plx-1.png'), x: 0, speed: 0 },
            { src: loadImage('assets/background/plx-2.png'), x: 0, speed: 1 },
            { src: loadImage('assets/background/plx-3.png'), x: 0, speed: 2 }
        ]
        this.arcadeFont = loadFont('assets/font/arcadefont.TTF')
        this.playerImage = loadImage('assets/player/pixel-pug-dog.gif')
        this.puppyImage = loadImage('assets/obstacle/pixel-pug-dog.gif')
        this.mushroomImage = loadImage('assets/obstacle/peanut_butter.png')

    }
    
    setup() {
        this.player = new Player()
        this.background = new Background()
        this.obstacles = [];
        this.barriers = [];
        textFont(this.arcadeFont);
        this.playMode = true;
        this.backgroundSong = new Audio('assets/sound/fire-in-the-hole.mp3') 
        noFill();
        stroke(0)
        strokeWeight(15);
        rect(width/2, height/2, width, height)
        //this.slider = createSlider(0, 1, 0.5, 0.01)
    }
 
    draw() {
        // console.log('game drawing');
        //clear()
        if (this.playMode){ // adds the pause and play effect
            this.backgroundSong.play()
            this.background.draw()
            // this.box.draw()
            this.player.draw()
            // here we add obstacles array
            // frameCount - this is provided by p5 determining the spacing between obstacles
            if (frameCount % 100 === 0) {
            this.obstacles.push(new Obstacle(this.puppyImage))
            }
            // iterate over the obstacles array and call the draw function for every obstacle inside
            this.obstacles.forEach(function(obstacle) {
            obstacle.draw()
            })

            this.obstacles = this.obstacles.filter(obstacle => {
                if (obstacle.collision(this.player) || obstacle.x < 0 - obstacle.width) {
                    return false
                } else {
                    return true
                }
            })


            if (frameCount % 100 === 0) {
                this.barriers.push(new Barrier(this.mushroomImage))
            }
            // iterate over the barriers array and call the draw function for every barrier inside
            this.barriers.forEach(function(barrier) {
                barrier.draw()
            })

            this.barriers = this.barriers.filter(barrier => {
                if (barrier.collision(this.player) || barrier.x < 0 - barrier.width) {
                    return false
                } else {
                    return true
                }
            })


        } else { // here is the end of the playMode condition
            //background()
            fill(106, 13, 173, 255);
            rect(0, 0, width, height);
            fill(255)
            textSize(40)
            text('GAME PAUSED', width / 2, width / 2)
            this.backgroundSong.pause()
        }

        // score
        fill(255);
        textAlign(CENTER);
        textSize(20);
        text('SCORE: ', 100, 35);
        text(game.player.score, 200, 35);

        
    }

    

}