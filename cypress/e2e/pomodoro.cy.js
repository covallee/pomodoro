/// <reference types="cypress" />

describe('Pomodoro Timer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the pomodoro timer', () => {
    cy.contains('pomodoro').should('be.visible')
    cy.contains('25:00').should('be.visible')
  })

  it('has start and reset buttons', () => {
    cy.contains('button', 'Start').should('be.visible')
    cy.contains('button', 'Reset').should('be.visible')
  })

  it('can toggle between sitting and standing', () => {
    cy.contains('sitting').should('be.visible')
    cy.contains('standing').should('be.visible')
  })

  it('starts the timer when clicking Start', () => {
    cy.contains('button', 'Start').click()
    cy.contains('button', 'Pause').should('be.visible')
  })

  it('pauses the timer when clicking Pause', () => {
    cy.contains('button', 'Start').click()
    cy.contains('button', 'Pause').click()
    cy.contains('button', 'Start').should('be.visible')
  })

  it('resets the timer when clicking Reset', () => {
    cy.contains('button', 'Start').click()
    cy.wait(2000)
    cy.contains('button', 'Reset').click()
    cy.contains('25:00').should('be.visible')
    cy.contains('button', 'Start').should('be.visible')
  })
})
