import { Game } from "phaser-ce";

export default class GameUi {

	private game:Game;
	private score:number;
	private scoreText:Phaser.Text;

	constructor(game:Game){
		this.game = game;
		this.score = 0;
		const myStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };

		this.scoreText = new Phaser.Text(this.game,0,0," socore:0",myStyle);
		this.scoreText.fixedToCamera=true;
		this.game.add.existing(this.scoreText);
	}

	fixedUpdate(){

	}

	addScore(score:number){
		this.score += score;
		this.scoreText.text = "score:"+this.score;
	}
}