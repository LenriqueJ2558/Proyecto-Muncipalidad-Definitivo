

const ImagePreview = ({ imagePreview, register, handleFileChange }) => (
  <div className="col-md-6 mb-3 image-preview-container">
    {imagePreview && (
      <img
        src={imagePreview}
        alt="Vista previa"
        style={{ width: '250', height: '250px', objectFit: 'cover' }}
        className="img-thumbnail mb-2"
      />
    )}
    <input
      type="file"
      className="form-control"
      {...register('image')}
      onChange={handleFileChange}
    />
  </div>
);

export default ImagePreview;