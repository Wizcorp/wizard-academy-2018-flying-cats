
import { Game } from "phaser-ce";
import EnemiesBase from "./EnemiesBase";
import { EnemiesCan } from "./EnemiesCan";
import { EnemiesPudding } from "./EnemiesPudding";
import { EnemiesEbihurai } from "./EnemiesEbihurai";
import { EnemiesOmurise } from "./EnemiesOmurise";
import { EnemiesShark } from "./EnemiesShark";
import { EnemiesMoveCan } from "./EnemiesMoveCan";
import { EnemiesItem } from "./EnemiesItem";
import { PlayerClass } from "./PlayerClass";
import GameScene from "../GameScene";
import ITiledObject from "./ITiledObject";
import GameUi from "./GameUi"
export class EnemiesManager {
	public enemies: EnemiesBase[] = [];
	private game: Game;
	private player: PlayerClass;
	private gameScene: GameScene;
	private gameUi: GameUi;
	private soundManager: any;

	constructor(game: Game, player: PlayerClass, GS: GameScene, soundManager: any) {
		this.player = player;
		this.game = game;
		this.gameScene = GS;
		this.soundManager = soundManager;
	}

	init() {

	}

	preload() {

	}

	create(gameUi: GameUi) {
		this.gameUi = gameUi;//shark life
		//load the map
		const map = this.game.add.tilemap('map');
		//Read the objects
		const objectList = this.getObjectLayer(map, 'enemy ');
		//タイルマップから敵の座標と名前を取得
		for (const object of objectList) {
			let mode = 0;
			//名前で番号を割り振る
			switch (object.name) {
				case "can":
					mode = 0;
					break;
				case "purin":
					mode = 1;
					break
				case "omurice":
					mode = 2;
					break
				case "ebi":
					mode = 3;
					break
				case "shark":
					mode = 4;
					break
				case "moveCan":
					mode = 5;
					break
				case "item":
					mode = 6;
					break
			}
			this.addEnemy(mode, object.x, object.y);
		}
		//add item一時　配置、マップ改良時消す。
		this.addEnemy(6, 1300, this.game.height / 2 + 100);
	}

	GUUpdateTime: number = 0;
	GUUpdateTimeSet: number = 30;

	public update(/*dt: number*/) {
		for (let i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].enable) {
				this.enemies[i].update();
				this.enemies[i].baseUpdate();
			} else if (this.game.camera.x + this.game.width + 30 > this.enemies[i].sprite.x) {
				this.enemies[i].enable = true;
			}
		}
		this.GUUpdateTime--;
		if (this.GUUpdateTime < 0) {
			this.gameUi.setMapGaugeImage(this.enemies.length);
			this.GUUpdateTime = this.GUUpdateTimeSet;
		}
	}

	addEnemy(mode: number = 0, x: number, y: number, sx: number = 0, sy: number = 0) {
		switch (mode) {
			default:
				this.enemies.push(new EnemiesCan(this.game, this.player, this, x, y, this.soundManager));
				break;
			case 1:
				this.enemies.push(new EnemiesPudding(this.game, this.player, this, x, y, this.soundManager));
				break;
			case 2:
				this.enemies.push(new EnemiesOmurise(this.game, this.player, this, x, y, this.soundManager));
				break;
			case 3:
				this.enemies.push(new EnemiesEbihurai(this.game, this.player, this, x, y, this.soundManager));
				break;
			case 4:
				this.enemies.push(new EnemiesShark(this.game, this.player, this, x, y, this.gameUi, this.soundManager));
				break;
			case 5://shark専用缶、移動する。
				this.enemies.push(new EnemiesMoveCan(this.game, this.player, this, x, y, sx, sy, this.soundManager));
				break;
			case 6://アイテム出現用キー
				this.enemies.push(new EnemiesItem(this.game, this.player, this, x, y, this.gameScene, this.soundManager));
				break;
		}
	}
	//タイルマップの中身を読み込むための関数
	getObjectLayer(map: Phaser.Tilemap, layerName: string): ITiledObject[] {
		return (map.objects as any)[layerName] as ITiledObject[];
	}

	deleteEnemy(id: number) {
		this.enemies.splice(id, 1);
	}
}