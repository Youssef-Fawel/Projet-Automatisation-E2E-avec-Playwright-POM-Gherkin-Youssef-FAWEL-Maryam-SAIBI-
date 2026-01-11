Feature: Détails des produits

  Scenario: Consulter les détails d'un produit
    Given je suis sur la page d'accueil
    When je clique sur la catégorie "Phone"
    And je clique sur le premier produit
    Then je vois le nom du produit
    And je vois le prix du produit
    And je vois la description du produit

  Scenario: Ajouter un produit à partir de la page détail
    Given je suis sur la page d'accueil
    When je clique sur la catégorie "Laptop"
    And je clique sur le premier produit
    And j'ajoute le produit au panier
    Then un message de confirmation s'affiche
    And le panier contient 1 article

  Scenario: Consulter plusieurs produits
    Given je suis sur la page d'accueil
    When je clique sur la catégorie "Phone"
    And je clique sur le premier produit
    And je reviens à l'accueil
    And je clique sur la catégorie "Monitor"
    And je clique sur le premier produit
    Then je vois le nom du produit
