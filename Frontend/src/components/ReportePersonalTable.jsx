import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportePersonalTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(40); // Siempre 40 elementos por página

  // Estado para las búsquedas
  const [searchName, setSearchName] = useState('');
  const [searchSurname, setSearchSurname] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de la API
        const response = await axios.get('http://192.168.16.246:3003/api/reporte-personal');
        const reportes = Array.isArray(response.data) ? response.data : [];

        // Procesar datos para combinarlos en un formato adecuado
        const formattedData = reportes.map(item => ({
          Dni: item.empleado_Dni,
          Nombre_Empleado: item.empleado.Nombre_Empleado,
          Apellido_Empleado: item.empleado.Apellido_Empleado,
          Telefono_Empleado: item.empleado.Telefono_Empleado,
          Direccion: item.empleado.Direccion,
          Edad: item.empleado.Edad,
          Cargo_Desempeño: item.Cargo_Desempeño,
          Base: item.Base,
          Turno: item.Turno
        }));

        // Filtrar duplicados por DNI
        const uniqueData = Array.from(new Map(formattedData.map(item => [item.Dni, item])).values());
        
        setData(uniqueData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  // Filtrar datos según las búsquedas
  const filteredData = data.filter(item =>
    item.Nombre_Empleado.toLowerCase().includes(searchName.toLowerCase()) &&
    item.Apellido_Empleado.toLowerCase().includes(searchSurname.toLowerCase())
  );

  // Calcular los índices de inicio y fin de la página actual después de filtrar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar página
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Número total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Reporte Personal</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full p-3 mb-4 border border-black rounded-lg shadow-sm bg-white text-black"
        />
        <input
          type="text"
          placeholder="Buscar por apellido"
          value={searchSurname}
          onChange={(e) => setSearchSurname(e.target.value)}
          className="w-full p-3 mb-4 border border-black rounded-lg shadow-sm bg-white text-black"
        />
      </div>

      <table className="min-w-full bg-white border border-black rounded-lg shadow-md">
        <thead className="bg-[#2F855A] text-white border-b border-black">
          <tr>
            <th className="p-3 text-left">DNI</th>
            <th className="p-3 text-left">Nombre Empleado</th>
            <th className="p-3 text-left">Apellido Empleado</th>
            <th className="p-3 text-left">Telefono</th>
            <th className="p-3 text-left">Direccion</th>
            <th className="p-3 text-left">Edad</th>
            <th className="p-3 text-left">Cargo que Desempeña</th>
            <th className="p-3 text-left">Base</th>
            <th className="p-3 text-left">Turno</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.Dni} className="hover:bg-[#2F855A] hover:text-white">
              <td className="p-3 border-b border-black text-black">{item.Dni}</td>
              <td className="p-3 border-b border-black text-black">{item.Nombre_Empleado}</td>
              <td className="p-3 border-b border-black text-black">{item.Apellido_Empleado}</td>
              <td className="p-3 border-b border-black text-black">{item.Telefono_Empleado}</td>
              <td className="p-3 border-b border-black text-black">{item.Direccion}</td>
              <td className="p-3 border-b border-black text-black">{item.Edad}</td>
              <td className="p-3 border-b border-black text-black">{item.Cargo_Desempeño}</td>
              <td className="p-3 border-b border-black text-black">{item.Base}</td>
              <td className="p-3 border-b border-black text-black">{item.Turno}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="mt-6">
        <ul className="flex justify-center space-x-2">
          <li>
            <button
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#2F855A] text-white rounded-lg hover:bg-[#1E6D4F] disabled:bg-gray-400"
            >
              Primera
            </button>
          </li>
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#2F855A] text-white rounded-lg hover:bg-[#1E6D4F] disabled:bg-gray-400"
            >
              Anterior
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index + 1}>
              <button
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-[#1E6D4F] text-white' : 'bg-[#2F855A] text-white'} hover:bg-[#1E6D4F]`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#2F855A] text-white rounded-lg hover:bg-[#1E6D4F] disabled:bg-gray-400"
            >
              Siguiente
            </button>
          </li>
          <li>
            <button
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#2F855A] text-white rounded-lg hover:bg-[#1E6D4F] disabled:bg-gray-400"
            >
              Última
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ReportePersonalTable;