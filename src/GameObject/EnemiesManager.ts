
import { Sprite, Game } from "phaser-ce";
import EnemiesBase from "./EnemiesBase";
import { EnemiesCan } from "./EnemiesCan";
import { EnemiesPudding } from "./EnemiesPudding";
import { EnemiesEbihurai } from "./EnemiesEbihurai";
import { EnemiesOmurise } from "./EnemiesOmurise";
import { EnemiesShark } from "./EnemiesShark";
import { PlayerClass } from "./PlayerClass";
import ITiledObject from "./ITiledObject";
export class EnemiesManager {
	public enemies: EnemiesBase[] = [];
	private game: Game;
	private player: PlayerClass;

	constructor(game: Game, player: PlayerClass) {
		this.player = player;
		this.game = game;
	}

	init() {

	}

	preload() {

	}

	create() {
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
			}
			this.addEnemy(mode, object.x, object.y);
		}
	}

	public update(/*dt: number*/) {
		for (let i = 0; i < this.enemies.length; i++) {
			this.enemies[i].baceUpdate();
			this.enemies[i].update();
		}
	}

	addEnemy(mode: number = 0, x: number, y: number) {
		switch (mode) {
			default:
				this.enemies.push(new EnemiesCan(this.game, this.player, x, y));
				break;
			case 1:
				this.enemies.push(new EnemiesPudding(this.game, this.player, x, y));
				break;
			case 2:
				this.enemies.push(new EnemiesOmurise(this.game, this.player, x, y));
				break;
			case 3:
				this.enemies.push(new EnemiesEbihurai(this.game, this.player, x, y));
				break;
			case 4:
				this.enemies.push(new EnemiesShark(this.game, this.player, x, y));
				break;
		}
	}

	getEnemies() {
		return this.enemies;
	}
	//タイルマップの中身を読み込むための関数
	getObjectLayer(map: Phaser.Tilemap, layerName: string): ITiledObject[] {
		return (map.objects as any)[layerName] as ITiledObject[];
	}
}