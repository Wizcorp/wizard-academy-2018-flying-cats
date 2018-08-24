import TimesteppedScene from "./base/TimesteppedScene";
import { EnemiesManager } from "./GameObject/EnemiesManager";
import { PlayerClass } from "./GameObject/PlayerClass";
import { BgClass } from "./GameObject/BgClass";

export default class GameScene extends TimesteppedScene {

	private scrollSpeed:number;

	private enemiesManager: EnemiesManager;

	private playerObject: PlayerClass;
	private tilesetObject: BgClass;

	private enemyA: Phaser.Sprite;//TAKA
	
	init(){
		this.scrollSpeed=7;

		this.playerObject  = new PlayerClass(this.game);
		this.tilesetObject  = new BgClass(this.game);

		this.enemiesManager = new EnemiesManager(this.game);
		this.enemiesManager.init();//敵
	}

	preload() {
		this.game.load.image('background', 'assets/stageBackground.png');

		this.game.load.tilemap('map', 'assets/json/mapTest001B.json',null, Phaser.Tilemap.TILED_JSON); // タイルマップのjsonファイル
  	this.game.load.image('tiles', 'assets/exptest01.png');  // タイルセット画像ファイル

		this.game.load.image('enemyA', 'assets/nyan.png');//敵画像
		this.game.load.image('enemyB', 'assets/nyan.png');

		this.enemiesManager.preload();//敵

//		this.game.load.image('playerSprite', 'assets/player.png');
		this.game.load.spritesheet('playerSprite', 'assets/playerA.png', 50, 50);
	}

	create() {
		//this.game.stage.backgroundColor = '#787878';
		this.tilesetObject.createTileset();
	
		this.enemiesManager.create();//敵

		this.playerObject.createPlayer();
	}

	fixedUpdate(dt: number) {
		this.game.camera.x+=this.scrollSpeed;

		this.tilesetObject.update();		
		this.playerObject.update();
		this.enemiesManager.update();//敵の更新
	}
}

