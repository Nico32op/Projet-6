//lieu on place l'application express
const express = require("express"); //on importe express qu'on a installer via le terminal
const bodyParser = require("body-parser"); //permet d'extraire l'objet JSON de la demande (Post) on importe body parser qu'on a installé via la terminal
const saucesroutes = require("./routes/sauces"); //on importe les routeurs sur notre application
const userroutes = require("./routes/user");

const mongoose = require("mongoose"); //mongoose facilie l'intéraction avec notre base de donnée MongoDB
const path = require("path"); // permet de créer la route affichant les images
mongoose //on connecte mongoose à la base de données grace au lien fournis par MongoDB
  .connect(
    "mongodb+srv://Nico32:vivelafrance@cluster0.36afc.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express(); //permet de créer une application express

app.use((req, res, next) => {
  //méthode CORS pour assurer que le frontend fait des appel en sécurité vers mon api
  //cette middleware permet de créer des header dans notre response qu'on envoie au navigateur et qui a pour objectif "d'ouvrir" notre api aux utilisateurs effectuant une reqête
  res.setHeader("Access-Control-Allow-Origin", "*"); //ce header permet d'accéder à notre API depuis n'importe quelle origine ( '*' ), "*" veut dire tous le monde ;
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //ce header permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // ce header permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  next();
});

app.use(bodyParser.json()); //permettra de traduire le corps de la reqûete reçu (POST) au format json //on définit l'url/chemin principal qu'utilisera notre routeur (sauces.js)
app.use("/images", express.static(path.join(__dirname, "images"))); //indique à Express qu'il faut gérer la ressource images dans un "sous répertoire" (_dirname)
app.use("/api/sauces", saucesroutes); //on définit l'url/chemin principal qu'utilisera notre routeur (user.js)
app.use("/api/auth", userroutes);

module.exports = app;
