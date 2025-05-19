import React from 'react';
import AgregarPersonalForm from './AgregarPersonalForm';
import RegistrarUsuarioForm from './RegistrarUsuarioForm';
import DetalleUsuarioForm from './UsuarioDetalles';
import UserListForm from './UserList';
import ReportesEstadisticos from './ReportesEstadisticos';
import NoPermission from './NoPermission'; 
import DatosServicioForm from './AgregarServicioForm';
import NovedadesCamaraForm from './NovedadesCamaras';
import InformacionEstudioForm from './AgregarInformacionEstudioForm';
import InformacionEmpleado from './AgregarDatosFamiliaresForm';
import ReportePersonalTable from './ReportePersonalTable';

const DashboardContent = ({ selectedContent }) => {
  const role = localStorage.getItem('TipoRol');

  const renderContent = () => {
    switch (selectedContent) {
      case 'agregar-personal':
        if (role === 'Administrador') {
          return <AgregarPersonalForm />;
        } else {
          return <NoPermission />;
        }
      case 'registrar-usuario':
        if (role === 'Administrador' ) {
          return <RegistrarUsuarioForm />;
        } else {
          return <NoPermission />;
        }
      case 'detalles-usuario':
        if (role === 'Administrador' || role === 'Moderador') {
          return <DetalleUsuarioForm />;
        } else {
          return <NoPermission />;
        }
      case 'lista-usuarios':
        if (role === 'Administrador') {
          return <UserListForm />;
        } else {
          return <NoPermission />;
        }
      case 'datos-servicio':
        if (role === 'Administrador') {
          return <DatosServicioForm />;
        } else {
          return <NoPermission />;
        }
      case 'informacion-estudio':
        if (role === 'Administrador') {
          return <InformacionEstudioForm />;
        } else {
          return <NoPermission />;
        }
      case 'datos-familiares':
        if (role === 'Administrador') {
          return <InformacionEmpleado />;
        } else {
          return <NoPermission />;
        }
      case 'registro-asistencia':
        return <div><h2>Registro de Asistencia</h2></div>;
      case 'reportes-personal':
        if (role === 'Administrador') {
          return <ReportePersonalTable />;
        } else {
          return <NoPermission />;
        }
      case 'reportes-asistencia':
        return <div><h2>Reportes de Asistencia</h2></div>;
      case 'reportes-estadisticos':
        return <ReportesEstadisticos />;
      case 'inventario':
        return <div><h2>Inventario</h2></div>;
      case 'reparaciones':
        return <div><h2>Reparaciones</h2></div>;
      case 'novedades-camaras':
        if (role === 'Administrador') {
          return <NovedadesCamaraForm />;
        } else {
          return <NoPermission />;
        }
      case 'novedades-serenazgo':
        return <div><h2>Novedades de Serenazgo</h2></div>;
      case 'novedades-llamadas':
        return <div><h2>Novedades de Llamadas</h2></div>;
      case 'novedades-contribuyente':
        return <div><h2>Novedades de Contribuyente</h2></div>;
      default:
        return <h2>Bienvenido al Dashboard de Administrador</h2>;
    }
  };

  return <>{renderContent()}</>;
};

export default DashboardContent;