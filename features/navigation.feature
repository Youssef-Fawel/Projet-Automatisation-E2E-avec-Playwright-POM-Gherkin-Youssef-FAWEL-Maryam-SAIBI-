Feature: Navigation sur les catégories

  Scenario: Consulter la catégorie Phone
    Given je suis sur la page d'accueil
    When je clique sur la catégorie "Phone"
    Then je vois une liste de produits

  Scenario: Consulter la catégorie Laptop
    Given je suis sur la page d'accueil
    When je clique sur la catégorie "Laptop"
    Then je vois une liste de produits

  Scenario: Consulter la catégorie Monitor
    Given je suis sur la page d'accueil
    When je clique sur la catégorie "Monitor"
    Then je vois une liste de produits
