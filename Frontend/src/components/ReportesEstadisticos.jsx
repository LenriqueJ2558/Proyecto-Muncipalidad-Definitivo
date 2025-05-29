import React from 'react';
import '../css/reportStadis.css';

const ReportesEstadisticos = () => {
  return (
    <div className="report">
      <div id='data'>
        <iframe
          title="OBSERVATORIO MDLCH 2024 FINAL Actualizado"
          width="100%"
          height="900"
          src="https://app.powerbi.com/view?r=eyJrIjoiNzI2NWQyZWItZDYyMS00N2Y4LTkwMDctZmIzZjk3NDNkY2VkIiwidCI6ImM0YTY2YzM0LTJiYjctNDUxZi04YmUxLWIyYzI2YTQzMDE1OCIsImMiOjR9&pageName=ReportSection50df89bf716ebfd99dda"
          frameBorder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
};

export default ReportesEstadisticos;