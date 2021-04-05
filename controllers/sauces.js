//le dossier de controllers contiendra le contenu de toutes les routes (post,get..) pour rendre plus lisible le dossier routes

const { json } = require("body-parser");
const Sauce = require("../models/Sauce"); // on appel notre modèle de shéma mongoose

exports.creationobjet = (req, res, next) => {
  //logique de la méthode POST
  const sauceObject = JSON.parse(req.body.sauce); // on récupère et traduit au format js l'objet reçu de la requête
  //delete sauceObject._id; //on supprime l'id reçu par la requêtre frontend car mongoose en créé automatiquement
  const sauce = new Sauce({
    //on créé une nouvelle instance de notre model Sauce
    ...sauceObject, //copie les champs qu'il y a ds le body de la request (POST) titre, description...
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      //on récupère le http (req.protocol), la locallisation du server (localhost:3000) et ou se trouve le dossier on enregistre (images), cela créé l'url ou sera visible l'image
      req.file.filename // filename récupère le nom du fichier et sera la dernière partie de l'url
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save() //enregistre l'objet ds la base de donnée
    .then(() =>
      res.status(201).json({ message: "Nouvelle Sauce enregistrée =)" })
    ) //cela retourne une promesse, on est obligé d'envoyer une response sinon la requête expire
    .catch((error) => res.status(400).json({ error: error })); // renvoie l'erreur si la requête c'est mal déroulé
  //EXEMPLE COUR A GARDER  //app.post traite que les requêts POST, URGENT pour rendre la requête reçu plus "lisible" il faut effectuer la commande npm install --save body-parser
  /*   console.log(req.body); //affiche le corps de la requête reçu dans la console node
  res.status(201).json({
    //si on a bien reçu la requête POST on renvoie au format json un message et on modifie le statut
    message: "Objet créé !",
  }); */
};

exports.modifobjet = (req, res, next) => {
  //repond a une requete PUT(modifier)
  const sauceObject = req.file //cette constante vérifie si il y a un fichier (image) à modifier ou non
    ? {
        ...JSON.parse(req.body.sauce), //si l y a une image on la gère ici
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id } //on veut être certain que l'id reçu et le même que celui de la base de données
  ) //updateone permet de mofier un élément du tableau de la base de données
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.supprimerobjet = (req, res, next) => {
  //repond a une requete DELETE(supprimer)
  Sauce.deleteOne({ _id: req.params.id }) //deleteOne permet de supprimer qu'un seul élément du tableau de la base de données grâce au contenu de son id
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.afficheunprod = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //finOne permet de renvoyer qu'un seul élément du tableau de la base de données grâce au contenu de son id
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.affichetouslesprod = (req, res, next) => {
  Sauce.find() //retourne les éléments enregistré ds la base de données
    .then((things) => res.status(200).json(things)) // dans la promesse on retourne le tableau des objets reçu de la base de données (things)
    .catch((error) => res.status(400).json({ error }));
};
