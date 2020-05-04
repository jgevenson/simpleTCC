export function pointOrPoints(a, b) {
    let p;
    if (a - b > 1) {
        p = 'points';
    } else {
        p = 'point'
    }
    return p;
}
