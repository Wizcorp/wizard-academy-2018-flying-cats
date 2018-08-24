import { Vector2 } from "../base/Mass";

export class EnemiesBase{
    private life:number;
    public Pos:Vector2;
    public EnemieMode:number;

    constructor(life: number = 10){
        this.life = life;

        this.EnemieMode = 0;
    }

    update(){
        
    }
}