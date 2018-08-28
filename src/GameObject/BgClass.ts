import { Game, TileSprite } from "phaser-ce";

export class BgClass {

	private game: Game;

	private map: Phaser.Tilemap;
	private layer: Phaser.TilemapLayer;
	private background: Phaser.TileSprite;

	constructor(game: Game) {
		this.game = game;
	}

	createTileset() {

		this.background = this.game.add.tileSprite(0, 0, 768, 432, "background");
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('test01', 'tiles');
		this.layer = this.map.createLayer('ground');
		this.layer.resizeWorld();

	}

	update() {
		this.background.x = this.game.camera.x;
		this.BackgroundScrolling(this.background, 2);
	}

	BackgroundScrolling(background: TileSprite, speed: number) {
		background.tilePosition.x -= speed;
	}
}
