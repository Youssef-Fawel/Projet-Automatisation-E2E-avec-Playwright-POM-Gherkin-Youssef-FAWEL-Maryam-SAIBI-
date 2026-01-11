# Suite de tests E2E - DemoBlaze

## 📋 À propos du projet

Ce projet automatise les tests E2E du site **demoblaze.com** (plateforme e-commerce de démonstration).

### Fonctionnalités testées
- ✅ Navigation par catégories (Phone, Laptop, Monitor)
- ✅ Affichage des détails produits
- ✅ Ajout au panier
- ✅ Gestion du panier (suppression)
- ✅ Processus de checkout complet
- ✅ Confirmation de commande

## 🛠️ Technologies utilisées

- **Playwright** : Framework de test E2E
- **Cucumber** : Tests BDD avec Gherkin
- **Node.js** : Runtime JavaScript

## 📦 Installation

### Prérequis
- Node.js 14+ installé
- npm installé

### Étapes
```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/demoblaze-tests-e2e.git
cd demoblaze-tests-e2e

# 2. Installer les dépendances
npm install

# 3. Vérifier l'installation
npx playwright --version
```

## 🚀 Exécution des tests

### Tests Playwright
```bash
# Tous les tests
npm test

# Mode headed (voir le navigateur)
npm run test:headed

# Mode debug
npm run test:debug
```

### Tests BDD (Cucumber)
```bash
npm run bdd
```

## 📂 Structure du projet
```
demoblaze-tests-e2e/
├── features/                   # Scénarios Gherkin
│   ├── navigation.feature
│   ├── shopping.feature
│   ├── checkout.feature
│   └── product.feature
├── pages/                      # Modèle POM
│   ├── basePage.js
│   ├── homePage.js
│   ├── categoryPage.js
│   ├── productDetailPage.js
│   ├── cartPage.js
│   └── checkoutPage.js
├── steps/                      # Implémentation steps Cucumber
│   └── steps.js
├── tests/                      # Tests Playwright
│   ├── navigation.spec.js
│   ├── shopping.spec.js
│   ├── product.spec.js
│   └── checkout.spec.js
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

## 📝 Scénarios Testés

### Navigation (`navigation.feature`)
- ✅ Naviguer vers la catégorie Phone
- ✅ Naviguer vers la catégorie Laptop
- ✅ Naviguer vers la catégorie Monitor

### Produits (`product.feature`)
- ✅ Consulter les détails d'un produit
- ✅ Ajouter un produit à partir de la page détail
- ✅ Consulter plusieurs produits

### Panier (`shopping.feature`)
- ✅ Ajouter un produit au panier
- ✅ Ajouter plusieurs produits au panier
- ✅ Consulter le panier
- ✅ Supprimer un produit du panier

### Checkout (`checkout.feature`)
- ✅ Accéder à la page de checkout
- ✅ Remplir le formulaire de checkout
- ✅ Compléter un achat

## 🐛 Difficultés Rencontrées

### 1. Sélecteurs CSS
**Problème** : Les sélecteurs CSS de DemoBlaze étaient génériques
**Solution** : Utilisation de locators flexibles et de `waitForLoadState()`

### 2. Temps de chargement
**Problème** : Les pages prennent du temps à charger
**Solution** : Ajout de `waitForLoadState('networkidle')` après chaque navigation

### 3. Modal de confirmation
**Problème** : Le message de confirmation apparaît dans une modal
**Solution** : Récupération du texte avec un sélecteur spécifique

## ✅ Bonnes Pratiques Appliquées

- ✅ **POM** : Séparation logique des pages en classes
- ✅ **DRY** : Code réutilisable dans `basePage.js`
- ✅ **BDD** : Scénarios Gherkin lisibles et maintenables
- ✅ **Tests Indépendants** : Chaque test peut s'exécuter seul
- ✅ **Commits Clairs** : Messages de commit explicites

## 📊 Résultats des Tests
```
✓ tests/navigation.spec.js (3 tests)
✓ tests/shopping.spec.js (4 tests)
✓ tests/product.spec.js (4 tests)
✓ tests/checkout.spec.js (5 tests)

Total: 16 tests ✓ PASSED
```

## 🔗 Site Testé

- **URL** : https://www.demoblaze.com
- **Type** : E-commerce de démonstration
- **Catégories** : Phone, Laptop, Monitor

## 👤 Auteur

- **Nom** : Votre Nom
- **Date** : Janvier 2026
- **Email** : votre-email@example.com

---

**Dernière mise à jour** : 11 janvier 2026
