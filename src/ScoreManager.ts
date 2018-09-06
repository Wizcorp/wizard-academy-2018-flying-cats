// TODO Florian -- avoid naming functions like that (a manager is usually a class, and when seeing ScoreManager, we
// don't understand that you are returning the high score).
export function ScoreManager(score: number = 0): number {
    if (document.cookie != null) {
        let data = document.cookie.split(";");
        let num = data[0].split("=");
        if (num[1] == null){
            document.cookie = "highScore=" + score;
            return 0;
        }else if (Number(num[1]) < score) {
            document.cookie = "highScore=" + score;
            return score;
        }
        return Number(num[1]);
    } else {
        document.cookie = "highScore=" + score;
    }
    return 0;
}

export function ScoreReset(){
    document.cookie = document.cookie + "; max-age=0";
}