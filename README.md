# Project_bamana


**MyPicture** est une application web de partage de photos où les utilisateurs peuvent s’inscrire, se connecter, créer des posts avec images, les modifier ou supprimer, et filtrer les posts par recherche ou tri. Développée avec **Ruby on Rails 7** (backend) et **Next.js 14** (frontend), elle utilise **PostgreSQL** pour la base de données et **Tailwind CSS** pour le style.

## Fonctionnalités
- **Inscription et connexion** : Créez un compte ou connectez-vous avec un nom d’utilisateur et mot de passe.
- **Posts** : Publiez des posts avec titres, contenu et images (via ActiveStorage), modifiez-les ou supprimez-les.
- **Filtres** : Recherchez des posts par titre ou contenu, triez par date ou titre (croissant/décroissant).
- **Déconnexion** : Supprime le token du `localStorage` pour une déconnexion rapide.
- **Tests** : Tests unitaires avec RSpec (backend) et Jest (frontend), couverture d’environ 50 %.

## Prérequis
- **Ruby** : 3.3.2
- **Node.js** : 18 ou supérieur
- **PostgreSQL** : 15 ou supérieur
- **npm** : Pour gérer les dépendances frontend
- **Git** : Pour cloner le dépôt

## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/Alaintchougbo1/Project_bamana.git
cd Project_bamana



Project_bamana>backend_rails> bundle install


backend_rails> rails server

Project_bamana>frontend> npm install

frontend>npm run dev --port=3001
