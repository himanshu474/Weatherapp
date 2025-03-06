import rain from "../assets/icons/rain.svg";
import drizzle from "../assets/icons/drizzle.svg";
import thunderstorm from "../assets/icons/thunderstorm.svg";
import snow from "../assets/icons/snow.svg";
import atmosphere from "../assets/icons/atmosphere.svg";
import clear from "../assets/icons/clear.svg";
import fewclouds from "../assets/icons/fewclouds.svg";
import cloudy from "../assets/icons/fewclouds.svg";
import brkclouds from "../assets/icons/brkclouds.svg";
import overclouds from "../assets/icons/overclouds.svg";

const weatherConditions = {
  drizzle: { codes: [300, 301, 302, 310, 311, 312, 313, 314, 321], icon: drizzle },
  thunderstorm: { codes: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232], icon: thunderstorm },
  rain: { codes: [500, 501, 502, 504, 511, 520, 521, 522, 531], icon: rain },
  snow: { codes: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622], icon: snow },
  atmosphere: { codes: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781], icon: atmosphere },
  clear: { codes: [800], icon: clear },
  fewclouds: { codes: [801], icon: fewclouds },
  clouds: { codes: [802], icon: cloudy },
  brkclouds: { codes: [803], icon: brkclouds },
  overclouds: { codes: [804], icon: overclouds },
};

const getIcon = (id) => {
  for (const condition in weatherConditions) {
    if (weatherConditions[condition].codes.includes(id)) {
      return weatherConditions[condition].icon;
    }
  }
  // Fallback for unknown IDs (optional)
  return null;
};


export default getIcon;
