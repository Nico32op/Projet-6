const express = require("express"); //toujours besoin d'express avant de créer un routeur
const router = express.Router(); //on enregistre les routes dans notre routeur Express(on vient de créer), puis enregistrer celui-ci dans l'application
const routescontrollers = require("../controllers/user"); //on associe le controller a la routes

router.post("/signup", routescontrollers.signup); // on utilise des routes post car le frontend envoie des informations des utilisateurs
router.post("/login", routescontrollers.login);

module.exports = router;
