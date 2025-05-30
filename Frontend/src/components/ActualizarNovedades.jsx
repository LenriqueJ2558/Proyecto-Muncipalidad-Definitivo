import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import GeneralDeNovedadesInput from './componentsCamara/GeneralDeNovedadesInput';
import TipoDeNovedadesInput from './componentsCamara/TipoDeNovedadesInput';
import SubTipoDeNovedadesInput from './componentsCamara/SubTipoDeNovedadesInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SelectSupervisor from './componentsCamara/SelectSupervisor';
import SelectOperador from './componentsCamara/SelectOperador';
import SelectTurno from './componentsCamara/SelectTurno';
import SelectEstado from './componentsCamara/SelectEstado';
import CamposGeolocalizacion from './componentsCamara/CamposGeolocalizacion';
import SelectUbicacionCamara from './componentsCamara/SelectUbicacionCamara';
import '../css/updateNovedad.css';

const ActualizarNovedades = () => {
    const { id } = useParams(); // ← ID desde la URL

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        getValues,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [supervisores, setSupervisores] = useState([]);
    const [operadores, setOperadores] = useState([]);
    const [previewFoto, setPreviewFoto] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [previewVideoUrl, setPreviewVideoUrl] = useState(null);
    const [locationData, setLocationData] = useState({
        longitud: '',
        latitud: '',
        localizacion: ''
    });


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
            setValue('Lat', data.LAT || '');
            setValue('Longitud', data.LOG || '');
            setValue('Localizacion', data.LOCALIZACION || '');

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
    // Cargar datos al entrar
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.168.16.246:3003/api/novedades-camara/${id}`);
                const data = response.data;

                if (data) {
                    setValue('idNovedades', data._id || '');

                    setValue('GeneralDeNovedades', data.GeneralDeNovedades || '');
                    setValue('TipoDeNovedades', data.TipoDeNovedades || '');
                    setValue('SubTipoNovedades', data.SubTipoNovedades || '');
                    setValue('NombreSupervisor', data.NombreSupervisor || '');
                    setValue('NombreOperador', data.NombreOperador || '');
                    setValue('Turno', data.Turno || '');
                    setValue('NumeroDeEstacion', data.NumeroDeEstacion || '');
                    setValue('DescripciondeNovedad', data.DescripciondeNovedad || '');
                    setValue('ubicacion_novedades', data.ubicacion_novedades || '');
                    setValue('Estado', data.Estado || '');
                    setSelectedLocation(data.UbiCamara || ''); // actualiza el <select>
                    setLocationData({
                        latitud: data.Lat || '',
                        longitud: data.Longitud || '',
                        localizacion: data.Localizacion || '',
                    });
                    setValue('UbiCamara', data.UbiCamara || '');
                    setValue('Lat', data.Lat || '');
                    setValue('Longitud', data.Longitud || '');
                    setValue('Localizacion', data.Localizacion || '');


                    setPreviewFoto(data.Foto ? `http://192.168.16.246:3003/api${data.Foto}` : null);
                    setPreviewVideoUrl(data.UrlVideo || null);
                } else {
                    Swal.fire('No se encontró la novedad', '', 'warning');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error al obtener la novedad', '', 'error');
            }
        };

        fetchData();
    }, [id, setValue]);
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


    const handleUpdate = async (data) => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('NombreSupervisor', data.NombreSupervisor);
            formData.append('NombreOperador', data.NombreOperador);
            formData.append('Turno', data.Turno);
            formData.append('GeneralDeNovedades', data.GeneralDeNovedades);
            formData.append('TipoDeNovedades', data.TipoDeNovedades);
            formData.append('SubTipoNovedades', data.SubTipoNovedades);
            formData.append('NumeroDeEstacion', data.NumeroDeEstacion);
            formData.append('DescripciondeNovedad', data.DescripciondeNovedad);
            formData.append('ubicacion_novedades', data.ubicacion_novedades);
            formData.append('Estado', data.Estado);
            formData.append('UbiCamara', data.UbiCamara);

            if (videoFile) formData.append('video', videoFile);
            if (previewFoto instanceof File) formData.append('imagen', previewFoto);

            await axios.put(
                `http://192.168.16.246:3003/api/novedades-camara/${id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            Swal.fire('Éxito', 'Novedad actualizada correctamente', 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo actualizar la novedad', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith('image/')) {
            Swal.fire('Archivo inválido', 'Selecciona una imagen válida', 'error');
            return;
        }
        setPreviewFoto(file);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith('video/')) {
            Swal.fire('Archivo inválido', 'Selecciona un video válido', 'error');
            return;
        }
        setVideoFile(file);
    };

    return (
        <div className="centrar-contenido">
            <div className="center-content">
                <div className="p-4" id='update-novedades'>
                    <h2 className="title">Actualizar Novedad de Cámara</h2>

                    <form onSubmit={handleSubmit(handleUpdate)}>

                        {/* General de Novedades */}
                        <GeneralDeNovedadesInput register={register} errors={errors} />

                        {/* Tipo de Novedades */}
                        <TipoDeNovedadesInput register={register} errors={errors} />

                        {/* Subtipo de Novedades */}
                        <SubTipoDeNovedadesInput register={register} errors={errors} />
                        {/* Buscar por Código */}
                        <div className="mb-6 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <label className="block text-gray-700 font-semibold mb-0.5">Buscar por Código:</label>
                                <input
                                    type="text"
                                    {...register('CodigoBusqueda1')}
                                    className="codigo-btn"
                                    placeholder="Ingrese el código"
                                />
                                <button
                                    type="button"
                                    onClick={handleSearch1}
                                    className="search-btn"
                                >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className='search-novedad' /> Buscar
                                </button>
                            </div>
                        </div>

                        {/* Nombre Supervisor */}
                        <SelectSupervisor register={register} errors={errors} supervisores={supervisores} />

                        {/* Nombre Operador */}
                        <SelectOperador register={register} errors={errors} operadores={operadores} />

                        <SelectTurno register={register} errors={errors} />

                        <label>Número de Estación:</label>
                        <input {...register('NumeroDeEstacion')} className="num-estacion" />

                        <label className='des-novedad'>Descripción de Novedad:</label>
                        <textarea {...register('DescripciondeNovedad')} className="text-area-content" />

                        <label>Ubicación de Novedades:</label>
                        <input {...register('ubicacion_novedades')} className="ubicacion-novedad" />
                        
                        <SelectEstado register={register} errors={errors} />

                        <SelectUbicacionCamara
                            register={register}
                            selectedLocation={selectedLocation}
                            handleSelectChange={handleSelectChange}
                        />
                        <CamposGeolocalizacion locationData={locationData} register={register} />

                        <label>Foto (opcional):</label>
                        <input type="file" accept="image/*" onChange={handleFotoChange} className="mb-2" id='file-image-input'/>
                        {previewFoto && (
                            <img
                                src={previewFoto instanceof File ? URL.createObjectURL(previewFoto) : previewFoto}
                                alt="Vista previa"
                                className="mb-4 w-55"
                            />
                        )}

                        <label>Video (opcional):</label>
                        <input type="file" accept="video/*" onChange={handleVideoChange} className="mb-2" id='file-video-input'/>
                        {previewVideoUrl && !videoFile && (
                            <video controls className="mb-4 w-full max-w-md">
                                <source src={previewVideoUrl} type="video/mp4" />
                                Tu navegador no soporta la reproducción de videos.
                            </video>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white px-4 py-2 rounded w-full"
                        >
                            {loading ? 'Actualizando...' : 'Actualizar Novedad'}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setPreviewFoto(null);
                                setVideoFile(null);
                                setFechaNovedad('');
                                setHoraNovedad('');
                            }}
                            className="delete-data-novedad"
                        >
                            Limpiar Formulario
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ActualizarNovedades;