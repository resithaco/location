async function getCity(lat, lon) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  );
  const data = await response.json();
  console.log({data});
  const address = data.address;

  const country = address.country || "";
  const province = address.province || "";
  const city = address.city || address.town || address.village || "";
  const district = address.suburb || address.city_district || "";
  const street = address.road || "";
  const house_number = address.house_number || "";
   const house = data.display_name || "";

  return {
    country,
    province,
    city,
    district,
    street,
    house_number,
    house
  };
}

function getLocation() {
  const output = document.getElementById("location");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    street ,
  );};
}

function getLocation() {
  const output = document.getElementById("location");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        output.innerHTML = "⏳ جاري تحديد الموقع بدقة...";

        try {
            const location = await getCity(lat, lon);

            output.innerHTML = `
            📍 الإحداثيات:<br>
            Lat: ${lat}<br>
            Lon: ${lon}<br><br>
        📍 الدولة: ${location.country} <br>
        🏙️ المحافظة: ${location.province} <br>
        🌆 المدينة: ${location.city} <br>
        🏠 الحي: ${location.district} <br>
        📌 الاسم الكامل: ${location.house} <br>
         الشارع: ${location.street}<br>
        📮 الرمز البريدي: ${location.postcode}
        `;
        } catch (error) {
          output.innerHTML = "❌ فشل في جلب الموقع";
        }
      },
      function(error) {
        output.innerHTML = "❌ " + error.message;
      }
    );
  } else {
    output.innerHTML = "المتصفح لا يدعم تحديد الموقع";
  }
}
 /*
{data: {…}}
data
: 
address
: 
ISO3166-2-lvl4
: 
"TR-07"
city_district
: 
"Cihadiye Mahallesi"
country
: 
"تركيا"
country_code
: 
"tr"
postcode
: 
"07260"
province
: 
"أنطاليا"
region
: 
"منطقة البحر الأبيض المتوسط"
suburb
: 
"Cihadiye"
town
: 
"Aksu"
[[Prototype]]
: 
Object
addresstype
: 
"road"
boundingbox
: 
Array(4)
0
: 
"36.9343020"
1
: 
"36.9350481"
2
: 
"30.8069613"
3
: 
"30.8072396"
length
: 
4
[[Prototype]]
: 
Array(0)
class
: 
"highway"
display_name
: 
"Cihadiye, Cihadiye Mahallesi, Aksu, أنطاليا, منطقة البحر الأبيض المتوسط, 07260, تركيا"
importance
: 
0.053403167009994625
lat
: 
"36.9345664"
licence
: 
"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright"
lon
: 
"30.8071410"
name
: 
""
osm_id
: 
209779309
osm_type
: 
"way"
place_id
: 
49084480
place_rank
: 
26
type
: 
"residential"
[[Prototype]]
: 
Object
[[Prototype]]
: 
Object*/