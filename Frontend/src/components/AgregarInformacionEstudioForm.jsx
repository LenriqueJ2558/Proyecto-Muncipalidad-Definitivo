import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../css/agregarPersonal.css';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const AgregarInformacionEstudioForm = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm();
  const [isFechaRevaliAEnabled, setIsFechaRevaliAEnabled] = useState(false);
  const [isFechaRevaliBEnabled, setIsFechaRevaliBEnabled] = useState(false);

  const onSubmit = async (data) => {
    if (!isFechaRevaliAEnabled) {
      data.Fech_Revali_A = ''; // Enviar vacío si no está activado
    }
    if (!isFechaRevaliBEnabled) {
      data.Fech_Revali_B = ''; // Enviar vacío si no está activado
    }
    console.log(data);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.16.246:3003/api/InfoEstudio',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Datos de estudio agregados exitosamente');
        reset(); // Limpiar el formulario después de agregar
        setIsFechaRevaliAEnabled(false); // Desactivar el campo de fecha de revalidación A
        setIsFechaRevaliBEnabled(false); // Desactivar el campo de fecha de revalidación B
      } else {
        alert(`Hubo un problema al agregar los datos de estudio: ${response.status}`);
      }
    } catch (error) {
      alert(`Error al agregar datos de estudio: ${error.response?.data?.msg || error.message}`);
      console.log(error.response?.data);
    }
  };

  const onBuscar = async () => {
    const { empleado_Dni } = getValues(); // Utiliza getValues para obtener el DNI
    if (!empleado_Dni) {
      alert('Por favor, ingrese un DNI para buscar.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://192.168.16.246:3003/api/InfoEstudio/${empleado_Dni}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 && response.data.infoEstudios.length > 0) {
        const infoEstudio = response.data.infoEstudios[0];
        // Rellenar los valores del formulario con la respuesta de la API
        Object.keys(infoEstudio).forEach((key) => setValue(key, infoEstudio[key]));
        setIsFechaRevaliAEnabled(!!infoEstudio.Fech_Revali_A); // Habilitar/deshabilitar Fecha Revalidación A según el valor existente
        setIsFechaRevaliBEnabled(!!infoEstudio.Fech_Revali_B); // Habilitar/deshabilitar Fecha Revalidación B según el valor existente
      } else {
        alert('No se encontraron datos para este DNI.');
      }
    } catch (error) {
      alert(`Error al buscar datos: ${error.response?.data?.msg || error.message}`);
    }
  };

  const onActualizar = async () => {
    const { empleado_Dni, ...data } = getValues(); // Utiliza getValues para obtener los valores del formulario
    if (!empleado_Dni) {
      alert('Por favor, ingrese un DNI para actualizar.');
      return;
    }

    if (!isFechaRevaliAEnabled) {
      data.Fech_Revali_A = ''; // Enviar vacío si no está activado
    }
    if (!isFechaRevaliBEnabled) {
      data.Fech_Revali_B = ''; // Enviar vacío si no está activado
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://192.168.16.246:3003/api/InfoEstudio/${empleado_Dni}`,
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
    setIsFechaRevaliAEnabled(false); // Desactivar el campo de fecha de revalidación A
    setIsFechaRevaliBEnabled(false); // Desactivar el campo de fecha de revalidación B
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container py-5">
      <div className="row">
        <h2 className="text-center mb-4">Agregar Información de Estudio</h2>
        
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

        <FormSelect
          id="Nivel_Estudio"
          label="Nivel de Estudio"
          register={register}
          errors={errors}
          validation={{ required: 'El nivel de estudio es obligatorio' }}
          options={[
            { value: 'UNIVERSITARIO', label: 'UNIVERSITARIO' },
            { value: 'UNIVERSITARIO INCOMPLETO', label: 'UNIVERSITARIO INCOMPLETO' },
            { value: 'TECNICO INCOMPLETO', label: 'TECNICO INCOMPLETO' },
            { value: 'TECNICO TITULADO', label: 'TECNICO TITULADO' },
            { value: 'SECUNDARIA', label: 'SECUNDARIA' },
            { value: 'PRIMARIA', label: 'PRIMARIA' },
          ]}
        />

        <FormInput
          id="Profe_oficio"
          label="Profesión u Oficio"
          register={register}
          errors={errors}
          validation={{ required: 'La profesión u oficio es obligatoria' }}
        />

        <FormSelect
          id="Estudiando_en"
          label="Estudiando en"
          register={register}
          errors={errors}
          validation={{ required: 'El campo "Estudiando en" es obligatorio' }}
          options={[
            { value: 'UNIVERSIDAD', label: 'UNIVERSIDAD' },
            { value: 'INSTITUTO', label: 'INSTITUTO' },
            { value: 'NINGUNA POR AHORA', label: 'NINGUNA POR AHORA' },
          ]}
        />

        <FormInput
          id="Carrera_Empleado"
          label="Carrera"
          register={register}
          errors={errors}
          validation={{ required: 'La carrera del empleado es obligatoria' }}
        />

        <FormInput
          id="Ciclo_Empleado"
          label="Ciclo"
          register={register}
          errors={errors}
          validation={{
            required: 'El ciclo es obligatorio',
            pattern: {
              value: /^[0-9]+$/,
              message: 'El ciclo debe ser un número'
            }
          }}
        />

        <FormInput
          id="Ubi_Sede"
          label="Ubicación de la Sede"
          register={register}
          errors={errors}
          validation={{ required: 'La ubicación de la sede es obligatoria' }}
        />

        <FormInput
          id="Deporte"
          label="Deporte"
          register={register}
          errors={errors}
        />

        <FormSelect
          id="Licen_A"
          label="Licencia A"
          register={register}
          errors={errors}
          options={[
            { value: 'A-I', label: 'A-I' },
            { value: 'A-IIa', label: 'A-IIa' },
            { value: 'A-IIb', label: 'A-IIb' },
            { value: 'A-IIIa', label: 'A-IIIa' },
            { value: 'A-IIIb', label: 'A-IIIb' },
            { value: 'A-IIIc', label: 'A-IIIc' },
            { value: 'NO TENGO', label: 'NO TENGO' },
          ]}
        />
        <FormSelect
          id="Licen_B"
          label="Licencia B"
          register={register}
          errors={errors}
          options={[
            { value: 'B-I', label: 'B-I' },
            { value: 'B-IIA', label: 'B-IIA' },
            { value: 'B-IIB', label: 'B-IIB' },
            { value: 'B-IIC', label: 'B-IIC' },
            { value: 'NO TENGO', label: 'NO TENGO' },
          ]}
        />
         <FormInput
          id="N_Licen_A"
          label="Número de Licencia A"
          register={register}
          errors={errors}
        />

        <FormInput
          id="N_Licen_B"
          label="Número de Licencia B"
          register={register}
          errors={errors}
        />
        

        <div className="col-md-6 mb-3">
          <label className='form-label' htmlFor="Fech_Revali_A">Fecha de Revalidación A</label>
          <div className="input-group">
            <input
              id="Fech_Revali_A"
              type="date"
              className="form-control"
              disabled={!isFechaRevaliAEnabled}
              {...register("Fech_Revali_A")}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <input
                  type="checkbox"
                  checked={isFechaRevaliAEnabled}
                  onChange={() => setIsFechaRevaliAEnabled(!isFechaRevaliAEnabled)}
                />
              </div>
            </div>
          </div>
        </div>
        
        

        <div className="col-md-6 mb-3">
          <label className='form-label' htmlFor="Fech_Revali_B">Fecha de Revalidación B</label>
          <div className="input-group">
            <input
              id="Fech_Revali_B"
              type="date"
              className="form-control"
              disabled={!isFechaRevaliBEnabled}
              {...register("Fech_Revali_B")}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <input
                  type="checkbox"
                  checked={isFechaRevaliBEnabled}
                  onChange={() => setIsFechaRevaliBEnabled(!isFechaRevaliBEnabled)}
                />
              </div>
            </div>
          </div>
        </div>
        
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

export default AgregarInformacionEstudioForm;