import { describe, it } from 'cypress';
import { cy } from 'cypress';

describe('login page', () => {
    it('can submit login form', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type('student1.group3@ekod.fr');
    cy.get('input[name="password"]').type('password123');
    cy.contains('Connexion').click();
    });
});