import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import GeneralDeNovedadesInput from './componentsCamara/GeneralDeNovedadesInput';
import TipoDeNovedadesInput from './componentsCamara/TipoDeNovedadesInput';
import SubTipoDeNovedadesInput from './componentsCamara/SubTipoDeNovedadesInput';
import SelectTurno from './componentsCamara/SelectTurno';
import SelectEstado from './componentsCamara/SelectEstado';
import SelectNumeroEstacion from './componentsCamara/SelectNumeroEstacion';
import FechaHoraActual from './componentsCamara/FechaHoraActual';
import AutoResizeTextarea from './componentsCamara/textarea';
import SelectSupervisor from './componentsCamara/SelectSupervisor';
import SelectOperador from './componentsCamara/SelectOperador';
import SelectUbicacionCamara from './componentsCamara/SelectUbicacionCamara';
import BuscarPorCodigo from './componentsCamara/BuscarPorCodigo';
import CamposGeolocalizacion from './componentsCamara/CamposGeolocalizacion';
import CampoFoto from './componentsCamara/CampoFoto';
import CampoVideo from './componentsCamara/CampoVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faClipboardList, faGraduationCap, faUsers, faCalendarCheck, faUser, faUserEdit, faListCheck, faScrewdriverWrench, faChartPie, faAddressBook, faClipboardUser, faPersonCircleExclamation, faSquarePhone, faPersonMilitaryPointing, faCamera, faTimes, faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/novedadcam.css';
import Swal from 'sweetalert2';

