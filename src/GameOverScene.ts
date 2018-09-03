import TimesteppedScene from "./base/TimesteppedScene";
import PhaserTextStyle = Phaser.PhaserTextStyle;
import { SoundSystem } from "./soundManager";
export default class GameOverScene extends TimesteppedScene {

	private isClear: Boolean

	private music: SoundSystem;


	init(options: { isClear: Boolean }) {
		this.isClear = options.isClear;
		this.music = new SoundSystem(this.game);
	}
	/**
	 * Load sprites and various assets here.
	 */
	preload() {
		this.game.load.spritesheet('touchButton', 'assets/touchTheScreenButton.png', 199, 38);
		this.game.load.spritesheet('gameOverBg', 'assets/gameOverBackground.png', 768, 432);
		this.game.load.spritesheet('gameClearBg', 'assets/clearImage.png', 768, 432);
		this.music.preload();
	}

	/**
	 * Ran once at initialization.
	 */
	create() {
		//クリアとゲームオーバーで違う部分
		if (this.isClear) {
			const Bg = this.add.image(0, 0, "gameClearBg");
			this.music.musicStart(4);
		}
		else {
			const Bg = this.add.image(0, 0, "gameOverBg");
			const touchMessage = this.game.add.button(this.game.width / 2, 295, 'touchButton', this.buttonOnClick, this);
			touchMessage.anchor.set(0.5, 0.5);
			this.music.musicStart(5);
		}

		//共通部分
		const onMouseDown = () => {
			this.buttonOnClick();
			this.game.canvas.removeEventListener('mousedown', onMouseDown);
		};

		this.game.canvas.addEventListener('mousedown', onMouseDown);
	}


	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate(dt: number) {


	}

	/**
	 * Callback for button.
	 */
	buttonOnClick() {
		this.game.state.start('TitleScene', true, false);
	}
}