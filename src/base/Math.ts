export type Vector2 = { x: number, y: number };

//ベクトルを足す
export function addVectors(a: Vector2, b: Vector2): Vector2 {
    return { x: a.x + b.x, y: a.y + b.y };
}

//ベクトルをかける
export function multVectors(a: Vector2, s: number): Vector2 {
    return { x: a.x * s, y: a.y * s };
}
