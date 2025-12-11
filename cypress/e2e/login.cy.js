describe('login page', () => {
    it('can submit login form', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('#email').type('student1.group3@ekod.fr');
    cy.get('#password').type('password123');
    cy.contains('Se connecter').click();
    });
});