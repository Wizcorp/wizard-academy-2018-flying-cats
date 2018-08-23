import TimesteppedScene from "./base/TimesteppedScene";
import { EnemiesManager } from "./GameObject/EnemiesManager";
import { PlayerClass } from "./GameObject/PlayerClass";

import {Vector2,multVectors,addVectors}  from "./base/Mass";


export default class GameScene extends TimesteppedScene {
	private map: Phaser.Tilemap;
	private layer: Phaser.TilemapLayer;

	private scrollSpeed:number;

	private enemiesManager: EnemiesManager;

	private playerObject: PlayerClass;

	init(){

		this.scrollSpeed=1;

		this.playerObject  = new PlayerClass(this.game);

		this.enemiesManager = new EnemiesManager();
		this.enemiesManager.init();//敵
	}

	preload() {
		this.game.load.image('playerSprite', 'assets/player.png');

		this.game.load.tilemap('map', 'assets/json/mapTest001B.json',null, Phaser.Tilemap.TILED_JSON); // タイルマップのjsonファイル
  		this.game.load.image('tiles', 'assets/exptest01.png');  // タイルセット画像ファイル

		this.enemiesManager.preload();//敵

	}

	create() {
		//this.game.stage.backgroundColor = '#787878';
		
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('test01', 'tiles');
		this.layer = this.map.createLayer('ground');
		this.layer.resizeWorld();

		this.playerObject.createPlayer();
	
		this.enemiesManager.create();//敵
	}

	fixedUpdate(dt: number) {

		this.playerObject.update();

		this.game.camera.x+=this.scrollSpeed;

		this.enemiesManager.update();//敵の更新
	}
}

