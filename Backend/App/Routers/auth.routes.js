const controller = require("../Controller/auth.controller");
const { verifySignUp,authJwt } = require("../middleware");

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);
    app.post("/api/auth/signout", controller.signout);
    app.get("/api/auth/user-details", [authJwt.verifyToken],controller.getUsuarioById);
    app.post("/api/auth/change-password",[authJwt.verifyToken],controller.changePassword)
    app.get("/api/auth/users",controller.getUsers)
    app.post("/api/auth/user/:userId/cambiar-contrasena",controller.cambiarContrasena)
}