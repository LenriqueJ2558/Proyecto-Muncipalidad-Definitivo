import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../css/agregarPersonal.css';
import FormInput from './FormInput';
import { useState } from 'react';

const AgregarDatosFamiliaresForm = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm();
  const [isFechaNaciCoyuEnabled, setIsFechaNaciCoyuEnabled] = useState(true);

  const onSubmit = async (data) => {
    try {
      // Convertir la fecha del cónyuge antes de enviarla al backend
      if (data.Fecha_Naci_Coyu) {
        // Verificar si la fecha es válida
        const date = new Date(data.Fecha_Naci_Coyu);
        if (isNaN(date.getTime())) {
          // Si la fecha no es válida, establecerla como null
          data.Fecha_Naci_Coyu = null;
        }
      } else {
        // Si no hay fecha proporcionada, establecerla como null
        data.Fecha_Naci_Coyu = null;
      }
  
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.16.246:3003/api/InfoEmpleado',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        alert('Datos familiares agregados exitosamente');
        reset(); // Limpiar el formulario después de agregar
      } else {
        alert(`Hubo un problema al agregar los datos familiares: ${response.status}`);
      }
    } catch (error) {
      alert(`Error al agregar datos familiares: ${error.response?.data?.msg || error.message}`);
      console.log(error.response?.data);
    }
  };

  const onBuscar = async () => {
    const { empleado_Dni } = getValues();
    if (!empleado_Dni) {
      alert('Por favor, ingrese un DNI para buscar.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://192.168.16.246:3003/api/InfoEmpleado/${empleado_Dni}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200 && response.data.infoEmpleado) {
        const infoEmpleado = response.data.infoEmpleado;
        // Rellenar los valores del formulario con la respuesta de la API
        Object.keys(infoEmpleado).forEach((key) => setValue(key, infoEmpleado[key]));
      } else {
        alert('No se encontraron datos para este DNI.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('No se encontró un registro con ese DNI.');
      } else {
        alert(`Error al buscar datos: ${error.response?.data?.msg || error.message}`);
      }
    }
  };

  const onActualizar = async () => {
    const { empleado_Dni, ...data } = getValues();
    if (!empleado_Dni) {
      alert('Por favor, ingrese un DNI para actualizar.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://192.168.16.246:3003/api/InfoEmpleado/${empleado_Dni}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Datos actualizados exitosamente');
      } else {
        alert(`Hubo un problema al actualizar los datos: ${response.status}`);
      }
    } catch (error) {
      alert(`Error al actualizar datos: ${error.response?.data?.msg || error.message}`);
    }
  };

  const onLimpiar = () => {
    reset(); // Limpiar todos los campos del formulario
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container py-5">
      <div className="row">
        <h2 className="text-center mb-4">Agregar Datos Familiares</h2>
        
        <FormInput
          id="empleado_Dni"
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
        />

        <FormInput
          id="Ape_Nom_Papa"
          label="Nombre y Apellido del Padre"
          register={register}
          errors={errors}
          validation={{ required: 'Este campo es obligatorio' }}
        />

        <FormInput
          id="Ape_Nom_Mama"
          label="Nombre y Apellido de la Madre"
          register={register}
          errors={errors}
          validation={{ required: 'Este campo es obligatorio' }}
        />

        <FormInput
          id="Ape_Nom_Conyu"
          label="Nombre y Apellido del Cónyuge"
          register={register}
          errors={errors}
        />

        {/* Campo para Fecha de Nacimiento del Cónyuge */}
        <div className="col-md-6 mb-3">
          <label className='form-label' htmlFor="Fecha_Naci_Coyu">Fecha de Nacimiento del Cónyuge</label>
          <div className="input-group">
            <input
              id="Fecha_Naci_Coyu"
              type="date"
              className="form-control"
              disabled={!isFechaNaciCoyuEnabled}
              {...register("Fecha_Naci_Coyu")}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <input
                  type="checkbox"
                  checked={isFechaNaciCoyuEnabled}
                  onChange={() => setIsFechaNaciCoyuEnabled(!isFechaNaciCoyuEnabled)}
                />
              </div>
            </div>
          </div>
        </div>

        <FormInput
          id="Nomb_Hijo1"
          label="Nombre del Hijo 1"
          register={register}
          errors={errors}
        />

        <FormInput
          id="Nomb_Hijo2"
          label="Nombre del Hijo 2"
          register={register}
          errors={errors}
        />

        <FormInput
          id="Nomb_Hijo3"
          label="Nombre del Hijo 3"
          register={register}
          errors={errors}
        />

        <FormInput
          id="Nomb_Hijo4"
          label="Nombre del Hijo 4"
          register={register}
          errors={errors}
        />

        <div className="text-center">
          <button type="button" className="btn btn-secondary me-2" onClick={onLimpiar}>Limpiar</button>
          <button type="button" className="btn btn-primary me-2" onClick={onBuscar}>Buscar</button>
          <button type="submit" className="btn btn-success me-2">Agregar</button>
          <button type="button" className="btn btn-warning me-2" onClick={onActualizar}>Actualizar</button>
        </div>
      </div>
    </form>
  );
};

export default AgregarDatosFamiliaresForm;