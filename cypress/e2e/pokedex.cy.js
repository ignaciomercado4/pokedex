/// <reference types="cypress" />
describe('pokédex', () => {
  beforeEach('visit page', () => {
    cy.visit('ignaciomercado4.github.io/pokedex/');
  });

  it('should have pokémon container', () => {
    cy.get('#pokemon-container').should('exist');
  });


  it('should load first 20 pokémons', () => {
    cy.get('#pokemon-container').should('exist');
    cy.wait(600);
    cy.get('.pokemon-card').should('exist').and('have.length.above', 19);
  });
})