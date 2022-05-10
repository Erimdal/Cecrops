## Comment installer Cecrops dans votre serveur
***Si vous avez le moindre souci avec l'installation, contactez Erimdal#3544 sur Discord.***

### Vous n'avez pas de compte Discord :

 - **Étape 1 :** Si vous n'avez pas de compte Discord, créez-en un [ici](https://discord.com/register).

### Vous avez un compte Discord mais vous voulez inviter Cecrops dans votre propre serveur (vous n'avez pas encore de token) :

 - **Étape 2 :** Rendez-vous sur ce [lien](https://discord.com/developers/applications) et connectez-vous.
 - **Étape 3 :** Une fois connecté, créez une application en cliquant sur "New Application". Donnez à votre bot un nom (Cecrops !), une description (a very nice bot), et même une jolie photo de profil si vous le souhaitez.
 -  **Étape 4 :** Ensuite cliquez sur l'onglet "bot" et choisissez comme "Scope" le suivant :![image explaining where to go next](https://www.commentcoder.com/static/3b6fcf29448d1eb90d9d945382b060d1/b17f8/discord-permission-scope-bot.jpg)

- **Étape 5 :** Lorsque vous aurez cliqué sur "Add bot", vous obtiendrez un token unique qu'il faut vous copier et sauvegarder précieusement. N'importe quelle personne ayant accès à ce token pourra se connecter sur votre bot (avec les permissions dont il dispose) et faire ce qu'il veut depuis ce bot.
- **Étape 6 :** Vous devez maintenant inviter le bot sur votre serveur. Il doit y avoir sur le site sur lequel vous étiez un gros bouton + quelque part, qui vous permettra d'inviter le bot sur un serveur sur lequel vous avez les permissions nécessaires. Vous pourrez aussi modifier les permissions demandées par le bot.

###  Vous avez un compte Discord, on vous a fourni un token ou vous venez de le récupérer :

- **Étape 7 :** Installez depuis ce lien git les fichiers du bot en cliquant sur le bouton de téléchargement (c'est une icône de téléchargement, pas du texte). Vous téléchargerez ainsi une archive que vous pouvez décompresser là où vous le souhaitez.
- **Étape 8 :** Il vous suffit maintenant d'ajouter un nouveau fichier dans le répertoire source du bot (donc le dossier que vous venez de créer dans lequel vous avez de visibles tous les fichiers), que vous appellerez pour l'instant `truc.txt`. Ouvrez-le avec un éditeur de texte et écrivez-y : `BOT_TOKEN=your_bot_token` en une seule ligne et en remplaçant your_bot_token par le token que vous avez reçu ou copié. Fermez ce fichier et renommez le en `.env` sans aucune autre extension.
- **Étape 9 :** Suivez ce [lien](https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.exe) qui vous permettra d'installer nvm-windows, un gestionnaire de version de Node.js, l'environnement dans lequel le bot fonctionne. Lancez l'exécutable et patientez.
- **Étape 9 :** Dans un terminal (touche Windows + R, tapez `cmd` et appuyez sur Entrée), tapez la commande `cd chemin` en remplaçant chemin par le chemin vers le répertoire (c'est-à-dire le dossier) où se situent tous vos fichiers. Vous pouvez trouver ce chemin dans votre explorateur de fichiers, avec un clic droit sur le répertoire en question, dans le champ Emplacement.
- **Étape 10 :** Si tout se passe bien, vous devez voir dans votre terminal le chemin vers votre dossier avant le champ où vous pouvez écrire. Tapez maintenant les commandes `nvm install 16`, puis `nvm use 16`, et enfin `npm install` en patientant si nécessaire le temps d'exécution des commandes. Une fois ceci fait, si tout a bien fonctionné, vous pouvez fermer votre terminal. Si l'une des deux premières commandes ne fonctionne pas, vous devriez peut-être reprendre l'étape 9 en ouvrant cette fois ci un terminal en mode administrateur (soit touche Windows + R, tapez `cmd` mais cette fois ci appuyez sur Ctrl, Shift et Entrée pour valider). Si la dernière commande ne fonctionne pas, vous pouvez simplement rouvrir un terminal, refaire l'étape 9 et récrire votre dernière commande.
- **Étape 11 :** Une fois tout ceci fait, vous n'avez plus qu'à ouvrir votre répertoire, créer un raccourci vers le fichier `start.bat` que vous placez sur votre bureau (je vous le conseille). Nous fournissons une icône pour le raccourci dans le dossier icon, vous pouvez clic droit sur votre raccourci, Propriétés, Changer d'icône, Parcourir, et sélectionnez l'icône de serpent dans le dossier icon. Renommez enfin votre raccourci en Cecrops. Pour lancer le bot, à tout moment, vous n'aurez plus qu'à double cliquer sur ce raccourci sur votre bureau. Cela ouvrira un terminal que vous devrez laisser tourner. Pour arrêter Cecrops, vous n'aurez qu'à fermer le terminal.

##  Comment mettre à jour Cecrops après l'ajout  de nouvelles fonctionnalités
***Si vous avez le moindre souci avec la mise à jour, contactez Erimdal#3544 sur Discord.***

 - **Étape 1 :** Bonne nouvelle ! Vous êtes déjà au bon endroit. Installez depuis ce lien git les fichiers du bot en cliquant sur le bouton de téléchargement (c'est une icône de téléchargement, pas du texte). Vous téléchargerez ainsi une archive que vous pouvez décompresser juste là où se situe votre bot (assurez vous de la décompresser dedans, et pas dans un dossier à l'intérieur). Si votre ordinateur vous demande la permission d'écraser des fichiers, remplacez tous les fichiers dans la destination.
 - **Étape 2 :** Dans un terminal (touche Windows + R, tapez `cmd` et appuyez sur Entrée), tapez la commande `cd chemin` en remplaçant chemin par le chemin vers le répertoire (c'est-à-dire le dossier) où se situent tous vos fichiers. Vous pouvez trouver ce chemin dans votre explorateur de fichiers, avec un clic droit sur le répertoire en question, dans le champ Emplacement.
 - **Étape 3 :** Si tout se passe bien, vous devez voir dans votre terminal le chemin vers votre dossier avant le champ où vous pouvez écrire. Tapez maintenant la commande `npm install` et patientez jusqu'à l'installation. Une fois ceci fait, si tout a bien fonctionné, vous pouvez fermer votre terminal.

## Auteur

 - Julien RAYNAL
 - [Serveur Discord](https://discord.gg/YEUe5wzw4b)
 - [Mail](mailto:julien.raynal@etu.univ-nantes.fr)

## Liste des fonctionnalités de Cecrops

À venir !