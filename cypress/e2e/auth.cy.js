describe('Authentication', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it('can login as student', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('#email').type('student1.group3@ekod.fr');
    cy.get('#password').type('password123');
    cy.contains('Se connecter').click();
    cy.url().should('include', '/offers');
    cy.contains('Offres disponibles');
  });

  it('can login as company', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('#email').type('company1.group3@ekod.fr');
    cy.get('#password').type('password123');
    cy.contains('Se connecter').click();
    cy.url().should('include', '/my-offers');
    cy.contains('Offres publiées');
  });

  it('shows error with wrong credentials', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('#email').type('wrong@email.com');
    cy.get('#password').type('wrongpass');
    cy.contains('Se connecter').click();
    cy.contains(/erreur|incorrect/i);
    cy.url().should('include', '/login');
  });
});

