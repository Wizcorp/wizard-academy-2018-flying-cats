import TimesteppedScene from "./base/TimesteppedScene";
import { EnemiesManager } from "./GameObject/EnemiesManager";
import { PlayerClass } from "./GameObject/PlayerClass";
import { TilesetClass } from "./GameObject/TilesetClass";

export default class GameScene extends TimesteppedScene {

	private scrollSpeed:number;

	private enemiesManager: EnemiesManager;

	private playerObject: PlayerClass;
	private tilesetObject: TilesetClass;

	private enemyA: Phaser.Sprite;//TAKA
	
	init(){
		this.scrollSpeed=1;

		this.playerObject  = new PlayerClass(this.game);
		this.tilesetObject  = new TilesetClass(this.game);

		this.enemiesManager = new EnemiesManager(this.game);
		this.enemiesManager.init();//敵
	}

	preload() {
		this.game.load.image('playerSprite', 'assets/player.png');
		this.game.load.tilemap('map', 'assets/json/mapTest001B.json',null, Phaser.Tilemap.TILED_JSON); // タイルマップのjsonファイル
  		this.game.load.image('tiles', 'assets/exptest01.png');  // タイルセット画像ファイル

		this.game.load.image('enemyA', 'assets/nyan.png');
		this.game.load.image('enemyB', 'assets/nyan.png');//////////////////////敵画像
		this.enemiesManager.preload();//敵
	}

	create() {
		//this.game.stage.backgroundColor = '#787878';

		this.tilesetObject.createTileset();
		this.playerObject.createPlayer();
	
		this.enemiesManager.create();//敵
	}

	fixedUpdate(dt: number) {

		this.game.camera.x+=this.scrollSpeed;
		this.playerObject.update();

		this.enemiesManager.update();//敵の更新
	}
}

