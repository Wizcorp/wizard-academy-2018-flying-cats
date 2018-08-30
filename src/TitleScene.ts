import TimesteppedScene from "./base/TimesteppedScene";
import PhaserTextStyle = Phaser.PhaserTextStyle;
import { Sound } from "phaser-ce";
import { ScoreManager, ScoreReset } from "./ScoreManager";

export default class TitleScene extends TimesteppedScene {
	/**
	 * Load sprites and various assets here.
	 */

	private scoreText: Phaser.Text;

	preload() {
		this.game.load.spritesheet('startButton', 'assets/startButton.png', 200, 40);
		this.game.load.spritesheet('startBg', 'assets/background.png', 768, 432);

		//game.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
		this.game.load.audio("TitleMp3", ['assets/music/title.mp3']);

		this.game.load.spritesheet('scoreResetButton', 'assets/scoreResetButton.png', 80, 16);
	}
	music: Sound;
	/**
	 * Ran once at initialization.
	 */
	create() {
		//すべての音を止める。buttonOnClick()のものを移動。
		this.game.sound.stopAll();

		this.add.image(0, 0, "startBg");

		const button = this.game.add.button(this.game.width / 2, 300, 'startButton', this.buttonOnClick, this, 2, 1, 0);
		button.anchor.set(0.5, 0.5);

		const onMouseDown = () => {
			this.buttonOnClick();
			this.game.canvas.removeEventListener('mousedown', onMouseDown);
		};

		this.game.canvas.addEventListener('mousedown', onMouseDown);

		this.music = this.game.sound.play('TitleMp3');

		//score表示
		this.putHighScore();
	}

	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate(dt: number) {
		// Skip to next scene with space or return
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.buttonOnClick();
		}
	}

	/**
	 * Callback for button.
	 */

	buttonOnClick() {
		this.game.state.start('GameScene');
	}

	resetButtonOnClick() {
		ScoreReset();
		this.game.state.start('TitleScene');
	}

	putHighScore() {
		//ScoreReset();クッキー削除
		let score = ScoreManager();
		if (score != 0){
			const myStyle = { font: "16px Arial", fill: "#FFFFFF", align: "center" };
			this.scoreText = new Phaser.Text(this.game, this.game.width - 230, this.game.height - 20, "score:0", myStyle);
			this.scoreText.fixedToCamera = true;
			this.game.add.existing(this.scoreText);
			this.scoreText.text = "HIGH SCORE " + score;
			const resetButton = this.game.add.button(this.game.width - 320, this.game.height - 20, 'scoreResetButton', this.resetButtonOnClick, this, 1, 0, 2);
		}
	}
}
