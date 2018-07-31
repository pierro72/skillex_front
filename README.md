
Prerequis
------------
-  Node.js
- Angular Cli

Installation
------------
- Installation des dépendances, depuis le dossier projet front :
```
npm install
```


Setup
------------
- Lancer l'application avec le serveur embarqué depuis le dossier projet front: 
```
npm start
``` 
ou
```
ng serve
```
- Pour commencer la navigation [http://localhost:4200/](http://localhost:4200/)
- Cependant pour utiliser skillex il faut passé des arguments a l'url, exemple : [demo](http://localhost:4200/?apiKey=d3f4db3ad6e9&user=Th%C3%A9r%C3%A8se+Anquetil&role=pilote&id_user=3&admin=true&team=TMA+AssurIARD&id_team=3&appName=Skillex)



Deployer sur serveur CentOs
------------


* Login : administrateur
* Password : Adm#CdsLeMans01
* Le client putty est utilisé pour se connecter en SSH
* Le client SFTP/SCP WinSCP permet de se connecter aux serveurs SSH pour transférer des fichiers.
* Suivi ticket : http://glpi.sodifrance.fr/front/ticket.form.php?id=24351

### Générer le build front
* Se placer dans le dossier skillex et lancer la commande suivante 
```
ng build --test --base-href=./
```
```
ng build --env=test --base-href=./
```
* Alternativement avec le cli local
```
npm run-script ng build --env=test --base-href=./
npm run ng -- build --env=test --base-href=./
```

#### Procedure de deploiement Angular
* Transferer le 'dossier' vers le home administrateur avec WinSCP.
* Désactiver le serveur tomcat : 
```
sudo service tomcat stop
```
* Suprimer l'ancien dossier : 
```
sudo rm -r /opt/tomcat/webapps/skillex
```
* Copier le dossier présent dans le home administrateur vers /opt/tomcat/webapps : 
```
sudo mv dist /opt/tomcat/webapps/skillex
```
* Relancer Tomcat : 
```
sudo service tomcat start
```
* url de test 
```
http://azr-cds-lemans-01.sodifrance.fr:8080/skillex/?apiKey=d3f4db3ad6e9&user=Karim+krakhila&role=collaborateur&id_user=24&admin=false&team=CDS+P9+Recouvrement&id_team=2&appName=Skillex
```


