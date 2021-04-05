//URGENT il faut installer le package pour gérer les cryptage dans le terminal on tape npm install --save bcrypt

const bcrypt = require("bcrypt"); // on appel le package bcrypt que l'on vient d'installer
const jwt = require("jsonwebtoken"); // jssonwebtoken permet de créer et vérifier les token d'authification, ici on l'importe après l'avoir installé dans le terminal

const User = require("../models/User"); // on appel notre modèle de shéma mongoose dans l'appli express

exports.signup = (req, res, next) => {
  // signup permet l'enregistrement des nouveaux utilisateurs
  bcrypt
    .hash(req.body.password, 10) //10 est le nombre de "tours" que fait l'algorithme de cryptage //.hash permet de crypter le mot de passe, on récupérer le corp du mot de passe envoyer par le frontend
    .then((hash) => {
      // on récupère le hash(cryptage du mot de passe) du mots de passe
      const user = new User({
        //on créé un nouvel utilisateur grâce à notre model Mongoose
        //on enregistre le hash du mot de passe reçu ainsi que l'email présent dans la requête frontend qu'on enregiste dans une constante
        email: req.body.email,
        password: hash,
      });
      user
        .save() //permet de sauvegarder le nouvel user dans la base de donnée
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error })); //500 est une erreur serveur
}; // si il n'y a pas d'erreur l'utilisateur sera enregistré dans la base de donnée

exports.login = (req, res, next) => {
  //permet de connecter les utilisateurs déjà existant
  User.findOne({ email: req.body.email }) //comparer l'email de la requête à la base de donnée
    .then((user) => {
      if (!user) {
        //si le même email n'est pas trouvé on envoie un msg d'erreur
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password) //on compare le mot de passe saisie dans le frontend au mot de passe de la base de donnée
        .then((valid) => {
          if (!valid) {
            //si le mot de passe saisie n'est pas le même que celui enregistré on envoie un msg d'erreur
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            //si tout est on envoie un id et une chaine de caractère (token)
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              //"RANDOM..." est une chaîne secrète de développement temporaire
              //la fonction sign permet d'encoder un nouvel utilisateur, le token contient l'id de l'utilisateur
              expiresIn: "24h", // le toke  dure 24h ensuite l'utilisateur doit se reconnecter
            }),
            //token: "TOKEN",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
