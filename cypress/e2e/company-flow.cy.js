describe('Company Flow', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('GET', '**/companies/offers**').as('getCompanyOffers');
    cy.visit('http://localhost:5173/login');
    cy.get('#email').type('company1.group3@ekod.fr');
    cy.get('#password').type('password123');
    cy.contains('Se connecter').click();
    cy.url().should('include', '/my-offers');
    cy.wait('@getCompanyOffers', { timeout: 15000 }).its('response.statusCode').should('be.oneOf', [200, 304]);
  });

  it('can see company offers list', () => {
    cy.contains('Offres publiées');
    cy.contains(/Aucune offre|Pas d'offre/i).then(
      () => {},
      () => {
        cy.contains('Éditer').should('exist');
      }
    );
  });

  it('can view one of its offers', () => {
    cy.contains('Éditer').first().click();
    cy.url().should('include', '/my-offers/');
    cy.contains(/candidature|candidatures|postulant/i);
  });

  it('can create a new offer', () => {
    cy.contains(/Créer une offre|Nouvelle offre/i).click();
    cy.get('input[name="title"]').type('Stage React Cypress');
    cy.get('textarea[name="description"]').type('Tester le flux étudiant avec Cypress.');
    cy.get('select[name="contractType"]').then(($select) => {
      // Sélectionne "Stage" si dispo, sinon la première option
      const stageOption = $select.find('option').filter((i, el) => /stage/i.test(el.innerText) || /stage/i.test(el.value));
      if (stageOption.length) {
        cy.wrap($select).select(stageOption.first().val());
      } else {
        cy.wrap($select).find('option').eq(0).then((opt) => cy.wrap($select).select(opt.val()));
      }
    });
    cy.get('input[name="location"]').type('Paris');
    cy.get('input[name="keywords"]').type('React, Cypress');
    cy.contains(/Publier|Enregistrer/i).click();
    cy.url().should('include', '/my-offers');
  });
});

