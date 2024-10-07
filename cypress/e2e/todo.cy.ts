import { PRIORITY } from '../../src/utils/consts'

describe('Todo List', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:5173');
    cy.visit('/')
  })

  it('shows a message on initial load', () => {
    cy.contains('No tasks added')
    cy.contains('Take nap')
    // contains a image with alt as Cat Sleeping
    cy.get('img').should('have.attr', 'alt', 'Cat Sleeping')
  })

  it('Testing Task addition to Deletion Flow', () => {
    cy.get('input[placeholder="Title Starts Here..."]').type('Test To-Do')
    cy.get('textarea[placeholder="Describe your thoughts..."]').type('Test Description')
    cy.get('button[aria-label="Add"]').click()
    cy.get('label[title="Test To-Do"]').should('have.length', 1)

    cy.get('[data-testid="accordion-icon"').click()
    cy.contains('No subtasks')

    cy.get('[data-testid="remove-Test To-Do"]').click()
    cy.get('label[title="Test To-Do"]').should('have.length', 0)
  })

  it('Add Task with 4 different priorities', () => {
    Object.values(PRIORITY).forEach((priority, index) => {
      cy.get('input[placeholder="Title Starts Here..."]').type('Test To-Do')
      cy.get('textarea[placeholder="Describe your thoughts..."]').type('Test Description')
      cy.get('[data-testid="select-flag"]').click()
      cy.get('li').contains(priority).click()
      cy.get('button[aria-label="Add"]').click()

      cy.get('label[title="Test To-Do"]').should('have.length', index + 1)
      cy.get(`[data-priority="${priority}"]`).should('have.length', 1)
    })
  })

  it('Show task grouped based on priority', () => {
    Object.values(PRIORITY).forEach((priority, index) => {
      cy.get('input[placeholder="Title Starts Here..."]').type('Test To-Do')
      cy.get('textarea[placeholder="Describe your thoughts..."]').type('Test Description')
      cy.get('[data-testid="select-flag"]').click()
      cy.get('li').contains(priority).click()
      cy.get('button[aria-label="Add"]').click()

      cy.get('label[title="Test To-Do"]').should('have.length', index + 1)
      cy.get(`[data-priority="${priority}"]`).should('have.length', 1)
    })

    cy.get('[title="Group by Priority"]').click()

    Object.values(PRIORITY).forEach((priority) => {
      cy.get('h3').contains(priority)
    })
  })

  it('After Clicking on clear All button the no todo found should show', () => {
    cy.get('input[placeholder="Title Starts Here..."]').type('Test To-Do')
    cy.get('textarea[placeholder="Describe your thoughts..."]').type('Test Description')
    cy.get('[data-testid="select-flag"]').click()
    cy.get('li').contains('critical').click()
    cy.get('button[aria-label="Add"]').click()

    cy.get('[data-testid="remove-Test To-Do"]').click()

    cy.contains('No tasks added')
    cy.contains('Take nap')
    cy.get('img').should('have.attr', 'alt', 'Cat Sleeping')
  })

  it('When task is marked as completed it is shown in completed section', () => {
    cy.get('input[placeholder="Title Starts Here..."]').type('Test To-Do')
    cy.get('textarea[placeholder="Describe your thoughts..."]').type('Test Description')
    cy.get('[data-testid="select-flag"]').click()
    cy.get('li').contains('critical').click()
    cy.get('button[aria-label="Add"]').click()

    cy.get('h3').contains('In Progress')
    cy.get('input[type="checkbox"]').click()
    cy.get('h3').contains('Completed')
  })

  it('Edit Dialog is opening when click on the todo item', () => {
    cy.get('input[placeholder="Title Starts Here..."]').type('Test To-Do')
    cy.get('textarea[placeholder="Describe your thoughts..."]').type('Test Description')
    cy.get('[data-testid="select-flag"]').click()
    cy.get('li').contains('critical').click()
    cy.get('button[aria-label="Add"]').click()

    cy.get('label[title="Test To-Do"]').click()
    cy.get('h4').contains('Edit Task')
  })
})
