import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ubicaciones = [
  "RAYOS DEL SOL", "INICIAL PILOTO", "COLEGIO JOSEFA CARRILLO",
  "CARRETERA CENTRAL  - COLEGIO CUZCO", "PARQUE COOPERATIVA PABLO PATRON",
  "BOLIVIA (LAS PARRITAS)", "SAN JUAN DE BELLAVISTA - ROSARIO",
  "LIBERTAD - TRUJILLO SUR", "LIBERTAD - CARRETERA CENTRAL",
  "AREQUIPA - TRUJILLO SUR", "PTE CENTENARIO - AREQUIPA",
  "CHILE GUZMAN Y VALLE (SHIAPO)", "AREQUIPA - CARRETERA CENTRAL",
  "ARICA - CARRETERA CENTRAL", "ARICA - 28 DE JULIO",
  "CALLAO  - CARRETERA CENTRAL", "COLOMBIA -TUPAC  AMARU(COE)",
  "SALAVERRY - CARRETERA CENTRAL", "CHICLAYO - CARRETERA CENTRAL",
  "SAN JOSE - CRISTO BLANCO", "CHICLAYO - TRUJILLO SUR",
  "TACNA - CARRETERA CENTRAL", "AV 28 DE JULIO - IQUITOS",
  "INGRESO AL ESTADIO", "PIROXENITAS - SAN JOSE",
  "TUPAC AMARU - LOS ALAMOS (COE ATRAS)", "7 DE JUNIO - EL CARMEN (PEDREGAL)",
  "ING. VEGA - GUZMAN Y VALLE (RIMAC)", "ESCALERA A PEDREGAL", "LA RIBERA",
  "PASAJE NAVIDAD - 20 DE MAYO", "TARAZONA  - CARRETERA CENTRAL",
  "SANTA MARIA  CARRETERA CENTRAL", "SEGURO PARQUE MEDICINA",
  "4 ZONA (PASANDO EL HUAYCO)", "CASETA 3 COLEGIO SALAZAR BONDY",
  "CASUARINAS PTZ (ENTRADA DEL CANAL)", "LOCAL COMUNAL(PARQUE QUIRIO)",
  "POSTA ZONA 2 SIMON BOLIVAR COLEGIO NP", "PROLONGACION LOS HEROES (PRIME GYM)",
  "SIERRA LIMEÑA FIJA", "TARAZONA CANAL PTZ"
];

const SelectUbicacionCamara = ({ register, selectedLocation, handleSelectChange }) => (
  <div className="mb-6 relative">
    <label className="block text-black text-lg font-medium mb-2">Ubicación de la Cámara:</label>
    <div className="relative">
      <select
        {...register('UbiCamara')}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black appearance-none"
        value={selectedLocation}
        onChange={handleSelectChange}
      >
        <option value="">Seleccione una ubicación de la cámara</option>
        {ubicaciones.map((ubi, idx) => (
          <option key={idx} value={ubi}>{ubi}</option>
        ))}
      </select>
      <FontAwesomeIcon
        icon={faChevronDown}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  </div>
);

export default SelectUbicacionCamara;