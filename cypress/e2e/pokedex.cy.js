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

  it('should display each pokémons respective data', () => {
    cy.get('#pokemon-container').should('exist');
    cy.wait(600);
    cy.get('.pokemon-card').first().should('exist');
    cy.get('.pokemon-name-and-id').first().should('have.text', 'Bulbasaur #1');
    cy.get('.pokemon-height').eq(0).should('have.text', '0.7 mts / 2ft 4in');
    cy.get('.pokemon-weight').eq(0).should('have.text', '6.9 kg / 15.2 lbs');
    cy.get('.pokemon-type').eq(0).should('have.text', 'grass, poison');

  })
})