# AxelFayet_7_14042022
<em>README EN COURS D'EDITION !</em>
<h1>P7 GROUPOMANIA</h1>
  <p>Bienvenue sur le repo contenant l'application du réseau social déstiné à Groupomania !</p>
<h2>Pré-requis et technologies utilisées</h2>

  <p>Cette application à été développée à l'aide de plusieurs langages :
  
  <ul>
    <strong>- Côté serveur :</strong>
    <li>Javascript à été utilisé pour créer la partie backend du projet.</li>
    <li>Ce backend fonctionne avec <a href="https://nodejs.org/">Node.js</a> ainsi que son infrastructure <a href="https://expressjs.com/fr/">Express</a></li>
    <li>Une base de données <a href="https://www.mysql.com/">MySql</a> permet de gérer les requêtes du serveur</li>
    <li>L'ORM (Object-relational mapping) <a href="https://sequelize.org/">Sequelize</a> va permettre la création et la gestion des modèles de cette base de données.</li>
    <strong>- Côté client :</strong>
    <li>Le frontend à été réalisé à l'aide de la version client du framework <a href="https://vuejs.org/">Vue JS</a></li>
    <li><a href="https://vitejs.dev/">Vite JS</a> va être utilisé pour faire tourner le serveur côté client.</li>
  </ul>
<h3>Installation du backend</h3>
	<em><a href="https://nodejs.org/">Node.js</a> est nécéssaire pour faire fonctionner l'application. Pour l'installer, rendez-vous <a href="https://nodejs.org/en/download/">ici</a></em>
  <p>Tout d'abord, clonez ce repo en local sur votre machine, puis à partir de votre éditeur de code rendez vous dans le dossier <code>.\backend\</code> pour y effectuer	l'installation du serveur en saisissant <code>npm install</code>.</p>
	<p><strong>Avant de lancer le serveur</strong> il vous faudra créer votre propre fichier <code>.env</code> à la racine du dossier backend. Vous pouvez pour cela suivre l'exemple du fichier .env-type situé à la racine de ce dossier.</p>
	<p>Une fois votre fichier .env correctement paramétré vous pourrez lancer le serveur à l'aide de la commande <code>npm start</code>.</p>
	<strong><em>Par défaut le serveur utilisera le port <a href="http://localhost:3000">3000</a>, il est fortement recommandé de laisser ce réglage par défaut</em>.</strong>
<h3>Installation du frontend</h3>
	<p>Le frontend se situe dans le dossier <code>.\frontend\</code> de ce repository.<p>
	<p>Le frontend requiers <strong>Vue Cli</strong> pour fonctionner. Pour l'installer, il suffit d'effectuer un <code>npm i -g @vue/cli</code> à la racine du dossier frontend (Vous pouvez consulter la documentation <a href="https://cli.vuejs.org/">ici</a>).</p>
	<p>Ensuite, installer les dépendances du frontend en effectuant un <code>npm install</code> à la racine du dossier frontend.</p>
	<p>Enfin, lancer la commande <code>npm start</code> afin de démarrer le serveur frontend. Par défaut, il se lancera sur le port <a href="http://localhost:8080">8080</a> de votre machine. <strong><em>Il est fortement recommandé de laisser ce réglage par défaut</em></strong></p>
	<strong><em>Lors de l'installation des dépendances, la console peut vous signaler des vulnérabilités. Il est recommander de lancer la commande <code>npm audit fix</code> afin d'assurer le bon fonctionnement des dépendances</em>.</strong>
<br>
<br>
<p>Pour toutes questions, vous pouvez me contacter dirctement via mon adresse <a href="mailto:axel.fayet97@gmail.com">mail</a>.</p>
