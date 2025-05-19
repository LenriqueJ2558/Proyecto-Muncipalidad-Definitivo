import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegistrarUsuarioForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://192.168.16.246:3003/api/auth/signup', data);
      console.log('Usuario registrado:', response.data);
      alert('Usuario registrado con éxito');
    } catch (error) {
      console.error('Error registrando usuario:', error);
      alert('Error registrando usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container py-5">
      <div className="row">
        <h2 className="text-center mb-4">Registrar Nuevo Usuario</h2>

        <div className="col-md-6 mb-3">
          <label htmlFor="Usuario" className="form-label">Usuario:</label>
          <input
            id="Usuario"
            type="text"
            className={`form-control ${errors.Usuario ? 'is-invalid' : ''}`}
            {...register('Usuario', { required: 'El campo Usuario es obligatorio' })}
          />
          {errors.Usuario && <div className="invalid-feedback">{errors.Usuario.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="Contraseña" className="form-label">Contraseña:</label>
          <input
            id="Contraseña"
            type="password"
            className={`form-control ${errors.Contraseña ? 'is-invalid' : ''}`}
            {...register('Contraseña', { required: 'El campo Contraseña es obligatorio' })}
          />
          {errors.Contraseña && <div className="invalid-feedback">{errors.Contraseña.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="Nombre" className="form-label">Nombre:</label>
          <input
            id="Nombre"
            type="text"
            className={`form-control ${errors.Nombre ? 'is-invalid' : ''}`}
            {...register('Nombre', { required: 'El campo Nombre es obligatorio' })}
          />
          {errors.Nombre && <div className="invalid-feedback">{errors.Nombre.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="Correo" className="form-label">Correo:</label>
          <input
            id="Correo"
            type="email"
            className={`form-control ${errors.Correo ? 'is-invalid' : ''}`}
            {...register('Correo', { 
              required: 'El campo Correo es obligatorio',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Correo inválido'
              }
            })}
          />
          {errors.Correo && <div className="invalid-feedback">{errors.Correo.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="empleado_Dni" className="form-label">DNI del Empleado:</label>
          <input
            id="empleado_Dni"
            type="text"
            className={`form-control ${errors.empleado_Dni ? 'is-invalid' : ''}`}
            {...register('empleado_Dni', { 
              required: 'El campo DNI del Empleado es obligatorio',
              pattern: {
                value: /^[0-9]{8}$/,
                message: 'El DNI debe tener 8 dígitos'
              }
            })}
          />
          {errors.empleado_Dni && <div className="invalid-feedback">{errors.empleado_Dni.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
  <label htmlFor="tipo_usuario_Id" className="form-label">Tipo de Usuario:</label>
  <select
    id="tipo_usuario_Id"
    className={`form-control ${errors.tipo_usuario_Id ? 'is-invalid' : ''}`}
    {...register('tipo_usuario_Id', { 
      required: 'El campo Tipo de Usuario es obligatorio',
    })}
  >
    <option value="">Selecciona un tipo de usuario</option>
    <option value="1">Administrador</option>
    <option value="2">Moderador</option>
    <option value="3">Usuario</option>
  </select>
  {errors.tipo_usuario_Id && <div className="invalid-feedback">{errors.tipo_usuario_Id.message}</div>}
</div>

        <div className="col-12 mt-4 text-center">
          <button type="submit" className="btn btn-primary">Registrar Usuario</button>
        </div>
      </div>
    </form>
  );
};

export default RegistrarUsuarioForm;