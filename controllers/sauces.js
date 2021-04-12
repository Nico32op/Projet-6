//le dossier de controllers contiendra le contenu de toutes les routes (post,get..) pour rendre plus lisible le dossier routes

const { json } = require("body-parser");
const Sauce = require("../models/Sauce"); // on appel notre modèle de shéma mongoose
const fs = require("fs"); //donne accès aux fonctions qui nous permettent de modifier le système de fichiers (supprimer les images)

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
    likes: 0, //on ajoute également les valeurs likes et dislikes (0)
    dislikes: 0,
    usersLiked: [], // on ajoute aussi les tableaux ou seront enregistrés les id des utilisateurs qui aiment ou pas
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
          //on récupère le http (req.protocol), la locallisation du server (localhost:3000) et ou se trouve le dossier on enregistre (images), cela créé l'url ou sera visible l'image
          req.file.filename // filename récupère le nom du fichier et sera la dernière partie de l'url
        }`,
      }
    : { ...req.body }; //sinon on le traite "normalement" en récupérant le corps de la requête
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id } //on veut être certain que l'id reçu et le même que celui de la base de données
  ) //updateone permet de mofier un élément du tableau de la base de données
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.supprimerobjet = (req, res, next) => {
  //repond a une requete DELETE(supprimer)
  Sauce.findOne({ _id: req.params.id }) //on récupère l'objet dans la base donnée
    .then((sauce) => {
      //quand on le trouve
      const filename = sauce.imageUrl.split("/images/")[1]; // on extrait ici le nom du fichier à supprimer
      fs.unlink(`images/${filename}`, () => {
        // une fois le nom du fichier extrait on le supprimer avec fs.unlink
        Sauce.deleteOne({ _id: req.params.id }) //deleteOne permet de supprimer qu'un seul élément du tableau de la base de données grâce au contenu de son id
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.afficheunprod = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //finOne permet de renvoyer qu'un seul élément du tableau de la base de données grâce au contenu de son id
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.affichetouslesprod = (req, res, next) => {
  Sauce.find() //retourne les éléments enregistré ds la base de données
    .then((sauces) => res.status(200).json(sauces)) // dans la promesse on retourne le tableau des objets reçu de la base de données (things)
    .catch((error) => res.status(400).json({ error }));
};

// Permet de "liker"ou "dislaker" une sauce

exports.gestiondeslikes = (req, res, next) => {
  //récupération de l'userId et de la variable Like pour traiter la requête
  let like = req.body.like;
  let user = req.body.userId; //id de l'utilisateur
  Sauce.findOne({ _id: req.params._id })
    //recherche de la sauce grâce à son id
    .then((sauce) => {
      switch (like) {
        //dans le cas où on souhaite ajouter un like
        case 1:
          Sauce.updateOne(
            { _id: req.params._id }, //id de la sauce
            {
              $inc: { likes: +1 }, //on rajoute +1 à l'objet likes de la base données
              $push: { usersLiked: user }, // ajout de l'id de l'utilisateur dans le tableau usersLiked de la base donnée
              _id: req.params._id, //on vérifie que la sauce a toujours le même id
            }
          ).then(() => {
            res.status(200).json({ message: "=D" });
            console.log(sauce);
          });
          break;
        case -1: //dans le as ou l'on souhaite "enlever" un like
          Sauce.updateOne(
            { _id: req.params._id },
            {
              $inc: { dislikes: +1 }, //on rajoute +1 à l'objet dislikes de la base données
              $push: { usersDisliked: user }, // ajout de l'id de l'utilisateur dans le tableau usersdisLiked de la base donnée
              _id: req.params._id,
            }
          ).then(() => res.status(200).json({ message: "='(" }));
          break;
        case 0: //dans le cas ou l'on souhaite modifier un like
          if (sauce.usersLiked.includes(user)) {
            //on cherche l'id de l'utilisateur dans le tableau usersLiked
            Sauce.updateOne(
              { _id: req.params._id },
              {
                $inc: { likes: -1 }, //retrait d'1 like
                $pull: { usersLiked: user }, //retrai de l'utilisateur du tableau usersliked
                _id: req.params._id,
              }
            ).then(() =>
              res.status(200).json({ message: "On retire un like !" })
            );
          }
          if (sauce.usersDisliked.includes(user)) {
            //on cherche l'utilisateur dans le tableau usersDisliked
            Sauce.updateOne(
              { _id: req.params._id },
              {
                $inc: { dislikes: -1 }, //retrait d'1 dislike
                $pull: { usersDisliked: user }, //retrai de l'utilisateur du tableau usersdisliked
                _id: req.params._id,
              }
            ).then(() =>
              res.status(200).json({ message: "On retire un dislike !" })
            );
          }
          break;
        default:
          console.log("default"); //si aucune correspondance est trouvé avec les valeurs "case"
      }
    })

    .catch((error) => res.status(400).json({ error }));
};
