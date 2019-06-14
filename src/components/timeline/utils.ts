export function getCueWidth(cueDuration: number) {
    return cueDuration / 1000 * 35;
}

export function getCuePositionByX(cueX: number) {
    return cueX * 1000 / 35;
}

export function getCueX(position: number) {
    return position / 1000 * 35;
}
