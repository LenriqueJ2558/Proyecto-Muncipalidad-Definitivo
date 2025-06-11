import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MisReportesCamaras.css';
import { useNavigate } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MAX_VISIBLE_PAGES = 15;

const MisReportesSerenazgo = () => {
    const [allData, setAllData] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [pageRange, setPageRange] = useState({ start: 1, end: MAX_VISIBLE_PAGES });

    const [filtroBase, setFiltroBase] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [errorFecha, setErrorFecha] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token no encontrado');
                    return;
                }

                const response = await axios.get('http://192.168.16.246:3003/api/mobile/misnovedades', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data;

                const formatted = data.map(item => ({
                    id: item.id,
                    nombre_cliente: item.nombre_cliente || '',
                    descripcion: item.descripcion || '',
                    base: item.Base || '',
                    fechaHora: item.created_at ? new Date(item.created_at) : null,
                }));

                formatted.sort((a, b) => b.fechaHora - a.fechaHora);
                setAllData(formatted);
                setFilteredItems(formatted);
            } catch (error) {
                console.error('Error al obtener los reportes de serenazgo:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = allData;

        if (filtroBase) {
            filtered = filtered.filter(item => item.base === filtroBase);
        }

        if (fechaDesde && fechaHasta) {
            const [y1, m1, d1] = fechaDesde.split('-');
            const desde = new Date(y1, m1 - 1, d1);
            desde.setHours(0, 0, 0, 0);

            const [y2, m2, d2] = fechaHasta.split('-');
            const hasta = new Date(y2, m2 - 1, d2);
            hasta.setHours(23, 59, 59, 999);


            if (desde > hasta) {
                setErrorFecha('La fecha "Desde" no puede ser mayor que la fecha "Hasta".');
                return;
            } else {
                setErrorFecha('');
            }

            filtered = filtered.filter(item => {
                return item.fechaHora >= desde && item.fechaHora <= hasta;
            });

        } else {
            setErrorFecha('');

            if (fechaDesde) {
                const desde = new Date(fechaDesde);
                desde.setHours(0, 0, 0, 0);

                filtered = filtered.filter(item => item.fechaHora >= desde);
            }

            if (fechaHasta) {
                const hasta = new Date(fechaHasta);
                hasta.setHours(23, 59, 59, 999);

                filtered = filtered.filter(item => item.fechaHora <= hasta);
            }
        }

        setFilteredItems(filtered);

        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        setPageRange({
            start: 1,
            end: Math.min(MAX_VISIBLE_PAGES, totalPages)
        });

        setCurrentPage(1);
    }, [allData, filtroBase, fechaDesde, fechaHasta]);

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

    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Funciones para formatear fecha y hora por separado
    const formatearFecha = (fecha) => {
        if (!fecha) return '';
        return new Intl.DateTimeFormat('es-PE', {
            dateStyle: 'short',
        }).format(fecha);
    };
    const handleAbrir = (id) => {
    navigate(`novedadesSerenazgo/${id}`);
};



    return (
        <div className="container">
            <div className="reporte-wrapper">
                <h2 className="title">Mis Reportes de Serenazgo</h2>

                <div className="formreportsdate">
                    <div className="search-container">
                        <select
                            value={filtroBase}
                            onChange={(e) => setFiltroBase(e.target.value)}
                            className="input"
                            id="selectoptions"
                        >
                            <option value="">Todas las Bases</option>
                            <option value="Base Casco Urbano">Base Casco Urbano</option>
                            <option value="BASE B">BASE B</option>
                            <option value="BASE C">BASE C</option>
                        </select>

                        <label>Desde:</label>
                        <input
                            type="date"
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                            className="input"
                            id="selectoptions"
                        />

                        <label>Hasta:</label>
                        <input
                            type="date"
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                            className="input"
                            min={fechaDesde}
                            id="selectoptions"
                        />
                    </div>

                    <button
                        className="clear-button"
                        onClick={() => {
                            setFiltroBase('');
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
                    <table className="data-table" id="tabledata">
                        <thead>
                            <tr className="table-labores">
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Base</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nombre_cliente}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.base}</td>
                                    <td>{formatearFecha(item.fechaHora)}</td>
                                    <td>
                                        <button
                                            className="abrir-button"
                                            onClick={() => handleAbrir(item.id)}
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

export default MisReportesSerenazgo;