describe('Student Flow', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('GET', '**/offers**').as('getOffers');
    cy.visit('http://localhost:5173/login');
    cy.get('#email').type('student1.group3@ekod.fr');
    cy.get('#password').type('password123');
    cy.contains('Se connecter').click();
    cy.url().should('include', '/offers');
    cy.wait('@getOffers', { timeout: 15000 }).its('response.statusCode').should('be.oneOf', [200, 304]);
  });

  it('can see list of offers', () => {
    cy.url().should('include', '/offers');
    cy.contains(/Offres disponibles/i);
  });

  it('can search offers', () => {
    const searchSelector = 'input[placeholder*="Rechercher"], input[name="search"]';
    cy.get(searchSelector).type('React');
    cy.wait(500);
    cy.url().should('include', '/offers');
    cy.contains(/React/i);
  });

  it('can view offer details', () => {
    cy.contains('Voir l’offre').first().click({ force: true });
    cy.url().should('include', '/offers/');
    cy.contains('Postuler');
    cy.get('[data-testid="offer-description"], .offer-description').should('be.visible');
  });

  it('can apply to an offer', () => {
    cy.contains('Voir l’offre').first().click({ force: true });
    cy.contains('Postuler').click();
    cy.contains('Envoyer').click({ force: true });
    cy.contains(/candidature|envoyée|envoyé/i);
  });
});

