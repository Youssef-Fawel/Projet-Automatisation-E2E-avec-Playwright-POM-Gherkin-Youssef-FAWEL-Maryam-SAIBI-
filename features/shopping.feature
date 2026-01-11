Feature: Achat de produits

  Scenario: Ajouter un produit au panier
    Given je suis sur la page d'accueil
    When je clique sur la catégorie "Phone"
    And je clique sur le premier produit
    And j'ajoute le produit au panier
    Then le panier contient 1 article

  Scenario: Consulter le panier
    Given j'ai ajouté un produit au panier
    When j'accède au panier
    Then je vois le produit dans le panier
    And je vois le prix total

  Scenario: Supprimer un produit du panier
    Given j'ai des produits dans le panier
    When j'accède au panier
    And je supprime le premier article
    Then le panier contient un article de moins

  Scenario: Ajouter plusieurs produits au panier
    Given je suis sur la page d'accueil
    When je clique sur la catégorie "Phone"
    And je clique sur le premier produit
    And j'ajoute le produit au panier
    And je reviens à l'accueil
    And je clique sur la catégorie "Laptop"
    And je clique sur le premier produit
    And j'ajoute le produit au panier
    Then le panier contient 2 articles
