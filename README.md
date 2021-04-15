 Pour démarrer le Frontend : 
    
    Cloner le repo disponible depuis cette page :  https://github.com/OpenClassrooms-Student-Center/dwj-projet6
    Pour installer et faire tourner node-sass v4.9.3 il faut être en Nodev10
    Pour éviter de devoir installer et désinstaller Node en fonction de la version souhaitée, j'ai installé nvm depuis un terminal (procédure pour installation :            https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows)
    Après avoir installé nvm j'ai installé Nodev10 : nvm install 10.0.0
    Pour choisir la version de Node à utiliser on utilise : nvm use 10.0.0
    Depuis le dossier cloné il faut ouvrir un terminal et exécuter dans l'ordre: npm install, npm install node-sass@4.9.3, npm start
    Le projet a été généré avec Angular CLI version 7.0.2.
    Rendez-vous sur http://localhost:4200

   Pour démarrer le Backend : 

    Créer un dossier "backend" qui contiendra le contenu de mon code, ensuite ouvrez le terminal depuis ce dossier. 
    Installer la dernère version de Node : nvm install 14.15.4, choisir d'utiliser cette version : nvm use 14.15.4
    Pour utiliser le serveur installer le package nodemon : npm install -g nodemon
    Puis lancez le serveur: nodemon server
