import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import GeneralDeNovedadesSelect from './GeneralDeNovedadesSelect';
import TipoDeIncidenciasSelect from './TipoDeNovedadesSelect';
import SubTipoDeNovedadesSelect from './SubTipoDeNovedadesSelect';
import FechaHoraActual from './FechaHoraActual';
import AutoResizeTextarea from './textarea';
import "../css/fecha-hora.css"

const FormularioNovedades = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
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
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
    setUploadProgress(0); // Reiniciar progreso al seleccionar un nuevo archivo
};
const handleUpload = async () => {
  if (!video) return;

  const formData = new FormData();
  formData.append("video", video);

  try {
      const response = await axios.post("http://192.168.16.246:3003/api/novedades-camara", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
          },
      });

      setVideoURL(response.data.videoUrl); // Guardar la URL del video subido
  } catch (error) {
      console.error("Error al subir el video", error);
  }
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
    setSelectedLocation(newSelectedLocation);  // Actualizamos primero el estado del select
  };
  console.log(handleSelectChange)

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
        console.log (data)
      } else {
        alert('No se encontraron datos para el código proporcionado');
      }
    } catch (error) {
      alert('Error al buscar los datos');
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
      if (videoFile && videoFile instanceof File) {
        formData.append('video', videoFile); // Asegurarse de que sea un archivo
      } else {
        console.error("🚨 videoFile no es un archivo válido o está vacío.");
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
  
      alert('Novedad agregada con éxito');
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
  const handleUpdate = async (data) => {
    if (!getValues('Id')) {
      alert('Ingrese el ID para actualizar');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('NombreSupervisor', data.NombreSupervisor);
      formData.append('NombreOperador', data.NombreOperador);
      formData.append('Turno', data.Turno);
      formData.append('Fecha', data.Fecha);
      formData.append('GeneralDeNovedades', data.GeneralDeNovedades);
      formData.append('TipoDeNovedades', data.TipoDeNovedades);
      formData.append('SubTipoNovedades', data.SubTipoNovedades);
      formData.append('NumeroDeEstacion', data.NumeroDeEstacion);
      formData.append('DescripciondeNovedad', data.DescripciondeNovedad);
      formData.append('ubicacion_novedades', data.ubicacion_novedades);
      formData.append('hora_novedades', data.hora_novedades);
      formData.append('Estado', data.Estado);
      formData.append('UbiCamara', data.UbiCamara);
      formData.append('Lat', data.LAT);
      formData.append('Log', data.LOG);
      formData.append('Localizacion', data.LOCALIZACION);

      if (videoFile) {
        formData.append('video', videoFile);
      }

      if (previewFoto) {
        formData.append('imagen', previewFoto);
      }

      await axios.put(`http://192.168.16.246:3003/api/novedades-camara/${getValues('Id')}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Novedad actualizada con éxito');
      clearForm();
    } catch (error) {
      alert('Error al actualizar la novedad');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!getValues('Id')) {
      alert('Ingrese el ID para buscar');
      return;
    }
    try {
      const response = await axios.get(`http://192.168.16.246:3003/api/novedades-camara/${getValues('Id')}`);
      const data = response.data;
      Object.keys(data).forEach(key => setValue(key, data[key] || ''));
      setPreviewFoto(data.Foto || '');
      setVideoUrl(data.videoUrl || '');
    } catch (error) {
      alert('No se encontraron datos para el ID proporcionado');
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewFoto(URL.createObjectURL(file));
      setValue('imagen', file);
    }
  };
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
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
  
  const openVideo = () => {
    if (videoUrl) {
      // Obtener la extensión del archivo
      const videoExtension = videoUrl.split('.').pop().toLowerCase();
  
      // Formatos soportados
      const supportedFormats = ["mp4", "webm", "ogg"];
  
      if (supportedFormats.includes(videoExtension)) {
        // Intentar abrir en una nueva pestaña
        const videoWindow = window.open(videoUrl, "_blank");
  
        if (videoWindow) {
          alert("El video se ha abierto correctamente.");
        } else {
          alert("No se pudo abrir la pestaña del video.");
        }
      } else {
        alert(`El formato de video ${videoExtension.toUpperCase()} no es compatible con Google Chrome.`);
      }
    } else {
      alert("No hay video seleccionado.");
    }
  };
  
  

  const clearForm = () => {
    setValue('NombreSupervisor', '');
    setValue('NombreOperador', '');
    setValue('Turno', '');
    setValue('Fecha', '');
    setValue('GeneralDeNovedades', '');
    setValue('TipoDeNovedades', '');
    setValue('SubTipoNovedades', '');
    setValue('NumeroDeEstacion', '');
    setValue('DescripciondeNovedad', '');
    setValue('imagen', '');
    setValue('Url', '');
    setValue('ubicacion_novedades', '');
    setValue('hora_novedades', '');
    setValue('Estado', '');
    setValue('UbiCamara', '');
    setValue('LAT', '');
    setValue('LOG', '');
    setValue('LOCALIZACION', '');
    setPreviewFoto('');
    setVideoUrl('');
    setVideoFile(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-md rounded">
      
      <div className="flex justify-between items-center mb-4">
  <h2 className="text-3xl font-bold text-center text-gray-800 flex-1">
    Novedades de Cámaras
  </h2>
  {/*FECHA Y HORA*/}
  <div className="text-sm text-gray-600" id='fecha-hora'>
    <FechaHoraActual onFechaHoraChange={handleFechaHoraChange} />
  </div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre Supervisor */}
        <div className="mb-6">
  <label className="block text-black text-lg font-medium mb-2">Nombre del Supervisor:</label>
  <select
    {...register('NombreSupervisor', { required: 'Este campo es obligatorio' })}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
  >
    <option value="">Seleccione un Supervisor</option>
    {supervisores.length > 0 ? (
      supervisores.map((supervisor) => (
        <option key={supervisor.Id} value={supervisor.empleado.NombreCompleto}>
          {supervisor.empleado.NombreCompleto || 'Nombre no disponible'}
        </option>
      ))
    ) : (
      <option value="">No hay operadores disponibles</option>
    )}
  </select>
  {errors.NombreSupervisor && <p className="text-red-500 text-sm mt-2">{errors.NombreSupervisor.message}</p>}
</div>

             {/* General de Novedades */}
             <GeneralDeNovedadesSelect register={register} errors={errors} />

        {/* Nombre Operador */}
        <div className="mb-6">
  <label className="block text-black text-lg font-medium mb-2">Nombre del Operador:</label>
  <select
    {...register('NombreOperador', { required: 'Este campo es obligatorio' })}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
  >
    <option value="">Seleccione un Operador</option>
    {operadores.length > 0 ? (
      operadores.map((operador) => (
        <option key={operador.Id} value={operador.empleado.NombreCompleto}>
          {operador.empleado.NombreCompleto || 'Nombre no disponible'}
        </option>
      ))
    ) : (
      <option value="">No hay operadores disponibles</option>
    )}
  </select>
  {errors.NombreOperador && <p className="text-red-500 text-sm mt-2">{errors.NombreOperador.message}</p>}
</div>
        
              {/* Tipo de Novedades */}
             <TipoDeIncidenciasSelect register={register} errors={errors} />
             {/* Turno */}
        <div className="mb-6">
          <label className="block text-black text-lg font-medium mb-2">Turno:</label>
          <select
            {...register('Turno', { required: 'Este campo es obligatorio' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
          >
            <option value="">Seleccione un Turno</option>
            <option value="Día">Día</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
          {errors.Turno && <p className="text-red-500 text-sm mt-2">{errors.Turno.message}</p>}
        </div>

        {/* Subtipo de Novedades */}
        <SubTipoDeNovedadesSelect register={register} errors={errors} />

         {/* Foto */}
         <div className="mb-6 flex flex-col gap-4">
         <div className="mb-6">
          <label className="block text-black text-lg font-medium mb-2">Foto:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
          />
           <div className="w-90 h-90 border border-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
    {previewFoto ? (
      <img src={previewFoto} alt="Vista previa" className="object-cover w-full h-full" />
    ) : (
      <span className="text-gray-400">Sin imagen</span>
    )}
  </div>
          {errors.Foto && <p className="text-red-500">{errors.Foto.message}</p>}
        </div>  
        <div className="flex items-baseline gap-4">
          <label className="block text-black text-lg font-medium mb-2">Buscar por Código:</label>
          <input
            type="text"
            {...register('imagen')}
            className="w-25 px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ingrese el código"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md"
          >
            Buscar Novedad
          </button>
        </div>
        </div>

        {/* Buscar por Código */}
        <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-baseline gap-4">
          <label className="block text-gray-700 font-semibold mb-0.5">Buscar por Código:</label>
          <input
            type="text"
            {...register('CodigoBusqueda1')}
            className="w-25 px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ingrese el código"
          />
          <button
            onClick={handleSearch1}
            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md"
          >
            Buscar
          </button>
        </div>

        {/* Estado */}
        <div className="mb-6">
          <label className="block text-black text-lg font-medium mb-2">Numero de Estacion:</label>
          <select
            {...register('NumeroDeEstacion')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
          >
            <option value="">Seleccione una Estacion</option>
            <option value="PC1">PC1</option>
            <option value="PC2">PC2</option>
            <option value="PC3">PC3</option>
            <option value="PC4">PC4</option>
            <option value="PC5">PC5</option>
            <option value="QUIRIO">QUIRIO</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-black text-lg font-medium mb-2">Ubicacion de la novedad:</label>
          <input
            type="text"
            {...register('ubicacion_novedades')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
            placeholder="Ingrese la ubicacion de la novedad"
          />
          </div>
          <div className="flex flex-col">
      <label className="block text-black text-lg font-medium mb-2">Ubicacion de la Camara:</label>
      <select
        {...register('UbiCamara')}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
        value={selectedLocation} 
        onChange={handleSelectChange}
      >
            <option value="">Seleccione una ubicacion de la camara</option>
            <option value="RAYOS DEL SOL">RAYOS DEL SOL</option>
            <option value="INICIAL PILOTO">INICIAL PILOTO</option>
            <option value="COLEGIO JOSEFA CARRILLO">COLEGIO JOSEFA CARRILLO</option>
            <option value="CARRETERA CENTRAL  - COLEGIO CUZCO">CARRETERA CENTRAL  - COLEGIO CUZCO</option>
            <option value="PARQUE COOPERATIVA PABLO PATRON">PARQUE COOPERATIVA PABLO PATRON</option>
            <option value="BOLIVIA (LAS PARRITAS)">BOLIVIA (LAS PARRITAS)</option>
            <option value="SAN JUAN DE BELLAVISTA - ROSARIO">SAN JUAN DE BELLAVISTA - ROSARIO</option>
            <option value="LIBERTAD - TRUJILLO SUR">LIBERTAD - TRUJILLO SUR</option>
            <option value="LIBERTAD - CARRETERA CENTRAL">LIBERTAD - CARRETERA CENTRAL</option>
            <option value="AREQUIPA - TRUJILLO SUR">AREQUIPA - TRUJILLO SUR</option>
            <option value="PTE CENTENARIO - AREQUIPA">PTE CENTENARIO - AREQUIPA</option>
            <option value="CHILE GUZMAN Y VALLE (SHIAPO)">CHILE GUZMAN Y VALLE (SHIAPO)</option>
            <option value="AREQUIPA - CARRETERA CENTRAL">AREQUIPA - CARRETERA CENTRAL</option>
            <option value="ARICA - CARRETERA CENTRAL">ARICA - CARRETERA CENTRAL</option>
            <option value="ARICA - 28 DE JULIO">ARICA - 28 DE JULIO</option>
            <option value="CALLAO  - CARRETERA CENTRAL">CALLAO  - CARRETERA CENTRAL</option>
            <option value="COLOMBIA -TUPAC  AMARU(COE)">COLOMBIA -TUPAC  AMARU(COE)</option>
            <option value="SALAVERRY - CARRETERA CENTRAL">SALAVERRY - CARRETERA CENTRAL</option>
            <option value="CHICLAYO - CARRETERA CENTRAL">CHICLAYO - CARRETERA CENTRAL</option>
            <option value="SAN JOSE - CRISTO BLANCO">SAN JOSE - CRISTO BLANCO</option>
            <option value="CHICLAYO - TRUJILLO SUR">CHICLAYO - TRUJILLO SUR</option>
            <option value="TACNA - CARRETERA CENTRAL">TACNA - CARRETERA CENTRAL</option>
            <option value="AV 28 DE JULIO - IQUITOS">AV 28 DE JULIO - IQUITOS</option>
            <option value="INGRESO AL ESTADIO">INGRESO AL ESTADIO</option>
            <option value="PIROXENITAS - SAN JOSE">PIROXENITAS - SAN JOSE</option>
            <option value="TUPAC AMARU - LOS ALAMOS (COE ATRAS)">TUPAC AMARU - LOS ALAMOS (COE ATRAS)</option>
            <option value="7 DE JUNIO - EL CARMEN (PEDREGAL)">7 DE JUNIO - EL CARMEN (PEDREGAL)</option>
            <option value="ING. VEGA - GUZMAN Y VALLE (RIMAC)">ING. VEGA - GUZMAN Y VALLE (RIMAC)</option>
            <option value="ESCALERA A PEDREGAL">ESCALERA A PEDREGAL</option>
            <option value="LA RIBERA">LA RIBERA</option>
            <option value="PASAJE NAVIDAD - 20 DE MAYO">PASAJE NAVIDAD - 20 DE MAYO</option>
            <option value="TARAZONA  - CARRETERA CENTRAL">TARAZONA  - CARRETERA CENTRAL</option>
            <option value="SANTA MARIA  CARRETERA CENTRAL">SANTA MARIA  CARRETERA CENTRAL</option>
            <option value="SEGURO PARQUE MEDICINA">SEGURO PARQUE MEDICINA</option>
            <option value="4 ZONA (PASANDO EL HUAYCO)">4 ZONA (PASANDO EL HUAYCO)</option>
            <option value="CASETA 3 COLEGIO SALAZAR BONDY">CASETA 3 COLEGIO SALAZAR BONDY</option>
            <option value="CASUARINAS PTZ (ENTRADA DEL CANAL)">CASUARINAS PTZ (ENTRADA DEL CANAL)</option>
            <option value="LOCAL COMUNAL(PARQUE QUIRIO)">LOCAL COMUNAL(PARQUE QUIRIO)</option>
            <option value="POSTA ZONA 2 SIMON BOLIVAR COLEGIO NP">POSTA ZONA 2 SIMON BOLIVAR COLEGIO NP</option>
            <option value="PROLONGACION LOS HEROES (PRIME GYM)">PROLONGACION LOS HEROES (PRIME GYM)</option>
            <option value="SIERRA LIMEÑA FIJA">SIERRA LIMEÑA FIJA</option>
            <option value="TARAZONA CANAL PTZ">TARAZONA CANAL PTZ</option>
          </select>
        </div>
        <div className="mb-6">
  <label className="block text-black text-lg font-medium mb-2">Longitud:</label>
  <input
    type="text"
    value={locationData.longitud} // Aquí se debería mostrar el valor de `longitud`
    {...register('Longitud')}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
    placeholder="Longitud"
    disabled
  />
</div>
<div className="mb-6">
  <label className="block text-black text-lg font-medium mb-2 ">Latitud:</label>
  <input
    type="text"
    value={locationData.latitud} // Aquí se debería mostrar el valor de `latitud`
    {...register('Lat')}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
    placeholder="Latitud"
    disabled
  />
</div>
<div className="mb-6">
  <label className="block text-black text-lg font-medium mb-2">Localización:</label>
  <input
    type="text"
    value={locationData.localizacion} // Aquí se debería mostrar el valor de `localizacion`
    {...register('Localizacion')}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
    placeholder="Ingrese la ubicación de la novedad"
    disabled
  />
</div>
        <div className="mb-6">
          <label className="block text-black text-lg font-medium mb-2">Estado:</label>
          <select
            {...register('Estado')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
          >
            <option value="">Seleccione un Estado</option>
            <option value="ATENTIDO">ATENTIDO</option>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="EN PROCESO">EN PROCESO</option>
            <option value="FALSA ALARMA">FALSA ALARMA</option>
          </select>
        </div>
        <div>
          <AutoResizeTextarea
           register={register} errors={errors}
          ></AutoResizeTextarea>
        </div>
        

        <div>
        <textarea
    
    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
   
    placeholder="Url"
    value={videoUrl || ''}
    disabled
  />
      </div>
      <div className="flex justify-content-start mt-6 space-x-16">
        <input
          type="file"
          name="video"
          accept="video/*"
          className="hidden"
          id="fileInput"
          onChange={handleFileSelect}
        />
        <button
          onClick={() => document.getElementById('fileInput').click()}
          className="px-2 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md"
        >
          Seleccionador
        </button>
        <button
          type="button"
          onClick={openVideo}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md"
        >
          Abrir
        </button>
      </div> 
      {/* Barra de Progreso */}
{progress > 0 && progress < 100 && (
  <div className="mt-4 w-full bg-gray-200 rounded-lg">
    <div
      className="bg-green-500 h-2 rounded-lg"
      style={{ width: `${progress}%` }}
    />
  </div>
)}

{/* Mensaje cuando la carga está completa */}
{progress === 100 && videoUrl && (
  <div className="mt-4 text-green-500">
    <p>Video subido con éxito. Puedes verlo <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">aquí</a>.</p>
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


        <button
          onClick={handleSubmit(handleUpdate)}
          className={`px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md ${loading && 'opacity-50'}`}
        >
          {loading ? 'Actualizando...' : 'Actualizar Novedad'}
        </button>
        
        <button onClick={clearForm} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md">
          Limpiar
        </button> 
        
      </div>
    </div>
  );
};

export default FormularioNovedades;