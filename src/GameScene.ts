import TimesteppedScene from "./base/TimesteppedScene";

export default class GameScene extends TimesteppedScene {
	private player: Phaser.Sprite;
	private cursors: Phaser.CursorKeys;

	private moveSpeed:number;
	private shotSpeed:number;

	init(){
		this.moveSpeed=20;
		this.shotSpeed=3;

		this.cursors= this.game.input.keyboard.createCursorKeys();
	}

	preload() {
		this.game.load.image('player', 'assets/player.png');

	}

	create() {
		//this.game.stage.backgroundColor = '#787878';

		this.player = this.game.add.sprite(this.game.width / 2, this.game.height / 2+30, 'player');
		this.player.smoothed = false;
		this.player.anchor.set(0.5, 0.5);
		this.player.scale.set(2, 2);

		console.log("クリエイトおわり");

	}

	fixedUpdate(dt: number) {
		//		this.layer.scrollX=this.layer.scrollX+10;
		//		this.layer.scrollFactorX=10;
		//		this.layer.angle=10;

		//プレイヤーの移動操作
		this.playerOperation();
		//キャラクター移動範囲制御
		this.limitedMoveArea();

		//this.layer.cameraOffset.x=this.layer.cameraOffset.x+1;
		//console.log("layer"+this.layer.x);

//		this.player.x=this.player.x+1;
//		console.log("Playerx"+this.player.x);

	}

	playerOperation(){
		if (this.cursors.left.isDown)
		{
			//console.log("左に移動");//
			this.player.x = this.player.x-this.moveSpeed;
		}
		else if (this.cursors.right.isDown)
		{
			//console.log("右に移動");//
			this.player.x = this.player.x+this.moveSpeed;
		}
		
		if (this.cursors.up.isDown)
		{
			//console.log("上に移動");//
			this.player.y = this.player.y-this.moveSpeed;
		}
		else if (this.cursors.down.isDown)
		{
			//console.log("下に移動");//
			this.player.y = this.player.y+this.moveSpeed;
		}
		else
		{
			//  入力なし＝待機
		}

	}

	limitedMoveArea() {

		if (this.player.x<0+(this.player.width/2)) this.player.x=0+(this.player.width/2);
		if (this.player.y<0+(this.player.height/2)) this.player.y=0+(this.player.height/2);
		if (this.player.x>this.game.width-(this.player.width/2)) this.player.x=this.game.width-(this.player.width/2);
		if (this.player.y>this.game.height-(this.player.height/2)) this.player.y=this.game.height-(this.player.height/2);
		

	}
}
