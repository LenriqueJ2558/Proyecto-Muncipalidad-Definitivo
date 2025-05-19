

const FormInput = ({ id, label, type = "text", register, errors, validation }) => (
  <div className="col-md-6 mb-3">
    <label htmlFor={id} className="form-label">{label}</label>
    <input
      type={type}
      id={id}
      className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
      {...register(id, validation)}
    />
    {errors[id] && <div className="invalid-feedback">{errors[id].message}</div>}
  </div>
);

export default FormInput;