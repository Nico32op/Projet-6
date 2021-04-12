//on créé le modèle qui sera stocker dans la base de donnée
const mongoose = require("mongoose"); //on appel mongoose qui facilie la communication avec la base de donnée
const uniqueValidator = require("mongoose-unique-validator"); //on a installé le package  mongoss-unique-validator que l'on appel ds cette constante pour empêcher une erreur de mangosse si 2 mails identiques on était créé

const userSchema = mongoose.Schema({
  //on créé un schéma de donné
  //on créé différents objets dont notre schéma aura besoin, on dit le type ainsi que leur caractère (obligatoire ou non)
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); //on applique à notre schéma le validateur

module.exports = mongoose.model("User", userSchema); //on exporte ce schéma en tant que modèle Mongoose appelé « User », le rendant par là même disponible pour notre application Express.
