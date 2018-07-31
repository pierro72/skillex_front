## Composant


* LocalStorage support
* SessionStorage support
* cool-storage 
* HttpClient : HttpClient est le mécanisme d'Angular pour communiquer avec un serveur distant via HTTP


## NPM

* npm install
* npm -i -g -npm-check-updates
* npm-check-updates -u
* npm start

## Stockage des données locales : Web Storage

    * L'API Web Storage fournit des mécanismes par lesquels les navigateurs peuvent stocker des paires clé / valeur, d'une manière beaucoup plus intuitive que l'utilisation de cookies.

Web Storage met à disposition deux interfaces :

* sessionStorage : L'interface sessionStorage mémorise les données sur la durée d'une session de navigation, et sa portée est limitée à la fenêtre ou l'onglet actif. Lors de sa fermeture, les données sont effacées. Contrairement au cookies,  il n'y a pas d'interférence. Chaque stockage de session est limité à un domaine.

* localStorage : L'interface localStorage mémorise les données sans limite de durée de vie. Contrairement à sessionStorage, elles ne sont pas effacées lors de la fermeture d'un onglet ou du navigateur. La portée de localStorage est de facto plus large : il est possible de l'exploiter à travers plusieurs onglets ouverts pour le même domaine ou plusieurs fenêtres ; à partir du moment où il s'agit bien sûr du même navigateur.

https://developer.mozilla.org/fr/docs/Web/API/Window/sessionStorage
