import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const BASE_URL = 'http://192.168.16.246:3003';

const getMediaUrl = (tipo, archivo) => {
  if (!archivo) return '';
  if (tipo === 'foto') return `${BASE_URL}/api/uploads/imagenesNovedades/${archivo}`;
  if (tipo === 'video') return `${BASE_URL}/api/uploads/videosNovedades/${archivo}`;
  return '';
};

const ActualizarSerenazgoNovedades = () => {
  const { id } = useParams();
  const [novedad, setNovedad] = useState(null);

  useEffect(() => {
    const fetchNovedad = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/api/mobile/misnovedades/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setNovedad(data);
      } catch (error) {
        console.error('Error al cargar la novedad:', error);
      }
    };

    fetchNovedad();
  }, [id]);

  if (!novedad) return <p>Cargando novedad...</p>;

  const fechaFormateada = new Date(novedad.created_at).toLocaleString();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Detalles de la Novedad de Serenazgo</h2>

      <div>
        <label><strong>Nombre del Serenazgo:</strong></label>
        <p>{novedad.nombre_cliente}</p>
      </div>

      <div>
        <label><strong>Descripción:</strong></label>
        <p>{novedad.descripcion}</p>
      </div>

      <div>
        <label><strong>Base:</strong></label>
        <p>{novedad.Base}</p>
      </div>

      <div>
        <label><strong>Fecha y Hora:</strong></label>
        <p>{fechaFormateada}</p>
      </div>
      <div>
        <label><strong>General de Novedades:</strong></label>
        <p>{novedad.GeneraldeNovedades}</p>
      </div>

      <div>
        <label><strong>Tipo de Novedades:</strong></label>
        <p>{novedad.TipodeNovedades}</p>
      </div>

      <div>
        <label><strong>Subtipo de Novedades:</strong></label>
        <p>{novedad.SubTipoNovedades}</p>
      </div>

      {novedad.foto && (
        <div>
          <p><strong>Foto actual:</strong></p>
          <img
            src={getMediaUrl('foto', novedad.foto)}
            alt="Foto novedad"
            style={{ width: '200px', marginBottom: '10px' }}
          />
        </div>
      )}

      {novedad.video && (
        <div>
          <p><strong>Video actual:</strong></p>
          <video
            src={getMediaUrl('video', novedad.video)}
            controls
            width="300"
            style={{ marginBottom: '10px' }}
          />
        </div>
      )}

      {novedad.latitud && novedad.longitud && (
        <div style={{ height: '200px', marginTop: '50px' }}>
          <h4>Ubicación</h4>
          <MapContainer
            center={[novedad.latitud, novedad.longitud]}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            />
            <Marker position={[novedad.latitud, novedad.longitud]}>
              <Popup>Ubicación del reporte</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default ActualizarSerenazgoNovedades;