import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../css/agregarPersonal.css';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const AgregarServicioForm = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm();
  const [isFechaSalidaEnabled, setIsFechaSalidaEnabled] = useState(false);

  const onSubmit = async (data) => {
    if (!isFechaSalidaEnabled) {
      data.Fecha_Salida = ''; // Enviar vacío si no está activado
    }
    console.log(data);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.16.246:3003/api/actividad',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Datos del servicio agregados exitosamente');
        reset(); // Limpiar el formulario después de agregar
        setIsFechaSalidaEnabled(false); // Desactivar el campo de fecha de salida
      } else {
        alert(`Hubo un problema al agregar los datos del servicio: ${response.status}`);
      }
    } catch (error) {
      alert(`Error al agregar datos del servicio: ${error.response?.data?.msg || error.message}`);
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
        `http://192.168.16.246:3003/api/actividad/${empleado_Dni}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 && response.data.actividades.length > 0) {
        const actividad = response.data.actividades[0];
        // Rellenar los valores del formulario con la respuesta de la API
        Object.keys(actividad).forEach((key) => setValue(key, actividad[key]));
        setIsFechaSalidaEnabled(!!actividad.Fecha_Salida); // Habilitar/deshabilitar Fecha de Salida según el valor existente
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

    if (!isFechaSalidaEnabled) {
      data.Fecha_Salida = ''; // Enviar vacío si no está activado
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://192.168.16.246:3003/api/actividad/${empleado_Dni}`,
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
    setIsFechaSalidaEnabled(false); // Desactivar el campo de fecha de salida
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container py-5">
      <div className="row">
        <h2 className="text-center mb-4 ">Agregar Datos del Servicio</h2>
        
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
          id="Cargo_Contrato"
          label="Cargo Según Contrato"
          register={register}
          errors={errors}
          validation={{ required: 'El cargo según contrato es obligatorio' }}
          options={[
            { value: 'SERVICIO DE VIGILANCIA', label: 'SERVICIO DE VIGILANCIA' },
            { value: 'ASESORIA EN NORMAS LEGALES ADMINISTRATIVAS', label: 'ASESORIA EN NORMAS LEGALES ADMINISTRATIVAS' },
            { value: 'TECNICO RADIO OPERADOR', label: 'TECNICO RADIO OPERADOR' },
            { value: 'SERENO TRANSITO', label: 'SERENO TRANSITO' },
            { value: 'SERENO TURISMO', label: 'SERENO TURISMO' },
            { value: 'SERENO  GIR', label: 'SERENO  GIR' },
            { value: 'PERSONAL ADMINISTRATIVO', label: 'PERSONAL ADMINISTRATIVO' },
            { value: 'SERENO MUSICO', label: 'SERENO MUSICO' },
            { value: 'SUPERVISOR - GIR', label: 'SUPERVISOR - GIR' },
            { value: 'SERENO CANILES', label: 'SERENO CANILES' },
            { value: 'SERENO ESCOLAR', label: 'SERENO' },
            { value: 'SERENO A PIE', label: 'SERENO A PIE' },
            { value: 'CHOFER', label: 'CHOFER' },
            { value: 'SUPERVISOR', label: 'SUPERVISOR' },
            { value: 'OPERADOR DE CÁMARAS', label: 'OPERADOR DE CÁMARAS' },
            { value: 'MOTORIZADO', label: 'MOTORIZADO' },
            { value: 'SOPORTE TECNICO', label: 'SOPORTE TECNICO' },
            { value: 'OTROS', label: 'OTROS' },
            { value: 'OPERADOR', label: 'OPERADOR' },
          ]}
        />

        <FormSelect
          id="Cargo_Desempeño"
          label="Cargo que Desempeña"
          register={register}
          errors={errors}
          validation={{ required: 'El cargo que desempeña es obligatorio' }}
          options={[
            { value: 'SERENO  GIR', label: 'SERENO  GIR' },
            { value: 'PERSONAL ADMINISTRATIVO', label: 'PERSONAL ADMINISTRATIVO' },
            { value: 'SUPERVISOR - GIR', label: 'SUPERVISOR - GIR' },
            { value: 'SERENO CANILES', label: 'SERENO CANILES' },
            { value: 'SERENO ESCOLAR', label: 'SERENO ESCOLAR' },
            { value: 'SERENO', label: 'SERENO' },
            { value: 'SERENO A PIE', label: 'SERENO A PIE' },
            { value: 'CHOFER', label: 'CHOFER' },
            { value: 'SUPERVISOR', label: 'SUPERVISOR' },
            { value: 'OPERADOR DE CÁMARA', label: 'OPERADOR DE CÁMARA' },
            { value: 'MOTORIZADO', label: 'MOTORIZADO' },
            { value: 'SOPORTE TECNICO', label: 'SOPORTE TECNICO' },
            { value: 'OTROS', label: 'OTROS' },
            { value: 'SUPERVISOR DE CÁMARA', label: 'SUPERVISOR DE CÁMARA' },
          ]}
        />

        <FormSelect
          id="Turno"
          label="Turno"
          register={register}
          errors={errors}
          validation={{ required: 'El turno es obligatorio' }}
          options={[
            { value: 'DÍA', label: 'DÍA' },
            { value: 'TARDE', label: 'TARDE' },
            { value: 'NOCHE', label: 'NOCHE' },
          ]}
        />

        <FormSelect
          id="Base"
          label="Base"
          register={register}
          errors={errors}
          validation={{ required: 'La base es obligatoria' }}
          options={[
            { value: 'CASCO', label: 'CASCO' },
            { value: 'CARAPONGO', label: 'CARAPONGO' },
            { value: 'CAMPIÑA', label: 'CAMPIÑA' },
            { value: 'OFICINA', label: 'OFICINA' },
            { value: 'NIEVERIA', label: 'NIEVERIA' },
            { value: 'JICAMARCA', label: 'JICAMARCA' },
            { value: 'ÑAÑA', label: 'ÑAÑA' },
            { value: 'CAJAMARQUILLA', label: 'CAJAMARQUILLA' },
            { value: 'HUACHIPA', label: 'HUACHIPA' },
            { value: 'COV', label: 'COV' },
          ]}
        />
        <FormSelect
          id="Estado"
          label="Estado"
          register={register}
          errors={errors}
          validation={{ required: 'El estado es obligatorio' }}
          options={[
            { value: 'Activo', label: 'Activo' },
            { value: 'De Baja', label: 'De Baja' },
          ]}
        />

        <FormSelect
          id="Modal"
          label="Modalidad"
          register={register}
          errors={errors}
          validation={{ required: 'La modalidad es obligatoria' }}
          options={[
            { value: 'CAS', label: 'CAS' },
            { value: '728', label: '728' },
            { value: 'LOCADOR', label: 'LOCADOR' },
          ]}
        />

        <FormInput
          id="Fecha_Entrada"
          label="Fecha de Entrada"
          type="date"
          register={register}
          errors={errors}
          validation={{ required: 'La fecha de entrada es obligatoria' }}
        />

        <div className="col-md-6 mb-3">
          <label className='form-label' htmlFor="Fecha_Salida">Fecha de Salida</label>
          <div className="input-group">
            <input
              id="Fecha_Salida"
              type="date"
              className="form-control"
              disabled={!isFechaSalidaEnabled}
              {...register("Fecha_Salida")}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <input
                  type="checkbox"
                  checked={isFechaSalidaEnabled}
                  onChange={() => setIsFechaSalidaEnabled(!isFechaSalidaEnabled)}
                />
              </div>
            </div>
          </div>
        </div>

        

        <FormInput
          id="Peso"
          label="Peso (kg)"
          type="number"
          register={register}
          errors={errors}
          validation={{ required: 'El peso es obligatorio' }}
        />

        <FormInput
          id="Estatura"
          label="Estatura (m)"
          
          
          register={register}
          errors={errors}
          validation={{ required: 'La estatura es obligatoria' }}
        />

        <FormSelect
          id="Talla_Polo"
          label="Talla de Polo"
          register={register}
          errors={errors}
          validation={{ required: 'La talla de polo es obligatoria' }}
          options={[
            { value: 'S', label: 'S' },
            { value: 'M', label: 'M' },
            { value: 'L', label: 'L' },
            { value: 'XL', label: 'XL' },
            { value: 'XXL', label: 'XXL' },
          ]}
        />

        <FormSelect
          id="Talla_Pantalon"
          label="Talla de Pantalón"
          register={register}
          errors={errors}
          validation={{ required: 'La talla de pantalón es obligatoria' }}
          options={[
            { value: 'S', label: 'S' },
            { value: 'M', label: 'M' },
            { value: 'L', label: 'L' },
            { value: 'XL', label: 'XL' },
            { value: 'XXL', label: 'XXL' },
          ]}
        />
        <FormSelect
          id="Talla_Borseguies"
          label="Talla de Borseguies"
          register={register}
          errors={errors}
          validation={{ required: 'La talla de pantalón es obligatoria' }}
          options={[
            { value: '32', label: '32' },
            { value: '33', label: '33' },
            { value: '34', label: '34' },
            { value: '35', label: '35' },
            { value: '36', label: '36' },
            { value: '37', label: '37' },
            { value: '38', label: '38' },
            { value: '39', label: '39' },
            { value: '40', label: '40' },
            { value: '41', label: '41' },
            { value: '42', label: '42' },
            { value: '43', label: '43' },
            { value: '44', label: '44' },

          ]}
        />

        <div className="text-center">
          <button type="button" className="btn btn-primary me-2" onClick={onBuscar}>Buscar</button>
          <button type="submit" className="btn btn-success me-2">Agregar</button>
          <button type="button" className="btn btn-warning me-2" onClick={onActualizar}>Actualizar</button>
          <button type="button" className="btn btn-secondary" onClick={onLimpiar}>Limpiar</button>
        </div>
      </div>
    </form>
  );
};

export default AgregarServicioForm;