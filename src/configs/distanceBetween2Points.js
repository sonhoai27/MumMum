export const distanceFrom = (points) => {
    var lat1 = points.lat1;
    var radianLat1 = lat1 * (Math.PI / 180);
    var lng1 = points.lng1;
    var radianLng1 = lng1 * (Math.PI / 180);
    var lat2 = points.lat2;
    var radianLat2 = lat2 * (Math.PI / 180);
    var lng2 = points.lng2;
    var radianLng2 = lng2 * (Math.PI / 180);
    var earth_radius = 6371; //3959 or 6371 for kilometers
    var diffLat = (radianLat1 - radianLat2);
    var diffLng = (radianLng1 - radianLng2);
    var sinLat = Math.sin(diffLat / 2);
    var sinLng = Math.sin(diffLng / 2);
    var a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLng, 2.0);
    var distance = earth_radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
    return distance.toFixed(3);
}