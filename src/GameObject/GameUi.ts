import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass"

export default class GameUi {

	private game: Game;
	private score: number;
	private scoreText: Phaser.Text;
	private playerObject: PlayerClass;

	private lifeImages: Phaser.Sprite[];

	constructor(game: Game, player: PlayerClass) {
		this.lifeImages = [];

		this.playerObject = player;

		this.game = game;
		this.score = 0;
		const myStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };

		this.scoreText = new Phaser.Text(this.game, 20, 5, "socore:0", myStyle);
		this.scoreText.fixedToCamera = true;
		this.game.add.existing(this.scoreText);

	}

	fixedUpdate() {

	}

	addScore(score: number) {
		this.score += score;
		this.scoreText.text = "score:" + this.score;
	}

	private killLiifeImage() {
		for (let i = 0; i < this.lifeImages.length; i++) {
			this.lifeImages[i].kill();
		}
	}

	setLifeImage(life: number) {
		this.killLiifeImage();

		for (let i = 0; i < life; i++) {
			const lifeImage = this.game.add.sprite(20 + (i * 40), 40, 'life');
			lifeImage.fixedToCamera = true;
			this.lifeImages.push(lifeImage);
		}
	}
}