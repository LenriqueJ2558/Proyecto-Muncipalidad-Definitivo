import React from 'react';

const CampoVideo = ({ videoUrl, handleFileSelect }) => {
  const fullVideoUrl = videoUrl ? `http://192.168.16.246:3003${videoUrl}` : '';

  const openVideo = () => {
    if (fullVideoUrl) {
      window.open(fullVideoUrl, '_blank');
    }
  };

  return (
    <div>
      <div>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
          placeholder="Url"
          value={videoUrl || ''}
          disabled
        />
      </div>

      <div className="flex justify-start mt-6 space-x-4">
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
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md"
        >
          Seleccionar
        </button>

        <button
          type="button"
          onClick={openVideo}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md"
          disabled={!videoUrl}
        >
          Abrir
        </button>
      </div>
    </div>
  );
};

export default CampoVideo;