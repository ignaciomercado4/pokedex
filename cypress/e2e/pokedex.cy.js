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

    cy.get('.pokemon-name-and-id').first().invoke('text').then(text => {
      expect(text.trim()).to.equal('Bulbasaur #1');
    });

    cy.get('.pokemon-height').first().invoke('text').then(text => {
      expect(text.trim()).to.equal('Height: 0.7 mts / 2ft 4in');
    });

    cy.get('.pokemon-weight').first().invoke('text').then(text => {
      expect(text.trim()).to.equal('Weight: 6.9 kg / 15.2 lbs');
    });

    cy.get('.pokemon-type').first().invoke('text').then(text => {
      expect(text.trim()).to.equal('Type(s): grass, poison');
    });
  });

  it('should display 20 more pokémon cards after scrolling to the bottom', () => {
    cy.wait(600);
    cy.get('.pokemon-card').should('exist').and('have.length.above', 19);
    cy.scrollTo('bottom');
    cy.get('#loading-message').invoke('text').then(text => {
      expect(text.trim()).to.equal('Loading...');
    });
    cy.wait(600);
    cy.get('.pokemon-card').should('exist').and('have.length.above', 39);
  });

  it('should display correct pokemon data after loading more pokémon', () => {
    cy.wait(600);
    cy.get('.pokemon-card').should('exist').and('have.length.above', 19);

    cy.scrollTo('bottom');
    cy.wait(600);
    cy.get('.pokemon-card').eq(20).should('exist');

    cy.get('.pokemon-name-and-id').eq(20).invoke('text').then(text => {
      expect(text.trim()).to.equal('Spearow #21');
    });

    cy.get('.pokemon-height').eq(20).invoke('text').then(text => {
      expect(text.trim()).to.equal('Height: 0.3 mts / 0ft 12in');
    });

    cy.get('.pokemon-weight').eq(20).invoke('text').then(text => {
      expect(text.trim()).to.equal('Weight: 2.0 kg / 4.4 lbs');
    });

    cy.get('.pokemon-type').eq(20).invoke('text').then(text => {
      expect(text.trim()).to.equal('Type(s): normal, flying');
    });
  });
});