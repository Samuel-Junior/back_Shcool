const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const cors = require('cors');
const { log } = require('console');

let jsonParser = bodyParser.json()

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});


// Tableau d'élèves
let eleves = [
    {
      "id": 1,
      "nom": "Dupont",
      "prenom": "Jean",
      "age": 13,
      "classe": "6ème",
      "specialite": "Sciences",
      "redouble": false
    },
    {
      "id": 2,
      "nom": "Leclerc",
      "prenom": "Emma",
      "age": 13,
      "classe": "6ème",
      "specialite": "Sports",
      "redouble": false
    },
    {
      "id": 3,
      "nom": "Lefebvre",
      "prenom": "Charlotte",
      "age": 12,
      "classe": "4ème",
      "specialite": "Musique",
      "redouble": false
    },
    {
      "id": 4,
      "nom": "Michel",
      "prenom": "Lucas",
      "age": 14,
      "classe": "3ème",
      "specialite": "Langues",
      "redouble": false
    },
    {
      "id": 5,
      "nom": "Dubois",
      "prenom": "Adam",
      "age": 12,
      "classe": "6ème",
      "specialite": "Technologie",
      "redouble": true
    },
    {
      "id": 6,
      "nom": "Petit",
      "prenom": "Chloé",
      "age": 14,
      "classe": "3ème",
      "specialite": "Sports",
      "redouble": false
    },
    {
      "id": 7,
      "nom": "Moreau",
      "prenom": "Léa",
      "age": 12,
      "classe": "4ème",
      "specialite": "Musique",
      "redouble": false
    },
    {
      "id": 8,
      "nom": "Simon",
      "prenom": "Hugo",
      "age": 13,
      "classe": "6ème",
      "specialite": "Technologie",
      "redouble": true
    },
    {
      "id": 9,
      "nom": "Rousseau",
      "prenom": "Thomas",
      "age": 14,
      "classe": "5ème",
      "specialite": "Sciences",
      "redouble": false
    },
    {
      "id": 10,
      "nom": "Fournier",
      "prenom": "Zoé",
      "age": 14,
      "classe": "5ème",
      "specialite": "Arts",
      "redouble": false
    },
    {
      "id": 11,
      "nom": "Garcia",
      "prenom": "Alexandre",
      "age": 15,
      "classe": "3ème",
      "specialite": "Arts",
      "redouble": true
    },
    {
      "id": 12,
      "nom": "Lecomte",
      "prenom": "Louis",
      "age": 14,
      "classe": "4ème",
      "specialite": "Sciences",
      "redouble": false
    }
  ];

// Middleware pour vérifier si un élève existe
function eleveExiste(req, res, next) {
  const id = parseInt(req.params.id);
  const eleve = eleves.find(e => e.id === id);
  if (!eleve) {
    return res.status(404).json({ message: "Élève non trouvé" });
  }
req.eleve = eleve
  next();
}

app.get('/', (req, res) => {
    res.send('Bienvenue sur le backend de Eleve-app.');
  });
// Liste tous les élèves
app.get('/eleves', (req, res) => {
  res.json(eleves);
});

// Récupère un élève par son ID
app.get('/eleves/:id', eleveExiste, (req, res) => {
  res.json(req.eleve);
});

// Ajoute un nouvel élève
app.post('/eleves', jsonParser,(req, res) => {
    console.log(req.body);
  const nouvelEleve = req.body;
  nouvelEleve.id = eleves.length + 1;
  eleves.push(nouvelEleve);
  res.status(201).json(nouvelEleve);
});

// Met à jour les informations d'un élève par son ID
app.put('/eleves/:id', [jsonParser,eleveExiste], (req, res) => {
    const editEleve = req.body;
    editEleve.id = req.eleve.id
    
    eleves = [...eleves.filter(eleve => eleve.id !== req.eleve.id), editEleve];
    console.log(eleves)
    res.status(200).json(editEleve)
  
});

// Supprime un élève par son ID
app.delete('/eleves/:id', eleveExiste, (req, res) => {
  const id = req.eleve.id;
  eleves = eleves.filter(e => e.id !== id);
  res.json({ message: "Élève supprimé avec succès" });
});

app.listen(port, () => {
  console.log( `Serveur démarré sur le port ${port}`);
});
