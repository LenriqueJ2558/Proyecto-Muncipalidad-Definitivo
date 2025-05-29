import React from 'react';
import AgregarPersonalForm from './AgregarPersonalForm';
import RegistrarUsuarioForm from './RegistrarUsuarioForm';
import DetalleUsuarioForm from './UsuarioDetalles';
import UserListForm from './UserList';
import ReportesEstadisticos from './ReportesEstadisticos';
import NoPermission from './NoPermission';
import SerenoNoPermission from './serenoNoPermission';
import DatosServicioForm from './AgregarServicioForm';
import NovedadesCamaraForm from './NovedadesCamaras';
import InformacionEstudioForm from './AgregarInformacionEstudioForm';
import InformacionEmpleado from './AgregarDatosFamiliaresForm';
import ReportePersonalTable from './ReportePersonalTable';
import MisReportesCamaras from './MisReportesCamaras';

import { Carousel } from 'react-bootstrap';
import '../css/dashContent.css';
//IMAGENES
import img1 from '../image/img1.png';
import img2 from '../image/img2.png';
import img3 from '../image/img3.png';
import img4 from '../image/img4.png';
import img5 from '../image/img5.png';
import img6 from '../image/img6.png';
import img7 from '../image/img7.png';
import img8 from '../image/img8.png';
import img9 from '../image/img9.png';
import img10 from '../image/img10.png';
import img11 from '../image/img11.png';
import img12 from '../image/img12.png';
import img13 from '../image/img13.png';

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
        if (role === 'Administrador') {
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
        if (role === 'Administrador') {
          return <ReportePersonalTable />;
        } else {
          return <NoPermission />;
        }
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
          return <SerenoNoPermission />;
        }
      case 'mis-reportes-camaras':
        return <MisReportesCamaras />;
          
          
      case 'novedades-serenazgo':
        if (role === 'Administrador') {
          return <div><h2>Novedades de Serenazgo</h2></div>; 

        } else {
          return <SerenoNoPermission />;
        }
      case 'novedades-llamadas':
        return <div><h2>Novedades de Llamadas</h2></div>;
      case 'novedades-contribuyente':
         if (role === 'Administrador') {
          return <div><h2>Novedades de Serenazgo</h2></div>; 
        } else {
          return <SerenoNoPermission />;
        }
      default:
        return (
          <div className="container">
            <Carousel fade id='caruchel'>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img1}
                  alt="Primera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img2}
                  alt="Segunda imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block"
                  src={img3}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img4}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img5}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img6}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img7}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img8}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img9}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img10}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img11}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img12}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img13}
                  alt="Tercera imagen"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        );
    }
  };

  return <>{renderContent()}</>;
};

export default DashboardContent;