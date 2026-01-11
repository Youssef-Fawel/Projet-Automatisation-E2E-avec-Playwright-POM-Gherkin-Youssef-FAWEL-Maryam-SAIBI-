# Suite de tests E2E - DemoBlaze

## À propos du projet

Ce projet automatise les tests End-to-End (E2E) du site **demoblaze.com**, une plateforme e-commerce de démonstration. Il combine les tests Playwright avec l'approche BDD (Behavior-Driven Development) utilisant Cucumber et Gherkin.

### Fonctionnalités testées

- Navigation par catégories (Phone, Laptop, Monitor)
- Affichage des détails produits
- Ajout de produits au panier
- Gestion du panier (consultation, suppression)
- Processus de checkout complet
- Confirmation de commande

## Technologies utilisées

- **Playwright** - Framework de test E2E pour l'automatisation des navigateurs
- **Cucumber** - Framework BDD avec syntaxe Gherkin
- **Node.js** - Environnement d'exécution JavaScript
- **Microsoft Edge** - Navigateur configuré pour l'exécution des tests

## Installation

### Prérequis

- Node.js version 14 ou supérieure
- npm (inclus avec Node.js)
- Git

### Étapes d'installation

```bash
# 1. Cloner le repository
git clone https://github.com/Youssef-Fawel/Projet-Automatisation-E2E-avec-Playwright-POM-Gherkin-Youssef-FAWEL-Maryam-SAIBI-.git
cd demoblaze-tests-e2e

# 2. Installer les dépendances
npm install

# 3. Vérifier l'installation de Playwright
npx playwright --version
```

## Exécution des tests

### Tests Playwright

```bash
# Exécuter tous les tests (15 tests)
npm test

# Exécuter en mode headed (navigateur visible)
npm run test:headed

# Exécuter en mode debug
npm run test:debug
```

### Tests BDD (Cucumber)

```bash
# Exécuter les scénarios Cucumber (13 scénarios)
npm run bdd
```

## Structure du projet

```
demoblaze-tests-e2e/
├── features/                   # Scénarios Gherkin (BDD)
│   ├── navigation.feature
│   ├── shopping.feature
│   ├── checkout.feature
│   └── product.feature
├── pages/                      # Page Object Model (POM)
│   ├── basePage.js
│   ├── homePage.js
│   ├── categoryPage.js
│   ├── productDetailPage.js
│   ├── cartPage.js
│   └── checkoutPage.js
├── steps/                      # Implémentation des steps Cucumber
│   └── steps.js
├── tests/                      # Tests Playwright
│   ├── navigation.spec.js     (3 tests)
│   ├── shopping.spec.js       (4 tests)
│   ├── product.spec.js        (4 tests)
│   └── checkout.spec.js       (4 tests)
├── cucumber.js                 # Configuration Cucumber
├── playwright.config.js        # Configuration Playwright
├── package.json
└── README.md
```

## Scénarios testés

### Navigation (navigation.feature)

- Naviguer vers la catégorie Phone
- Naviguer vers la catégorie Laptop
- Naviguer vers la catégorie Monitor

### Produits (product.feature)

- Consulter les détails d'un produit Phone
- Consulter les détails d'un produit Laptop
- Consulter les détails d'un produit Monitor
- Ajouter un produit à partir de la page détail
- Consulter plusieurs produits successivement

### Panier (shopping.feature)

- Ajouter un produit au panier
- Ajouter plusieurs produits au panier
- Consulter le panier avec prix total
- Supprimer un produit du panier

### Checkout (checkout.feature)

- Accéder à la page de checkout
- Remplir le formulaire de checkout avec validation
- Compléter un achat avec confirmation
- Vérifier les informations de paiement

## Problèmes rencontrés et solutions

### 1. Stratégie d'attente inappropriée

**Problème** : La stratégie `waitForLoadState('networkidle')` causait des timeouts car le site a des requêtes en arrière-plan continues.

**Solution** : Remplacement par `domcontentloaded` avec des attentes spécifiques sur les éléments (`waitForSelector`).

### 2. Gestion des alertes JavaScript

**Problème** : L'ajout au panier déclenche une alerte JavaScript qui bloquait l'exécution si non gérée.

**Solution** : Ajout d'un listener `page.once('dialog')` pour accepter automatiquement l'alerte avant le clic.

### 3. Sélecteurs incorrects

**Problème** : Certains sélecteurs CSS ne correspondaient pas aux éléments réels de la page.

**Solution** : 
- Bouton "Add to cart" : changement de `button:has-text("Add to cart")` vers `.btn-success`
- Prix total : changement de `h3 strong` vers `#totalp`

### 4. Timeouts dans les tests BDD

**Problème** : Les scénarios Cucumber utilisaient le timeout par défaut de 5 secondes, insuffisant pour certaines opérations.

**Solution** : Configuration de timeouts personnalisés (30-60 secondes) dans `cucumber.js` et pour les steps spécifiques.

## Bonnes pratiques appliquées

- **Page Object Model (POM)** : Séparation claire entre la logique des tests et les interactions avec la page
- **DRY (Don't Repeat Yourself)** : Méthodes réutilisables dans `basePage.js`
- **BDD avec Gherkin** : Scénarios lisibles par tous les membres de l'équipe
- **Tests indépendants** : Chaque test peut s'exécuter individuellement sans dépendance
- **Gestion des erreurs** : Handling approprié des timeouts et des éléments dynamiques
- **Configuration centralisée** : Tous les paramètres dans `playwright.config.js` et `cucumber.js`

## Résultats des tests

### Tests Playwright
```
tests/navigation.spec.js    3 tests PASSED
tests/shopping.spec.js      4 tests PASSED
tests/product.spec.js       4 tests PASSED
tests/checkout.spec.js      4 tests PASSED

Total: 15 tests PASSED
```

### Tests BDD (Cucumber)
```
13 scenarios PASSED
63 steps PASSED
```

## Site testé

- **URL** : https://www.demoblaze.com
- **Type** : Plateforme e-commerce de démonstration
- **Catégories disponibles** : Phone, Laptop, Monitor

## Configuration

Le projet est configuré pour :
- Exécuter les tests sur **Microsoft Edge** (configurable dans `playwright.config.js`)
- Mode **headed** par défaut (navigateur visible)
- **SlowMo** activé à 500ms pour une meilleure visualisation
- **Pause automatique** après chaque test pour inspection
- **Screenshots** et **vidéos** en cas d'échec

## Auteurs

- **Youssef FAWEL**
- **Maryam SAIBI**
- **Date** : Janvier 2026

## Lien du repository

https://github.com/Youssef-Fawel/Projet-Automatisation-E2E-avec-Playwright-POM-Gherkin-Youssef-FAWEL-Maryam-SAIBI-

---

**Dernière mise à jour** : 11 janvier 2026

