const exif = require('jpeg-exif');
let file = './models/nogeo1.JPG';
let data = exif.parseSync(file);
// TODO check if file contains geotags
if (data['GPSInfo']['GPSLatitude'] !== 'undefinded') {
  data = data['GPSInfo'];
  let info = {
    'lon': data.GPSLatitude[0] + data.GPSLatitude[1] / 60 + data.GPSLatitude[2] / 3600,
    'lat': data.GPSLongitude[0] + data.GPSLongitude[1] / 60 + data.GPSLongitude[2] / 3600
  }
  if (data.GPSLatitudeRef === 'S')
    info['lon'] = -info['lon'];
  if (data.GPSLongitudeRef === 'W')
    info['lat'] = -info['lat'];

  console.log(info);
} else
  console.log("Wrong file! No GPS params.");
