require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const fs = require('fs');


const empleado = require('./App/Routers/empleado.routes')
const actividad = require ('./App/Routers/actividad.routes')
const InfoEstudio = require ('./App/Routers/infoEstudio.routes.js')
const NovedadesCamara = require ('./App/Routers/novedades.routes.js')
const InfoEmpleado = require('./App/Routers/info_empleado.routes.js')
const ReporteEmpleado = require('./App/Routers/reporte.routes.js')
const NombreSupervisores = require('./App/Routers/Supervisores.routes.js')
const tipodeincidencias = require('./App/Routers/tipoDeIncidencias.routes.js')
const sequelize = require('./App/config/db.config');
const videoRoutes = require('./App/Routers/videoRoutes.routes.js');
const novedadesSerenazgoRoutes = require('./App/Routers/novedadesSerenazgoRoutes.js');

const app = express();
app.use(cors({
    origin: '*', // o '*'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
    credentials: true
}));

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.mp4':
        return 'video/mp4';
      case '.mov':
        return 'video/quicktime';
      case '.avi':
        return 'video/x-msvideo';
      case '.mkv':
        return 'video/x-matroska';
      default:
        return 'application/octet-stream';
    }
  }
  app.get('/api/uploads/videosNovedades/:videoName', (req, res) => {
    const videoName = req.params.videoName;
    const videoPath = path.join(__dirname, 'App', 'uploads', 'videosNovedades', videoName);

    fs.stat(videoPath, (err, stats) => {
        if (err || !stats.isFile()) {
            return res.status(404).send('Video no encontrado');
        }

        const videoSize = stats.size;
        const range = req.headers.range;
        const contentType = getContentType(videoPath);

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;

            if (start >= videoSize || end >= videoSize) {
                res.status(416).send("Requested range not satisfiable");
                return;
            }

            const contentLength = end - start + 1;

            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": contentType,
            });

            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res);
        } else {
            res.writeHead(200, {
                "Content-Length": videoSize,
                "Content-Type": contentType,
                "Accept-Ranges": "bytes", // <- este faltaba
            });

            fs.createReadStream(videoPath).pipe(res);
        }
    });
});
// Middleware CORS


// Middleware para parsear JSON y URL-encoded bodies
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

app.get("/", (req, res) => {
    res.send("Hola desde Render");
});
require("./App/Routers/auth.routes.js")(app);
require("./App/Routers/user.routes.js")(app);

// Rutas API
app.use('/api',empleado,actividad,NovedadesCamara,InfoEstudio,InfoEmpleado,ReporteEmpleado,NombreSupervisores,tipodeincidencias,videoRoutes);
app.use('/api/mobile', novedadesSerenazgoRoutes);
// Ruta para archivos estáticos (imagenes de empleados)
app.use('/ProyectoMuni/App/imagenesEmpleados', express.static(path.join(__dirname, 'App/imagenesEmpleados')));
app.use('/api/uploads/imagenesNovedades', express.static(path.join(__dirname, 'App', 'uploads', 'imagenesNovedades')));
// Ruta para servir videos de la carpeta correcta
//app.use('/api/uploads/videosNovedades', express.static(path.join(__dirname, 'App', 'uploads', 'videosNovedades')));

// Sincronización de Sequelize y escucha del servidor
const PORT = process.env.PORT || 3003;
sequelize.sync().then(() => {
    app.listen(PORT,'0.0.0.0', () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((error) => {
    console.error('Error al sincronizar con la base de datos:', error);
});