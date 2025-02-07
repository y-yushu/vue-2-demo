// 判断坐标是否在中国范围内
function isInChina(lat, lng) {
  // 大致范围
  return lng >= 72.004 && lng <= 137.8347 && lat >= 0.8293 && lat <= 55.8271
}

// GCJ-02转WGS84
export function gcj02ToWgs84(lat, lng) {
  if (!isInChina(lat, lng)) {
    return { lat, lng }
  }

  let dlat = transformLat(lng - 105.0, lat - 35.0)
  let dlng = transformLng(lng - 105.0, lat - 35.0)

  const radlat = (lat / 180.0) * Math.PI
  let magic = Math.sin(radlat)
  magic = 1 - 0.00669342162296594323 * magic * magic
  const sqrtmagic = Math.sqrt(magic)

  dlat = (dlat * 180.0) / (((6378245.0 * (1 - 0.006693421622966)) / (magic * sqrtmagic)) * Math.PI)
  dlng = (dlng * 180.0) / ((6378245.0 / sqrtmagic) * Math.cos(radlat) * Math.PI)

  const mglat = lat + dlat
  const mglng = lng + dlng

  return {
    lat: lat * 2 - mglat,
    lng: lng * 2 - mglng
  }
}

// 转换纬度
function transformLat(x, y) {
  let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
  ret += ((20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin((y / 3.0) * Math.PI)) * 2.0) / 3.0
  ret += ((160.0 * Math.sin((y / 12.0) * Math.PI) + 320 * Math.sin((y * Math.PI) / 30.0)) * 2.0) / 3.0
  return ret
}

// 转换经度
function transformLng(x, y) {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
  ret += ((20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin((x / 3.0) * Math.PI)) * 2.0) / 3.0
  ret += ((150.0 * Math.sin((x / 12.0) * Math.PI) + 300.0 * Math.sin((x / 30.0) * Math.PI)) * 2.0) / 3.0
  return ret
}
