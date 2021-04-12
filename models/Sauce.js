const mongoose = require("mongoose"); //on importe mongoose

const sauceSchema = mongoose.Schema({
  //on créé un schéma de donné
  userId: { type: String, required: true },
  name: { type: String, required: true }, //on créé différents objets dont notre schéma aura besoin, on dit le type ainsi que leur caractère (obligatoire ou non)
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },
});

module.exports = mongoose.model("Sauce", sauceSchema); //on exporte ce schéma en tant que modèle Mongoose appelé « Thing », le rendant par là même disponible pour notre application Express.
