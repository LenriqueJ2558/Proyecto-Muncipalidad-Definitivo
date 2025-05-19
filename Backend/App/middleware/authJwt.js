const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const Usuario = require("../Models/usuario.model");


verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isModerator = (req, res, next) => {
    Usuario.findByPk(req.userId).then(user => {
        user.getTipoUsuario().then(tipoUsuario => {
            if (tipoUsuario.nombre === "Moderador") {
                next();
                return;
            }
            res.status(403).send({ message: "Require Moderator Role!" });
        });
    });
};

// Middleware para verificar si el usuario es administrador
isAdmin = (req, res, next) => {
    Usuario.findByPk(req.userId).then(user => {
        user.getTipoUsuario().then(tipoUsuario => {
            if (tipoUsuario.nombre === "Administrador") {
                next();
                return;
            }
            res.status(403).send({ message: "Require Admin Role!" });
        });
    });
};

// Exportando los middlewares
const authJwt = {
    verifyToken,
    isModerator,
    isAdmin
};

module.exports = authJwt;