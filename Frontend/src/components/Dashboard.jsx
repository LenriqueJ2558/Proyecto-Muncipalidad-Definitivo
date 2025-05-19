import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faClipboardList, faGraduationCap, faUsers, faCalendarCheck, faUser, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Dashboard.css';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
  const navigate = useNavigate();

  const fullName = localStorage.getItem('Nombre');
  const role = localStorage.getItem('TipoRol');

  const [activeMenu, setActiveMenu] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false); // Nuevo estado para mostrar el submenú de usuario

  const handleLogout = async () => {
    try {
      // Llama a tu API de signout
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
      // Remover datos de localStorage y navegar a la página de login
      localStorage.removeItem('token');
      localStorage.removeItem('Nombre');
      localStorage.removeItem('TipoRol');
      navigate('/login');
    }
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setSelectedContent('');
  };

  const handleSubMenuClick = (content) => {
    setSelectedContent(content);
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu); // Alterna la visibilidad del submenú de usuario
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="navbar-custom p-4 flex justify-between items-center">
        <div className="text-white text-xl">{role}</div>
        <div className="flex items-center space-x-4 relative">
          <div><h2>Bienvenido</h2>{fullName}</div>
          <div className="relative">
            <button
              onClick={handleUserMenuToggle}
              className="text-white focus:outline-none"
            >
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                <button
                  onClick={() => handleSubMenuClick('registrar-usuario')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <FontAwesomeIcon icon={faUserPlus} /> Registrar Usuario
                </button>
                <button
                  onClick={() => handleSubMenuClick('detalles-usuario')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <FontAwesomeIcon icon={faUserEdit} /> Detalles del Usuario
                </button>
                <button
                  onClick={() => handleSubMenuClick('lista-usuarios')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <FontAwesomeIcon icon={faUsers} /> Lista de Usuarios
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-grow">
        <aside className="sidebar-custom w-64 text-white flex-shrink-0">
          <nav>
            <button
              className={`w-full text-left px-4 py-2 ${activeMenu === 'sub-gerencia' ? 'active' : ''}`}
              onClick={() => handleMenuClick('sub-gerencia')}
            >
              Sub Gerencia
            </button>
            <button
              className={`w-full text-left px-4 py-2 ${activeMenu === 'ciem' ? 'active' : ''}`}
              onClick={() => handleMenuClick('ciem')}
            >
              CIEM
            </button>
            <button
              className={`w-full text-left px-4 py-2 ${activeMenu === 'reportes' ? 'active' : ''}`}
              onClick={() => handleMenuClick('reportes')}
            >
              Reportes
            </button>
            <button
              className={`w-full text-left px-4 py-2 ${activeMenu === 'novedades' ? 'active' : ''}`}
              onClick={() => handleMenuClick('novedades')}
            >
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
                  Inventario
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('reparaciones')}>
                  Reparaciones
                </button>
              </nav>
            )}
            {activeMenu === 'reportes' && (
              <nav>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('reportes-personal')}>
                  Reportes del Personal
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('reportes-asistencia')}>
                  Reportes de Asistencia
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('reportes-estadisticos')}>
                  Reportes Estadísticos
                </button>
              </nav>
            )}
            {activeMenu === 'novedades' && (
              <nav>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('novedades-camaras')}>
                  Novedades de Cámaras
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('novedades-serenazgo')}>
                  Novedades de Serenazgo
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('novedades-llamadas')}>
                  Novedades de Llamadas
                </button>
                <button className="w-full text-left py-1" onClick={() => handleSubMenuClick('novedades-contribuyente')}>
                  Novedades de Contribuyente
                </button>
              </nav>
            )}
          </div>
        </aside>

        <main className="main-content flex-grow">
          <DashboardContent selectedContent={selectedContent} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;