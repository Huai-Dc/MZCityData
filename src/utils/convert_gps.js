/**
 * 高德坐标转百度坐标
 * @param gd_lng
 * @param gd_lat
 * @returns {[]}
 */
export function aMapToBMap(gd_lng, gd_lat) {
    let b_location = [];
    let PI = 3.14159265358979324 * 3000.0 / 180;
    let x = gd_lng, y = gd_lat;
    let z = Math.sqrt(x * x + y * y) + 0.0002 * Math.sin(y * PI);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * PI);
    b_location[0] = z * Math.cos(theta) + 0.0065;
    b_location[1] = z * Math.sin(theta) + 0.006;

    return b_location
}

/**
 * 百度坐标转高德坐标
 * @param bd_lng
 * @param bd_lat
 * @returns {[]}
 */
export function bMapToAMap(bd_lng, bd_lat) {
    let a_location = [];
    let PI = 3.14159265358979324 * 3000.0 / 180;
    let x = bd_lng - 0.0065, y = bd_lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * PI);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * PI)

    a_location[0] = z * Math.cos(theta)
    a_location[1] = z * Math.sin(theta)

    return a_location
}
