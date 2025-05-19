const Usuario = require("../Models/usuario.model");
const TipoUsuario = require("../Models/Tipo_Usuario.model");

checkDuplicateUsernameOrEmail = (req, res, next) => {
    Usuario.findOne({
        where: {
            Usuario: req.body.Usuario
        }
    }).then(user => {
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        Usuario.findOne({
            where: {
                Correo: req.body.Correo
            }
        }).then(user => {
            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        TipoUsuario.findAll().then(roles => {
            const availableRoles = roles.map(role => role.nombre);
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!availableRoles.includes(req.body.roles[i])) {
                    res.status(400).send({
                        message: `Failed! Role ${req.body.roles[i]} does not exist!`
                    });
                    return;
                }
            }
            next();
        });
    } else {
        next();
    }
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;