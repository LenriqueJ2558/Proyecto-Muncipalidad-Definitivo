import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faClipboardList, faGraduationCap, faUsers, faCalendarCheck, faUser, faUserEdit, faListCheck, faScrewdriverWrench, faChartPie, faAddressBook, faClipboardUser, faPersonCircleExclamation, faSquarePhone, faPersonMilitaryPointing, faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Dashboard.css';
import DashboardContent from './DashboardContent';
import buoImage from '../image/buo.png';
import Camaras from '../image/camaras.png';
import ActualizarNovedades from './ActualizarNovedades';

const WelcomeModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

  return (
    <div className="welcome-modal" onClick={(e) => {
      if (e.target.className === 'welcome-modal') onClose();
    }}>
      <div className="modal-content">
        <div className="modal-description">
          <h2 className="modal-title">¡BIENVENID@ AL SISTEMA DEL CIEM!</h2>
          <div className="buo-image">
            <img className='logobuo' src={buoImage || "/placeholder.svg"} alt="buo" />
          </div>
          <p className="modal-text">Recuerda subir las novedades del día para mantenernos todos informados y asegurar una buena gestión del servicio.</p>
          <div className="modal-button">
            <button className="modal-btn" onClick={onClose}>Entendido</button>
          </div>
        </div>
        <div className="modal-img">
          <img className='camara' src={Camaras || "/placeholder.svg"} alt="camara" />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const fullName = localStorage.getItem('Nombre');
  const role = localStorage.getItem('TipoRol');
  const [activeMenu, setActiveMenu] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showNovedadesCamarasSubmenu, setShowNovedadesCamarasSubmenu] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const handleLogout = async () => {
    try {
      await fetch('http://192.168.16.246:3003/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.clear();
      navigate('/login');
    }
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setSelectedContent('');
    navigate('/dashboard');
  };

  const handleSubMenuClick = (content) => {
    setSelectedContent(content);
    navigate('/dashboard');
  };

  const handleUserMenuToggle = () => setShowUserMenu(!showUserMenu);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && event.target.classList.contains('modal')) {
        setShowModal(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showModal]);

  return (
    <div className="content-body">
      <WelcomeModal isOpen={showModal} onClose={handleCloseModal} />

      <nav className="navbar-custom p-4 flex justify-between items-center">
        <div className="text-white text-xl flex items-center">
          <img className='logobuo' src={buoImage || "/placeholder.svg"} alt="buo" /> CIEM ({role})
        </div>
        <div className="flex items-center space-x-4 relative">
          <div><h2>Bienvenido</h2>{fullName}</div>
          <div className="relative">
            <button onClick={handleUserMenuToggle} className="text-white focus:outline-none">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md py-2 z-10" id='menuUser'>
                <button onClick={() => handleSubMenuClick('registrar-usuario')} className="block px-4 py-2 text-sm w-full text-left">
                  <FontAwesomeIcon icon={faUserPlus} /> Registrar Usuario
                </button>
                <button onClick={() => handleSubMenuClick('detalles-usuario')} className="block px-4 py-2 text-sm w-full text-left">
                  <FontAwesomeIcon icon={faUserEdit} /> Detalles del Usuario
                </button>
                <button onClick={() => handleSubMenuClick('lista-usuarios')} className="block px-4 py-2 text-sm w-full text-left">
                  <FontAwesomeIcon icon={faUsers} /> Lista de Usuarios
                </button>
                <button onClick={handleLogout} className="block px-4 py-2 text-sm w-full text-left">
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-grow mt-[1%]">
        <aside className="sidebar-custom w-64 text-white flex-shrink-0">
          <nav>
            <button className={`w-full text-left px-4 py-2 ${activeMenu === 'sub-gerencia' ? 'active' : ''}`} onClick={() => handleMenuClick('sub-gerencia')}>
              Sub Gerencia
            </button>
            <button className={`w-full text-left px-4 py-2 ${activeMenu === 'ciem' ? 'active' : ''}`} onClick={() => handleMenuClick('ciem')}>
              CIEM
            </button>
            <button className={`w-full text-left px-4 py-2 ${activeMenu === 'reportes' ? 'active' : ''}`} onClick={() => handleMenuClick('reportes')}>
              Reportes
            </button>
            <button className={`w-full text-left px-4 py-2 ${activeMenu === 'novedades' ? 'active' : ''}`} onClick={() => handleMenuClick('novedades')}>
              Reportes de Novedades
            </button>
          </nav>

          <div className="submenu">
            {activeMenu === 'sub-gerencia' && (
              <nav>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('agregar-personal')}>
                  <FontAwesomeIcon icon={faUserPlus} /> Agregar Personal
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('datos-servicio')}>
                  <FontAwesomeIcon icon={faClipboardList} /> Datos del Servicio
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('informacion-estudio')}>
                  <FontAwesomeIcon icon={faGraduationCap} /> Información de Estudio
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('datos-familiares')}>
                  <FontAwesomeIcon icon={faUsers} /> Datos Familiares del Personal
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('registro-asistencia')}>
                  <FontAwesomeIcon icon={faCalendarCheck} /> Registro de Asistencia
                </button>
              </nav>
            )}
            {activeMenu === 'ciem' && (
              <nav>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('inventario')}>
                  <FontAwesomeIcon icon={faListCheck} /> Inventario
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('reparaciones')}>
                  <FontAwesomeIcon icon={faScrewdriverWrench} /> Reparaciones
                </button>
              </nav>
            )}
            {activeMenu === 'reportes' && (
              <nav>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('reportes-personal')}>
                  <FontAwesomeIcon icon={faClipboardUser} /> Reportes del Personal
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('reportes-asistencia')}>
                  <FontAwesomeIcon icon={faAddressBook} /> Reportes de Asistencia
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('reportes-estadisticos')}>
                  <FontAwesomeIcon icon={faChartPie} /> Reportes Estadísticos
                </button>
              </nav>
            )}
            {activeMenu === 'novedades' && (
              <nav>
                <button className="w-full text-left py-1" onClick={() => setShowNovedadesCamarasSubmenu(!showNovedadesCamarasSubmenu)}>
                  <FontAwesomeIcon icon={faCamera} /> Novedades de Cámaras
                </button>
                {showNovedadesCamarasSubmenu && (
                  <>
                    <button className="w-full text-left py-1 pl-6" onClick={() => handleSubMenuClick('novedades-camaras')}>
                      ➕ Agregar Novedad
                    </button>
                    <button className="w-full text-left py-1 pl-6" onClick={() => handleSubMenuClick('mis-reportes-camaras')}>
                      📋 Mis Reportes
                    </button>
                  </>
                )}
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('novedades-serenazgo')}>
                  <FontAwesomeIcon icon={faPersonMilitaryPointing} /> Novedades de Serenazgo
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('novedades-llamadas')}>
                  <FontAwesomeIcon icon={faSquarePhone} /> Novedades de Llamadas
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('novedades-contribuyente')}>
                  <FontAwesomeIcon icon={faPersonCircleExclamation} /> Novedades de Contribuyente
                </button>
              </nav>
            )}
          </div>
        </aside>

        <main className="dash-novedades">
          <Routes>
            <Route path="/" element={<DashboardContent selectedContent={selectedContent} />} />
            <Route path="novedades/:id" element={<ActualizarNovedades />} />
          </Routes>
        </main>
      </div>

      <footer className="footer-ciem">
        <div className="img-footer">
          <img className='logobuo' src={buoImage || "/placeholder.svg"} alt="buo" />
        </div>
        <div className="copiright">
          <p> &copy; 2025 CIEM - Centro Integrado de Emergencias y Monitoreo</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
