import TimesteppedScene from "./base/TimesteppedScene";

type Vector2 = { x: number, y: number };
//ベクトルを足す
function addVectors(a: Vector2, b: Vector2): Vector2 {
	return { x: a.x + b.x, y: a.y + b.y };
}

//ベクトルをかける
function multVector(a: Vector2, s: number): Vector2 {
	return { x: a.x * s, y: a.y * s };
}
export default class GameScene extends TimesteppedScene {
	private player: Phaser.Sprite;
	private map: Phaser.Tilemap;
	private layer: Phaser.TilemapLayer;
	private cursors: Phaser.CursorKeys;

	private moveSpeed:number;
	private shotSpeed:number;
	private scrollSpeed:number;

	private playerPosition:Vector2;

	init(){
		this.moveSpeed=20;
		this.shotSpeed=3;
		this.scrollSpeed=3;

		this.cursors= this.game.input.keyboard.createCursorKeys();

		this.playerPosition ={x:this.game.width / 2 ,y: this.game.height / 2+30};

	}

	preload() {
		this.game.load.image('player', 'assets/player.png');

		this.game.load.tilemap('map', 'assets/json/super_mario.json',null, Phaser.Tilemap.TILED_JSON); // タイルマップのjsonファイル
  		this.game.load.image('tiles', 'assets/super_mario.png');  // タイルセット画像ファイル
	}

	create() {
		//this.game.stage.backgroundColor = '#787878';
		
		this.map = this.game.add.tilemap('map');  // 引数は preload でロードしたマップ名
		//this.map.addTilesetImage('tileset', 'tiles');  // 第1引数にタイルセット名

		this.map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
		//this.layer = this.map.createLayer('ground');  // タイルマップのレイヤー名
		this.layer = this.map.createLayer('World1');
		this.layer.resizeWorld();

		this.player = this.game.add.sprite(this.playerPosition.x , this.playerPosition.y, 'player');
		this.player.smoothed = false;
		this.player.anchor.set(0.5, 0.5);
		this.player.scale.set(2, 2);

		console.log("クリエイトおわり");

	}

	fixedUpdate(dt: number) {
//			this.layer.scrollX=this.layer.scrollX+10;
	//		this.layer.scrollFactorX=10;
	//		this.layer.angle=10;



		//プレイヤーの移動操作
		this.playerOperation();

		//キャラクター移動範囲制御
		this.limitedMoveArea();

		//キャラ座標とカメラ座標から、キャラの描画先を決める
		this.player.x = this.playerPosition.x + this.game.camera.x;
		this.player.y = this.playerPosition.y;

		console.log("◆"+this.player.x+"/"+this.playerPosition.x);

//		this.layer.cameraOffset.x=this.layer.cameraOffset.x+1;
		this.game.camera.x+=this.scrollSpeed;

	}

	playerOperation(){
		if (this.cursors.left.isDown)
		{
			//console.log("左に移動");//
			this.playerPosition.x -= this.moveSpeed;
		}
		else if (this.cursors.right.isDown)
		{
			//console.log("右に移動");//
			this.playerPosition.x += this.moveSpeed;
		}
		
		if (this.cursors.up.isDown)
		{
			//console.log("上に移動");//
			this.playerPosition.y -= this.moveSpeed;
		}
		else if (this.cursors.down.isDown)
		{
			//console.log("下に移動");//
			this.playerPosition.y += this.moveSpeed;
		}
		else
		{
			//  入力なし＝待機
		}

	}

	limitedMoveArea() {

		
		if (this.playerPosition.x < 0+(this.player.width/2)){
			this.playerPosition.x = 0+(this.player.width/2);
		}

		if (this.playerPosition.y<0+(this.player.height/2)){
			this.playerPosition.y=0+(this.player.height/2);
		}

		if (this.playerPosition.x >this.game.width-(this.player.width/2)) {
			this.playerPosition.x = this.game.width-(this.player.width/2);
		}

		if (this.playerPosition.y>this.game.height-(this.player.height/2)){
			this.playerPosition.y=this.game.height-(this.player.height/2);
		} 
		
	}
}

