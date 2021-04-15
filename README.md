 Pour démarrer le Frontend : 
    
    Cloner le repo disponible depuis cette page :  https://github.com/OpenClassrooms-Student-Center/dwj-projet6
    Pour installer et faire tourner node-sass v4.9.3 il faut être en Nodev10
    Pour éviter de devoir installer et désinstaller Node en fonction de la version souhaitée, j'ai installé nvm depuis un terminal (procédure pour installation :         https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows)
    Après avoir installé nvm j'ai installé Nodev10 et Nodev14.15.4 (on en aura besoin pour le backend) : nvm install 10.0.0, nvm install 14.15.4
    Pour choisir la version de Node à utiliser on utilise : nvm use 10.0.0
    Depuis le dossier cloné il faut ouvrir un terminal et exécuter dans l'ordre: npm install, npm install node-sass@4.9.3, npm start
    Le projet a été généré avec Angular CLI version 7.0.2.
    Rendez-vous sur http://localhost:4200

   Pour démarrer le Backend : 

    Créer un dossier "backend" qui contiendra le contenu de mon code, ensuite ouvrez le terminal depuis ce dossier. 
    On choisit d'utiliser la dernière version de node : nvm use 14.15.4
    Pour vous connectez à votre Base de donnée MongoDB, renommer le fichier .env.example par .env, puis : 
    - remplacer la valeur de la variable DB_ADMIN_USERNAME par votre User mongodb
    - remplacer la valeur de la variable DB_ADMIN_PASSWORD par votre mot de passe mongodb
    Pour utiliser le serveur installer le package nodemon : npm install -g nodemon
    Puis lancez le serveur: nodemon server
    Le serveur back-end est utilisé sur le port 3000
