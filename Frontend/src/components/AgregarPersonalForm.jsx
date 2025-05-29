import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../css/agregarPersonal.css';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import ImagePreview from './ImagePreview';
import Swal from 'sweetalert2';

const AgregarPersonalForm = () => {
  const { register, handleSubmit, setValue, formState: { errors }, reset, watch, getValues } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [dniToUpdate, setDniToUpdate] = useState('');

  // Observa el valor del campo DNI
  const dniInput = watch('Dni');

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] && key !== 'image') {
          formData.append(key, data[key]);
        }
      });

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const response = await axios.post(
        'http://192.168.16.246:3003/api/empleado',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        alert('Empleado agregado exitosamente');
        reset(); // Limpiar el formulario después de agregar
        setImagePreview(null); // Limpiar la vista previa de la imagen
      } else {
        alert(`Hubo un problema al agregar el empleado: ${response.status}`);
      }
    } catch (error) {
      alert(`Error al agregar empleado: ${error.response?.data?.msg || error.message}`);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleUpdate = async () => {
    const dni = dniInput;
    if (!dni) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'Por favor, ingresa un DNI para actualizar.',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      const formValues = getValues();

      // Agregar datos del formulario al FormData
      Object.keys(formValues).forEach(key => {
        if (formValues[key] && key !== 'image') {
          formData.append(key, formValues[key]);
        }
      });

      if (formValues.image && formValues.image[0]) {
        formData.append('image', formValues.image[0]);
      }

      const response = await axios.put(
        `http://192.168.16.246:3003/api/empleado/${dni}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        alert('Empleado actualizado exitosamente');
        reset(); // Limpiar el formulario después de actualizar
        setImagePreview(null); // Limpiar la vista previa de la imagen
      } else {
        alert(`Hubo un problema al actualizar el empleado: ${response.status}`);
      }
    } catch (error) {
      alert(`Error al actualizar empleado: ${error.response?.data?.msg || error.message}`);
    }
  };

  const handleSearch = async () => {
    const dni = dniInput;
    if (!dni) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'Por favor, ingresa un DNI para buscar.',
      });
      return;
    }

    try {
      const response = await axios.get(`http://192.168.16.246:3003/api/empleado/${dni}`);
      const data = response.data;

      // Prellenar los campos del formulario con los datos obtenidos
      setValue('Dni', data.Dni || '');
      setValue('Nombre_Empleado', data.Nombre_Empleado || '');
      setValue('Apellido_Empleado', data.Apellido_Empleado || '');
      setValue('Sexo', data.Sexo || '');
      setValue('Telefono_Empleado', data.Telefono_Empleado || '');
      setValue('Edad', data.Edad || '');
      setValue('Fecha_Nacimiento', data.Fecha_Nacimiento || '');
      setValue('Direccion', data.Direccion || '');
      setValue('Correo_Electronico', data.Correo_Electronico || '');
      setValue('Lugar_de_Nacimiento', data.Lugar_de_Nacimiento || '');
      setValue('Tipo_Sangre', data.Tipo_Sangre || '');
      setValue('Estado_Civil', data.Estado_Civil || '');

      // Configura la vista previa de la imagen si existe
      if (data.Foto) {
        setImagePreview(`http://192.168.16.246:3003/ProyectoMuni/App${data.Foto}`); // Construir la URL completa de la imagen
      } else {
        setImagePreview(null);
      }
    } catch (error) {
      alert(`Error al buscar empleado: ${error.response?.data?.msg || error.message}`);
    }
  };

  const handleClear = () => {
    reset(); // Limpiar el formulario
    setImagePreview(null); // Limpiar la vista previa de la imagen
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id='containerAddPerson' className="container py-5">
      <div className="row">
        <h2 className="text-center mb-4 form-label ">Agregar Empleado</h2>
        <FormInput
          id="Dni"
          label="DNI"
          register={register}
          errors={errors}
          validation={{
            required: 'El DNI es obligatorio',
            pattern: {
              value: /^[0-9]{8}$/,
              message: 'El DNI debe ser un número de 8 dígitos'
            }
          }}
          onChange={(e) => setDniToUpdate(e.target.value)} // Capturar el DNI para búsqueda y actualización
        />

        <ImagePreview imagePreview={imagePreview} register={register} handleFileChange={handleFileChange} />
        <FormInput id="Nombre_Empleado" label="Nombre" register={register} errors={errors} validation={{ required: 'El nombre es obligatorio' }} />
        <FormInput id="Apellido_Empleado" label="Apellido" register={register} errors={errors} validation={{ required: 'El apellido es obligatorio' }} />
        <FormSelect id="Sexo" label="Sexo" register={register} errors={errors} validation={{ required: 'Selecciona el sexo' }} options={[
          { value: 'MASCULINO', label: 'MASCULINO' },
          { value: 'FEMENINO', label: 'FEMENINO' },
        ]} />
        <FormInput id="Telefono_Empleado" label="Teléfono" register={register} errors={errors} validation={{ required: 'El teléfono es obligatorio' }} />
        <FormInput id="Edad" label="Edad" register={register} errors={errors} validation={{ required: 'La edad es obligatoria' }} />
        <FormInput id="Fecha_Nacimiento" label="Fecha de Nacimiento" type="date" register={register} errors={errors} validation={{ required: 'La fecha de nacimiento es obligatoria' }} />
        <FormInput id="Direccion" label="Dirección" register={register} errors={errors} validation={{ required: 'La dirección es obligatoria' }} />
        <FormInput id="Correo_Electronico" label="Correo Electrónico" type="email" register={register} errors={errors} validation={{ required: 'El correo electrónico es obligatorio' }} />
        <FormInput id="Lugar_de_Nacimiento" label="Lugar de Nacimiento" register={register} errors={errors} validation={{ required: 'El lugar de nacimiento es obligatorio' }} />
        <FormSelect id="Tipo_Sangre" label="Tipo de Sangre" register={register} errors={errors} validation={{ required: 'Selecciona el tipo de sangre' }} options={[
          { value: 'A+', label: 'A+' },
          { value: 'A-', label: 'A-' },
          { value: 'B+', label: 'B+' },
          { value: 'B-', label: 'B-' },
          { value: 'O+', label: 'O+' },
          { value: 'O-', label: 'O-' },
          { value: 'AB+', label: 'AB+' },
          { value: 'AB-', label: 'AB-' },
        ]} />
        <FormSelect id="Estado_Civil" label="Estado Civil" register={register} errors={errors} validation={{ required: 'Selecciona el estado civil' }} options={[
          { value: 'SOLTERO (A)', label: 'SOLTERO (A)' },
          { value: 'CASADO (A)', label: 'CASADO (A)' },
          { value: 'DIVORCIADO (A)', label: 'DIVORCIADO (A)' },
          { value: 'VIUDO (A)', label: 'VIUDO (A)' },
          { value: 'CONVIVIENTE', label: 'CONVIVIENTE' },
        ]} />
        <div className="text-center">
          <button type="submit" className="btn btn-success me-2">Agregar</button>
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={handleSearch} // Buscar empleado
          >
            Buscar
          </button>
          <button
            type="button"
            className="btn btn-warning me-2"
            onClick={handleUpdate} // Actualizar empleado
          >
            Actualizar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear} // Limpiar formulario
          >
            Limpiar
          </button>
        </div>

      </div>
    </form>
  );
};

export default AgregarPersonalForm;