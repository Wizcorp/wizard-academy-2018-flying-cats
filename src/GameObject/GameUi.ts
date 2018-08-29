import { Game } from "phaser-ce";
export default class GameUi {

	private game: Game;
	private score: number;
	private scoreText: Phaser.Text;

	private lifeImages: Phaser.Sprite[];
	
	private sharkLifeImages: Phaser.Sprite[];
	private mapLifeImages: Phaser.Sprite[];

	constructor(game: Game,) {
		this.lifeImages = [];
		
		this.sharkLifeImages = [];
		this.mapLifeImages = [];

		this.game = game;
		this.score = 0;
		const myStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };

		this.scoreText = new Phaser.Text(this.game, 20, 5, "socore:0", myStyle);
		this.scoreText.fixedToCamera = true;
		this.game.add.existing(this.scoreText);

		this.setSharkLifeImage(0);
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
	//shark
	private killSharkLifeImage() {
		for (let i = 0; i < this.sharkLifeImages.length; i++) {
			this.sharkLifeImages[i].kill();
		}
	}

	setSharkLifeImage(life: number) {
		this.killSharkLifeImage();

		for (let i = 0; i < life; i++) {
			const sharkLifeImages = this.game.add.sprite(this.game.width - 20 - (i * 7), 70, 'life');
			sharkLifeImages.fixedToCamera = true;
			sharkLifeImages.scale.set(0.5, 0.5);
			this.sharkLifeImages.push(sharkLifeImages);
		}
	}
	//map
	private killMapLifeImage() {
		for (let i = 0; i < this.mapLifeImages.length; i++) {
			this.mapLifeImages[i].kill();
		}
	}

	setMapLifeImage(life: number) {
		this.killMapLifeImage();

		for (let i = 0; i < life; i++) {
			const mapLifeImages = this.game.add.sprite(this.game.width - 20 - (i * 3),this.game.height - 40, 'life');
			mapLifeImages.fixedToCamera = true;
			mapLifeImages.scale.set(0.3, 0.3);
			this.mapLifeImages.push(mapLifeImages);
		}
	}
}