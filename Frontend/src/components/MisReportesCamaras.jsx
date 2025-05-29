import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MisReportesCamaras.css';

const MAX_VISIBLE_PAGES = 15;

const MisReportesCamaras = () => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [pageRange, setPageRange] = useState({ start: 1, end: MAX_VISIBLE_PAGES });

  const [searchSupervisor, setSearchSupervisor] = useState('');
  const [searchOperador, setSearchOperador] = useState('');
  const [showMore, setShowMore] = useState({});

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.16.246:3003/api/novedades-camara');
        const reportes = response.data;
  
        const formatted = reportes.map(item => ({
          NombreSupervisor: item.NombreSupervisor || '',
          NombreOperador: item.NombreOperador || '',
          Turno: item.Turno || '',
          Fecha: item.Fecha || '',
          hora_novedades: item.hora_novedades || '',
          DescripciondeNovedad: item.DescripciondeNovedad || '',
          Estado: item.Estado || '',
        }));
  
        // Ordenar por fecha descendente
        formatted.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
  
        setAllData(formatted);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar los datos
    const filtered = allData.filter(item =>
      item.NombreSupervisor.toLowerCase().includes(searchSupervisor.toLowerCase()) &&
      item.NombreOperador.toLowerCase().includes(searchOperador.toLowerCase())
    );
    setFilteredItems(filtered);

    // Actualizar el rango de páginas según los datos filtrados
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    setPageRange({
      start: 1,
      end: Math.min(MAX_VISIBLE_PAGES, totalPages)
    });
  }, [allData, searchSupervisor, searchOperador]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    let newStart = pageRange.start;
    let newEnd = pageRange.end;

    if (currentPage < newStart) {
      newStart = currentPage;
      newEnd = Math.min(newStart + MAX_VISIBLE_PAGES - 1, totalPages);
    } else if (currentPage > newEnd) {
      newEnd = currentPage;
      newStart = Math.max(newEnd - MAX_VISIBLE_PAGES + 1, 1);
    }

    if (newStart !== pageRange.start || newEnd !== pageRange.end) {
      setPageRange({ start: newStart, end: newEnd });
    }
  }, [currentPage, totalPages]);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleShowMore = (index) => {
    setShowMore(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <div className="reporte-wrapper">
        <h2 className="title">Mis Reportes de Cámaras</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por Supervisor"
            value={searchSupervisor}
            onChange={(e) => setSearchSupervisor(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Buscar por Operador"
            value={searchOperador}
            onChange={(e) => setSearchOperador(e.target.value)}
            className="input"
          />
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Supervisor</th>
              <th>Operador</th>
              <th>Turno</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Descripción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr key={index}>
                <td>{item.NombreSupervisor}</td>
                <td>{item.NombreOperador}</td>
                <td>{item.Turno}</td>
                <td>{item.Fecha}</td>
                <td>{item.hora_novedades}</td>
                <td>
                  <div className={`descripcion ${showMore[index] ? 'show' : ''}`}>
                    {showMore[index]
                      ? item.DescripciondeNovedad
                      : item.DescripciondeNovedad.slice(0, 60)}
                    {item.DescripciondeNovedad.length > 60 && (
                      <span
                        className="ver-mas"
                        onClick={() => toggleShowMore(index)}
                      >
                        {showMore[index] ? ' Ver menos' : '... Ver más'}
                      </span>
                    )}
                  </div>
                </td>
                <td>{item.Estado}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          <nav className="pagination">
            <button onClick={() => paginate(1)} disabled={currentPage === 1}>
              Primera
            </button>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>

            {pageRange.start > 1 && (
              <button onClick={() => paginate(pageRange.start - 1)}>...</button>
            )}

            {[...Array(pageRange.end - pageRange.start + 1)].map((_, i) => {
              const page = i + pageRange.start;
              return (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              );
            })}

            {pageRange.end < totalPages && (
              <button onClick={() => paginate(pageRange.end + 1)}>...</button>
            )}

            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              Siguiente
            </button>
            <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
              Última
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MisReportesCamaras;