const FormularioNovedades = () => {
  const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [supervisores, setSupervisores] = useState([]);
  const [operadores, setOperadores] = useState([]);
  const [previewFoto, setPreviewFoto] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [locationData, setLocationData] = useState({
    longitud: '',
    latitud: '',
    localizacion: ''
  });
  const [fechaNovedad, setFechaNovedad] = useState('');
  const [horaNovedad, setHoraNovedad] = useState('');

  const handleFechaHoraChange = (fecha, hora) => {
    setFechaNovedad(fecha);
    setHoraNovedad(hora);
  };



  const fetchLocationData = async (locationName) => {
    try {
      const response = await fetch(`http://192.168.16.246:3003/api/localizacion/${locationName}`);
      const data = await response.json();

      console.log('Datos recibidos:', data);
      // Actualizar los campos con los datos obtenidos
      setLocationData({
        longitud: data.LOG || '',
        latitud: data.LAT || '',
        localizacion: data.LOCALIZACION || '',

      });

    } catch (error) {
      console.error('Error al obtener los datos de la API:', error);
    }
  };

  // Efecto para llamar a la API cuando se selecciona una opción
  useEffect(() => {
    if (selectedLocation) {
      // Verificar valor seleccionado
      fetchLocationData(selectedLocation);
    }
  }, [selectedLocation]);
  const handleSelectChange = (e) => {
    const newSelectedLocation = e.target.value;
    setSelectedLocation(newSelectedLocation);
    console.log('Ubicación seleccionada:', newSelectedLocation); // Actualizamos primero el estado del select
  };


  useEffect(() => {
    const fetchSupervisores = async () => {
      try {
        const response = await axios.get('http://192.168.16.246:3003/api/Supervisor-Nombre-Camara');
        if (response.data && Array.isArray(response.data.data)) {
          setSupervisores(response.data.data);
        } else {
          setSupervisores([]);
        }
      } catch (error) {
        console.error('Error fetching supervisors:', error);
      }
    };



    const fetchOperadores = async () => {
      try {
        const response = await axios.get('http://192.168.16.246:3003/api/Operador-Nombre-Camara');
        if (response.data && Array.isArray(response.data.data)) {
          setOperadores(response.data.data);
        } else {
          setOperadores([]);
        }
      } catch (error) {
        console.error('Error fetching operators:', error);
      }
    };

    fetchSupervisores();
    fetchOperadores();
  }, []);

  const handleSearch1 = async () => {
    const codigoBusqueda = getValues('CodigoBusqueda1');

    if (!codigoBusqueda) {
      alert('Ingrese el código para buscar');
      return;
    }

    try {
      const response = await axios.get(`http://192.168.16.246:3003/api/Incidencia/${codigoBusqueda}`);
      const data = response.data;

      // Si la respuesta tiene datos válidos, actualiza solo los campos deseados
      if (data) {
        setValue('GeneralDeNovedades', data.GENERAL || '');
        setValue('TipoDeNovedades', data.TIPO || '');
        setValue('SubTipoNovedades', data.SUBTIPO || '');
        console.log(data)
      } else {
        alert('No se encontraron datos para el código proporcionado');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al buscar los datos',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d33',
        background: '#fff',
        color: '#333',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          confirmButton: 'swal-button',
        }
      });
    }
  };

  const handleAdd = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Agregar los datos del formulario al FormData
      formData.append('NombreSupervisor', data.NombreSupervisor);
      formData.append('NombreOperador', data.NombreOperador);
      formData.append('Turno', data.Turno);
      formData.append('Fecha', fechaNovedad);
      formData.append('GeneralDeNovedades', data.GeneralDeNovedades);
      formData.append('TipoDeNovedades', data.TipoDeNovedades);
      formData.append('SubTipoNovedades', data.SubTipoNovedades);
      formData.append('NumeroDeEstacion', data.NumeroDeEstacion);
      formData.append('DescripciondeNovedad', data.DescripciondeNovedad);
      formData.append('ubicacion_novedades', data.ubicacion_novedades);
      formData.append('hora_novedades', horaNovedad);
      formData.append('Estado', data.Estado);
      formData.append('UbiCamara', data.UbiCamara);
      formData.append('Lat', locationData.latitud);
      formData.append('Longitud', locationData.longitud);
      formData.append('Localizacion', locationData.localizacion);

      // Verificar que videoFile sea un archivo y agregarlo a FormData
      if (videoUrl) {
        formData.append('URLVIDEO', videoUrl);
      } else {
        console.warn("🚨 No se encontró la URL del video convertido.");
      }

      // Verificar que previewFoto sea un archivo y agregarlo a FormData
      if (previewFoto && previewFoto instanceof File) {
        formData.append('imagen', previewFoto); // Usar la foto previsualizada si es un archivo
      } else {
        console.error("🚨 previewFoto no es un archivo válido o está vacío.");
      }

      // Depuración: Mostrar los valores del FormData
      for (let pair of formData.entries()) {
        console.log(`🔹 ${pair[0]}:`, pair[1]);
      }

      // Enviar los datos al backend
      const response = await axios.post('http://192.168.16.246:3003/api/novedades-camara', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("✅ Respuesta del servidor:", response.data);

      // Si el servidor devuelve la URL del video, actualizarla
      if (response.data.videoUrl) {
        setVideoUrl(response.data.videoUrl);
      }

      //NOVEDAD AGREGADA
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Novedad agregada con éxito.',
        confirmButtonColor: '#28a745',
      });
      clearForm();  // Limpiar el formulario después de la respuesta exitosa
    } catch (error) {
      console.error("🚨 Error al agregar la novedad:", error);
      if (error.response) {
        console.error("📛 Respuesta del servidor:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewFoto(file);
      setValue('imagen', file);
    }
  };
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setProgress(0); // Restablecer progreso antes de cargar el nuevo video
      setVideoUrl(""); // Limpiar la URL anterior

      const formData = new FormData();
      formData.append('video', file);

      // Subir el video y actualizar la barra de progreso
      axios.post('http://192.168.16.246:3003/api/upload/video', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);  // Actualizar el progreso
        }
      })
        .then(response => {
          console.log('Respuesta del backend:', response.data);
          if (response.data.videoUrl) {
            setProgress(100);  // Asegúrate de que el progreso sea 100 antes de mostrar el enlace
            setVideoUrl(response.data.videoUrl);  // Guardar la URL del video subido
          } else {
            console.error('No se recibió la URL del video.');
          }
        })
        .catch(error => {
          console.error('Error al subir el video:', error);
          alert('Hubo un error al subir el video.');
        });
    } else {
      alert('Por favor selecciona un archivo de video.');
    }
  };

  //VIDEOS
  const openVideo = () => {
    if (videoUrl) {
      const videoExtension = videoUrl.split('.').pop().toLowerCase();
      const supportedFormats = ["mp4", "webm", "ogg"];

      if (supportedFormats.includes(videoExtension)) {
        const videoWindow = window.open(videoUrl, "_blank");

        if (videoWindow) {
          Swal.fire({
            icon: 'success',
            title: 'Video Abierto',
            text: 'El video se ha abierto correctamente.',
            confirmButtonColor: '#0e7c40',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo abrir la pestaña del video.',
            confirmButtonColor: '#d33',
          });
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Formato no compatible',
          text: `El formato de video ${videoExtension.toUpperCase()} no es compatible con Google Chrome.`,
          confirmButtonColor: '#f39c12',
        });
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Sin video',
        text: 'No hay video seleccionado.',
        confirmButtonColor: '#3498db',
      });
    }
  };

  const clearForm = () => {
    reset({
      NombreSupervisor: '',
      NombreOperador: '',
      Turno: '',
      Fecha: '',
      GeneralDeNovedades: '',
      TipoDeNovedades: '',
      SubTipoNovedades: '',
      NumeroDeEstacion: '',
      DescripciondeNovedad: '',
      imagen: '',
      ubicacion_novedades: '',
      hora_novedades: '',
      Estado: '',
      UbiCamara: '',
      LAT: '',
      LOG: '',
      LOCALIZACION: '',
    });

    setPreviewFoto('');
    setVideoUrl('');
    setVideoFile(null);
  };


  return (
    <div className="datanovcam">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 flex-1">
          Novedades de Cámaras
        </h2>
        <div className="text-sm" id='time'>
          {/* FechaHoraActual */}
          <FechaHoraActual onFechaHoraChange={handleFechaHoraChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre Supervisor */}
        <SelectSupervisor register={register} errors={errors} supervisores={supervisores} />

        {/* General de Novedades */}
        <GeneralDeNovedadesInput register={register} errors={errors} />

        {/* Nombre Operador */}
        <SelectOperador register={register} errors={errors} operadores={operadores} />

        {/* Tipo de Novedades */}
        <TipoDeNovedadesInput register={register} errors={errors} />
        {/* Turno */}
        <SelectTurno register={register} errors={errors} />
        {/* Subtipo de Novedades */}
        <SubTipoDeNovedadesInput register={register} errors={errors} />

        {/* Foto */}
        <CampoFoto
          handleFileChange={handleFileChange}
          previewFoto={previewFoto}
          errors={errors}
        />

        {/* Buscar por Código */}
        <div className="mb-6 flex flex-col gap-4">
          <BuscarPorCodigo
            label="Buscar por Código:"
            placeholder="Ingrese el código"
            onClick={handleSearch1}
            register={register}
            name="CodigoBusqueda1"
          />

          {/*Numero de Estacion: */}
          <SelectNumeroEstacion register={register} errors={errors} />
          {/*Ubicacion de la novedad: */}
          <div className="mb-6 ">
            <label className="block text-black text-lg font-medium mb-2">Ubicacion de la novedad:</label>
            <input
              type="text"
              {...register('ubicacion_novedades')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
              placeholder="Ingrese la ubicacion de la novedad"
            />
          </div>
          {/*Ubicacion de la Camara:*/}
          <SelectUbicacionCamara
            register={register}
            selectedLocation={selectedLocation}
            handleSelectChange={handleSelectChange}
          />
          <CamposGeolocalizacion locationData={locationData} register={register} />
          {/*Estado:*/}
          <SelectEstado register={register} errors={errors} />
          <div>
            <AutoResizeTextarea
              register={register} errors={errors}
            ></AutoResizeTextarea>
          </div>

          <CampoVideo
            videoUrl={videoUrl}
            handleFileSelect={handleFileSelect}
            openVideo={openVideo}
          />

          {/* Barra de Progreso */}
          {progress > 0 && progress < 100 && (
            <div className="mt-4 w-full bg-gray-200 rounded-lg">
              <div
                className="bg-green-500 h-2 rounded-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>



        {/* Rest of the form remains unchanged */}
      </div>

      <div className="flex justify-content-start mt-6 space-x-4">
        <button
          onClick={handleSubmit(handleAdd)}
          className={`px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md ${loading && 'opacity-50'}`}
        >
          {loading ? 'Agregando...' : 'Agregar Novedad'}
        </button>




        <button onClick={clearForm} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md">
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default FormularioNovedades;