# Booqloop

Une bibliothèque collaborative pour échanger des livres près de chez vous.

---

### Présentation

Booqloop est une application web d'échange de livres entre particuliers. Les utilisateurs peuvent proposer leurs livres à l'emprunt, parcourir les livres disponibles près de chez eux, envoyer une demande de prêt, et échanger directement via une messagerie intégrée. Inspiré des "boîtes à livres", l'objectif est de créer du lien social autour d'un intérêt commun, la lecture, à l'échelle du quartier. 

### Stack technique

| Couche | Technologies |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript, Material UI v7 |
| Backend | FastAPI, Python 3, Uvicorn |
| Base de données | PostgreSQL 14, SQLModel, Alembic |
| Conteneurisation | Docker, Docker Compose |
| Tests | Jest, React Testing Library, Pytest |
| CI | GitHub Actions |

### Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [Python](https://www.python.org/) >= 3.9
- [Docker](https://www.docker.com/) et Docker Compose

### Installation et démarrage

#### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd booqloop
```

#### 2. Configurer les variables d'environnement

Copier le fichier d'exemple et renseigner les valeurs :

```bash
cp .env.example .env
```

Variables à renseigner dans `.env` :

```env
# Base de données
DATABASE_URL=postgresql://user:password@db:5432/booqloop
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=booqloop

# Authentification JWT
JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

#### 3. Démarrer le backend et la base de données (Docker)

```bash
docker-compose up --build
```

L'API FastAPI est accessible sur `http://localhost:8000`.
La documentation interactive Swagger est disponible sur `http://localhost:8000/api/py/docs`.

#### 4. Appliquer les migrations Alembic

```bash
docker-compose exec web alembic upgrade head
```

#### 5. Démarrer le frontend (hors Docker)

Dans un nouveau terminal, depuis la racine du projet :

```bash
npm install
npm run dev
```

L'application est accessible sur `http://localhost:3000`.

### Lancer les tests

#### Tests frontend (Jest)

```bash
npm test
```

#### Tests frontend en mode watch

```bash
npm run test:watch
```

#### Tests frontend end-to-end (Playwright)

```bash
npx playwright test --headed
```

Afficher le détail des résultats :
```bash
npx playwright show-report
```

#### Tests backend (Pytest)

```bash
docker-compose exec web pytest
```

### Structure du projet

```
booqloop/
├── api/                        # Backend FastAPI
│   ├── main.py                 # Point d'entrée de l'API, configuration CORS
│   ├── models.py               # Modèles SQLModel (tables et schémas)
│   ├── services.py             # Logique métier, hachage, JWT
│   ├── security.py             # Vérification JWT, cookie httpOnly
│   ├── base.py                 # Configuration de base
│   └── routers/
│       ├── auth.py             # Inscription, connexion, déconnexion
│       ├── books.py            # CRUD des livres
│       ├── conversations.py    # Messagerie
│       └── users.py            # Gestion des profils
├── alembic/                    # Migrations de base de données
│   └── versions/               # Fichiers de migration versionnés
├── src/                        # Frontend Next.js
│   ├── app/
│   │   ├── (admin)/            # Pages connexion et inscription
│   │   ├── (main)/             # Pages principales (livres, messagerie, profil)
│   │   └── components/         # Composants React réutilisables
│   ├── context/                # Contextes React (Auth, Search)
│   ├── hooks/                  # Hooks personnalisés (useAuth, useSearch)
│   └── lib/
│       └── services/           # Fonctions d'appel à l'API
├── tests/                      # Tests backend Pytest
├── Dockerfile                  # Image Docker du backend
├── docker-compose.yml          # Orchestration backend + base de données
├── requirements.txt            # Dépendances Python
└── package.json                # Dépendances Node.js
```

### Commandes utiles

| Commande | Description |
|---|---|
| `docker-compose up --build` | Démarrer le backend et la BDD |
| `docker-compose down` | Arrêter les conteneurs |
| `docker-compose down -v` | Arrêter et supprimer les volumes |
| `docker-compose exec web alembic upgrade head` | Appliquer les migrations |
| `docker-compose exec web alembic revision --autogenerate -m "message"` | Créer une migration |
| `npm run dev` | Démarrer le frontend en développement |
| `npm run build` | Builder le frontend |
| `npm test` | Lancer les tests frontend |
| `npm run lint` | Linter le code frontend |
