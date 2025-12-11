describe('Flux essentiels', () => {
  const studentEmail = 'student1.group3@ekod.fr';
  const companyEmail = 'company1.group3@ekod.fr';
  const password = 'password123';

  const loginAs = (email) => {
    cy.visit('http://localhost:5173/login');
    cy.get('#email').clear().type(email);
    cy.get('#password').clear().type(password);
    cy.contains('Se connecter').click();
  };

  it('connexion étudiant et accès aux offres', () => {
    loginAs(studentEmail);
    cy.url().should('include', '/offers');
    cy.contains('Offres disponibles');
  });

  it('déconnexion étudiant depuis la barre latérale', () => {
    loginAs(studentEmail);
    cy.url().should('include', '/offers');
    cy.contains('Déconnexion').click();
    cy.url().should('include', '/login');
    cy.get('#email').should('be.visible');
  });

  it('modifier le nom du profil étudiant', () => {
    const newName = 'Cypress Étudiant';
    loginAs(studentEmail);
    cy.url().should('include', '/offers');
    cy.contains('Profil').click();
    cy.url().should('include', '/profile');
    cy.contains('Modifier').click();
    cy.get('#name').clear().type(newName);
    cy.contains('Enregistrer').click();
    cy.contains(/succès|mis à jour/i);
    cy.get('#name').should('have.value', newName);
  });

  it('connexion entreprise et accès aux offres publiées', () => {
    loginAs(companyEmail);
    cy.url().should('include', '/my-offers');
    cy.contains('Offres publiées');
  });
});

