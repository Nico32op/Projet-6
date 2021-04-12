//le dossier ne contient que le chemin principal des routes, le contenu de la fonction des routes et dans le dossier controllers

const express = require("express");

const router = express.Router(); //on enregistre les routes dans notre routeur Express(on vient de créer), puis enregistrer celui-ci dans l'application
const saucescontrollers = require("../controllers/sauces"); // on importe le controllers (la logique métier) correspondants aux routes
const auth = require("../middleware/auth"); // on importe la fonction qui permet de vérifier les tokens et sécuriser les différentes routes
const multer = require("../middleware/multer-config"); // on importe la fonction multer de récupérer les fichiers images provenant du frontend

// implantation de la méthode CRUD (création, lecture, modifiction, suppression)
//IMPORTANT on remplace app. par router. car maintenant on a les routes sur le routeur
router.post("/", auth, multer, saucescontrollers.creationobjet); // on place en argument la fonction qui sécurisera les différentes routes (auth)
router.put("/:id", auth, multer, saucescontrollers.modifobjet); // on place en argument pour les routes POST et PUT  la fonction qui permettra d'extraire les images en provenance du frontend
router.delete("/:id", auth, saucescontrollers.supprimerobjet);
router.get("/:id", auth, saucescontrollers.afficheunprod);
router.get("/", auth, saucescontrollers.affichetouslesprod);
router.post("/:_id/like", auth, saucescontrollers.gestiondeslikes);

/* app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
}); */

module.exports = router;
