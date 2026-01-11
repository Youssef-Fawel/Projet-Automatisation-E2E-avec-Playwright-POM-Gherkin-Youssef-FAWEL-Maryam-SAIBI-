Feature: Processus de paiement

  Scenario: Accéder à la page de checkout
    Given j'ai un produit dans le panier
    When j'accède au panier
    And je clique sur "Place Order"
    Then le formulaire de paiement s'affiche

  Scenario: Remplir le formulaire de checkout
    Given je suis sur la page de checkout
    When je remplis le formulaire avec les informations valides
    Then le formulaire est rempli correctement

  Scenario: Compléter un achat
    Given j'ai un produit dans le panier
    When j'accède au panier
    And je clique sur "Place Order"
    And je remplis le formulaire de checkout
    And je clique sur "Purchase"
    Then un message de confirmation s'affiche
