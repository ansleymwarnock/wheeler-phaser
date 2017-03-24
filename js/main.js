console.log(Phaser);
//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';


function preload(){
	game.load.image('background', 'assets/imgres.jpg');
	game.load.image('player', 'assets/plane.png');
	game.stage.backgroundColor='#8aa8d1';
	game.load.image('ground', 'assets/wallHorizontal.png');
	game.load.image('obstacle', 'assets/wallVertical.png');
	game.load.audio('backgroundMusic', 'assets/01TheImperialMarch (1).mp3')
};

function create(){
	player = game.add.sprite(game.width/8, game.world.height*(7/8), 'player');
	obstacle = game.add.sprite(600,game.world.height, 'obstacle');
	game.add.tileSprite(0, 0, 800, 600, 'background');
	obstacle.scale.setTo(1,1);
	obstacle.anchor.setTo(0,1);
	platforms = game.add.group();
	platforms.enableBody = true;
	ground = platforms.create(0, GAME_HEIGHT, 'ground');
	ground.anchor.setTo(0,1);
	ground.scale.setTo(4, 1);
	game.physics.startSystem(Phaser.Physics.Arcade);
	game.physics.arcade.enable(player);
	game.physics.arcade.enable(ground);
	ground.body.immovable = true;
	game.physics.arcade.enable(obstacle); 
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 600;
	scoreText = game.add.text(25,25, 'score: 0', { fontSize: '50px', fill: '#031a3f'})
	music = game.add.audio('backgroundMusic');
	music.play();



};

function update(){
	game.physics.arcade.collide(player, obstacle);   
	game.physics.arcade.collide(player, ground);  
	if(spaceKey.isDown){
		player.body.velocity.y = -300;
	};
	if (obstacle.x > 500){
		console.log("here");
		obstacle.x -= 0.05;
	};
	if (obstacle.x < 0) {
		obstacle.kill();
		obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
		obstacle.scale.setTo(1.1);
		obstacle.anchor.setTo(0,1);
		game.physics.arcade.enable(obstacle); 
		obstacle.body.immovable = true;
	};
	if (obstacle.x < 5 && player.x > 5){
    score++;
    scoreText.text = 'score: ' + score;
	};
	if (player.x < 0){
    scoreText = game.add.text(400,300, 'You Lose.', {fill: '#031a3f'});
    obstacle.kill();
    player.kill();
  };



	

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();

