import TimesteppedScene from "./base/TimesteppedScene";
import { Enemies } from "./GameObject/Enemies";

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
	private shotSpeed:number;//まだ使ってない。
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

		this.game.load.tilemap('map', 'assets/json/mapTest001B.json',null, Phaser.Tilemap.TILED_JSON); // タイルマップのjsonファイル
  		this.game.load.image('tiles', 'assets/exptest01.png');  // タイルセット画像ファイル
	}

	create() {
		//this.game.stage.backgroundColor = '#787878';
		
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('test01', 'tiles');
		this.layer = this.map.createLayer('ground');
		this.layer.resizeWorld();

		this.player = this.game.add.sprite(this.playerPosition.x , this.playerPosition.y, 'player');
		this.player.smoothed = false;
		this.player.anchor.set(0.5, 0.5);
		this.player.scale.set(2, 2);
	}

	fixedUpdate(dt: number) {

		//詳細はサマリを見てください
		this.playerOperation();
		this.limitedPlayerMoveArea();

		//キャラ座標とカメラ座標からキャラの描画先を決める
		this.player.x = this.playerPosition.x + this.game.camera.x;
		this.player.y = this.playerPosition.y;

		this.game.camera.x+=this.scrollSpeed;

		Enemies.UpDate();//敵の更新
	}

	/**
	 * プレイヤーの移動操作
	 * キーの入力による座標移動や、攻撃など遊び手がplayerに対して介入する物を書く
	 */
	playerOperation(){
		if (this.cursors.left.isDown)
		{
			//console.log("左に移動");
			this.playerPosition.x -= this.moveSpeed;
		}
		else if (this.cursors.right.isDown)
		{
			//console.log("右に移動");
			this.playerPosition.x += this.moveSpeed;
		}
		
		if (this.cursors.up.isDown)
		{
			//console.log("上に移動");
			this.playerPosition.y -= this.moveSpeed;
		}
		else if (this.cursors.down.isDown)
		{
			//console.log("下に移動");
			this.playerPosition.y += this.moveSpeed;
		}
		else
		{
			//入力なし＝待機
		}
	}

	/**
	 * キャラクター移動範囲制御
	 * キャラクターが描画範囲外に出ないように座標を丸めるメソッド
	 */
	limitedPlayerMoveArea() {

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

