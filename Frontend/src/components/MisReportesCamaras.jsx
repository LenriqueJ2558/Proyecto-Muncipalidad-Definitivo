import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MisReportesCamaras.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faClipboardList, faGraduationCap, faUsers, faCalendarCheck, faUser, faUserEdit, faListCheck, faScrewdriverWrench, faChartPie, faAddressBook, faClipboardUser, faPersonCircleExclamation, faSquarePhone, faPersonMilitaryPointing, faCamera } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MAX_VISIBLE_PAGES = 15;


const MisReportesCamaras = () => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [pageRange, setPageRange] = useState({ start: 1, end: MAX_VISIBLE_PAGES });

  const [filtroTurno, setFiltroTurno] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [errorFecha, setErrorFecha] = useState('');
  const [showMore, setShowMore] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.16.246:3003/api/novedades-camara');
        const reportes = response.data;

        const formatted = reportes.map(item => ({
          idNovedades: item.idNovedades,
          NombreSupervisor: item.NombreSupervisor || '',
          NombreOperador: item.NombreOperador || '',
          Turno: item.Turno || '',
          Fecha: item.Fecha || '',
          hora_novedades: item.hora_novedades || '',
          DescripciondeNovedad: item.DescripciondeNovedad || '',
          Estado: item.Estado || '',
        }));

        formatted.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
        setAllData(formatted);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = allData;

    if (filtroTurno) {
      filtered = filtered.filter(item => item.Turno === filtroTurno);
    }

    if (fechaDesde && fechaHasta) {
      const desde = new Date(fechaDesde);
      const hasta = new Date(fechaHasta);

      if (desde > hasta) {
        setErrorFecha('La fecha "Desde" no puede ser mayor que la fecha "Hasta".');
        return;
      } else {
        setErrorFecha('');
      }

      filtered = filtered.filter(item => {
        const fechaItem = new Date(item.Fecha);
        return fechaItem >= desde && fechaItem <= hasta;
      });
    } else {
      setErrorFecha('');
      if (fechaDesde) {
        filtered = filtered.filter(item => new Date(item.Fecha) >= new Date(fechaDesde));
      }
      if (fechaHasta) {
        filtered = filtered.filter(item => new Date(item.Fecha) <= new Date(fechaHasta));
      }
    }

    setFilteredItems(filtered);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    setPageRange({
      start: 1,
      end: Math.min(MAX_VISIBLE_PAGES, totalPages)
    });

    setCurrentPage(1);
  }, [allData, filtroTurno, fechaDesde, fechaHasta]);

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

        <div className="formreportsdate">
          <div className="search-container">
            <select
              value={filtroTurno}
              onChange={(e) => setFiltroTurno(e.target.value)}
              className="input"
              id='selectoptions'
            >
              <option value="">Todos los Turnos</option>
              <option value="DÍA">DÍA</option>
              <option value="TARDE">TARDE</option>
              <option value="NOCHE">NOCHE</option>
            </select>

            <label>Desde:</label>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="input"
              id='selectoptions'
            />

            <label>Hasta:</label>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="input"
              min={fechaDesde}
              id='selectoptions'
            />

          </div>

          <button
            className="clear-button"
            onClick={() => {
              setFiltroTurno('');
              setFechaDesde('');
              setFechaHasta('');
              setErrorFecha('');
              setCurrentPage(1);
            }}
          >
            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
            Limpiar filtros
          </button>
        </div>

        {errorFecha && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorFecha}</p>}

        <div className="tabla-contenedor">
          <table className="data-table" id='tabledata'>
            <thead>
              <tr className='table-labores'>
                <th>Supervisor</th>
                <th>Operador</th>
                <th>Turno</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
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
                  <td>
                    <button
                      className="abrir-button"
                      onClick={() => {
                        console.log("ID que se manda:", item.idNovedades); // ✅ Aquí
                        navigate(`novedades/${item.idNovedades}`)
                      }
                      }
                    >
                      Abrir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <nav className="pagination">
            <button onClick={() => paginate(1)} disabled={currentPage === 1}>Primera</button>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>

            {pageRange.start > 1 && <button onClick={() => paginate(pageRange.start - 1)}>...</button>}

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

            {pageRange.end < totalPages && <button onClick={() => paginate(pageRange.end + 1)}>...</button>}

            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
            <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>Última</button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MisReportesCamaras;