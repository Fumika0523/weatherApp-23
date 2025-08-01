import { FaWind, FaTint, FaThermometerHalf, FaCompressArrowsAlt } from "react-icons/fa";

const airConditions = [
  { icon: <FaWind />, label: "Wind Speed", value: "15 km/h" },
  { icon: <FaThermometerHalf />, label: "Real Feel", value: "30°" },
  { icon: <FaTint />, label: "Humidity", value: "65%" },
  { icon: <FaCompressArrowsAlt />, label: "Pressure", value: "1015 hPa" },
];

export default function page() {
  return (
    <div className="mb-5 bg-gray-800/60 rounded-2xl flex flex-col mx-5 px-6 py-7">
      <p className="text-gray-400 font-bold uppercase mb-4">Air Conditions</p>

      <div className="grid grid-cols-2 gap-4">
        {airConditions.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-700/40 p-3 rounded-lg"
          >
            <span className="text-xl text-amber-400">{item.icon}</span>
            <div className="flex flex-col text-sm">
              <span className="text-gray-300">{item.label}</span>
              <span className="font-bold text-white">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
