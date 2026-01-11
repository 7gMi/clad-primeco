# 🏗️ ARCHITECTURE DU SITE - VERSION HTML

## 📁 Structure des fichiers

```
html-version/
│
├── 📄 Home.html                    # Page d'accueil avec slider
├── 📄 About.html                   # Page À propos
├── 📄 Contact.html                 # Page Contact avec formulaire
│
├── 📁 css/                         # Feuilles de style
│   ├── styles.css                  # Styles globaux (header, footer, navigation)
│   ├── home.css                    # Styles spécifiques à la page d'accueil
│   ├── about.css                   # Styles spécifiques à la page À propos
│   └── contact.css                 # Styles spécifiques à la page Contact
│
├── 📁 js/                          # Scripts JavaScript
│   ├── main.js                     # Fonctions globales (navigation, utilitaires)
│   ├── home.js                     # Logique du slider et interactions page d'accueil
│   ├── about.js                    # Interactions page À propos
│   └── contact.js                  # Validation formulaire et interactions Contact
│
└── 📁 images/                      # Ressources visuelles
    ├── 📁 logo/                    # Identité de marque
    │   ├── logo-desktop.png        # Logo version desktop
    │   ├── logo-mobile.png         # Logo version mobile
    │   └── logo-tab.png            # Logo version tablette/favicon
    │
    ├── 📁 backgrounds/             # Images de fond et slider
    │   ├── kingspan-panel.jpg      # Panneaux Kingspan
    │   ├── aluminium-cladding.jpg  # Bardage aluminium
    │   ├── aluminium-copings.jpg   # Couvertines aluminium
    │   ├── architectural-panels.jpg # Panneaux architecturaux
    │   ├── amazon-dub104.jpg       # Projet Amazon Dublin
    │   └── 4k.jpg                  # Image haute résolution
    │
    ├── 📁 architectural-panels/    # Galerie panneaux architecturaux
    │   ├── architectural-panels.jpg
    │   ├── amazon1.jpg
    │   ├── amazon2.jpg
    │   ├── amazon3.jpg
    │   └── amazon4.jpg
    │
    └── 📁 aluminium-copings/       # Galerie couvertines
        ├── aluminium-copings.jpg
        ├── aluminium-coppings-1.jpg
        ├── aluminium-coppings-2.jpg
        └── aluminium-coppings-3.jpg
```

---

## 🎯 ORGANISATION DES FICHIERS

### 📄 **Pages HTML (3 fichiers)**
- **Home.html** : Page d'accueil avec slider automatique de 5 slides
- **About.html** : Présentation de l'entreprise et de son expertise
- **Contact.html** : Formulaire de contact avec validation JavaScript

### 🎨 **CSS (4 fichiers)**
- **styles.css** : Styles globaux (header, footer, navigation, reset)
- **home.css** : Slider, hero cards, animations page d'accueil
- **about.css** : Layout en colonnes, images et contenu page À propos
- **contact.css** : Formulaire, validation visuelle, carte interactive

### ⚙️ **JavaScript (4 fichiers)**
- **main.js** : Navigation responsive, menu burger, utilitaires globaux
- **home.js** : Logique du slider (auto-play, navigation, indicateurs)
- **about.js** : Animations et interactions page À propos
- **contact.js** : Validation formulaire, gestion des erreurs, envoi

### 🖼️ **Images (4 dossiers)**
- **logo/** : Identité visuelle (3 formats adaptatifs)
- **backgrounds/** : Images principales du slider et sections (6 images)
- **architectural-panels/** : Galerie photos projets Amazon (5 images)
- **aluminium-copings/** : Galerie photos couvertines (4 images)

---

## 🔗 LIENS ENTRE LES FICHIERS

### Chaque page HTML charge :
```html
<!-- Styles CSS -->
<link rel="stylesheet" href="css/styles.css">      <!-- Styles globaux -->
<link rel="stylesheet" href="css/[page].css">      <!-- Styles spécifiques -->

<!-- Scripts JavaScript -->
<script src="js/main.js"></script>                 <!-- Fonctions globales -->
<script src="js/[page].js"></script>               <!-- Logique spécifique -->
```

### Organisation modulaire :
- **1 page HTML** = **1 fichier CSS** + **1 fichier JS** dédié
- Séparation claire des responsabilités
- Facilite la maintenance et les mises à jour
- Code réutilisable et organisé

---

## ✨ AVANTAGES DE CETTE ARCHITECTURE

✅ **Modularité** : Chaque page a ses propres styles et scripts
✅ **Performance** : Chargement uniquement des ressources nécessaires
✅ **Maintenance** : Code organisé et facile à mettre à jour
✅ **Scalabilité** : Facile d'ajouter de nouvelles pages/fonctionnalités
✅ **SEO** : Structure claire pour les moteurs de recherche
✅ **Responsive** : Images adaptatives selon l'appareil (logo-mobile/desktop/tab)

---

## 📊 POIDS TOTAL DU PROJET

| Type | Quantité | Détail |
|------|----------|--------|
| **HTML** | 3 fichiers | Home, About, Contact |
| **CSS** | 4 fichiers | styles, home, about, contact |
| **JS** | 4 fichiers | main, home, about, contact |
| **Images** | 18 fichiers | 3 logos + 15 photos projets |
| **Total** | **29 fichiers** | Architecture complète et optimisée |

---

*Architecture conçue selon les standards HTML5 et les best practices du développement web moderne.*
