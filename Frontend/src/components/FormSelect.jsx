

const FormSelect = ({ id, label, register, errors, options, validation }) => (
  <div className="col-md-6 mb-3">
    <label htmlFor={id} className="form-label">{label}</label>
    <select
      id={id}
      className={`form-select ${errors[id] ? 'is-invalid' : ''}`}
      {...register(id, validation)}
    >
      <option value="">Selecciona...</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    {errors[id] && <div className="invalid-feedback">{errors[id].message}</div>}
  </div>
);

export default FormSelect;