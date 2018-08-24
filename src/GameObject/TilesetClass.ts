import { Game } from "phaser-ce";

export class TilesetClass {

	private game: Game;

	private map: Phaser.Tilemap;
	private layer: Phaser.TilemapLayer;

	constructor(game: Game) {
		this.game = game;
		//console.log("TilesetClass.constructor DONE");
	}

	createTileset() {
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('test01', 'tiles');
		this.layer = this.map.createLayer('ground');
		this.layer.resizeWorld();
	}

	update() {

	}
}