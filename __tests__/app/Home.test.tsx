import { render, screen } from '@testing-library/react'
import Home from 'my-articles/app/page'

describe('Home Page', () => {
  it('renders the heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /bienvenue sur my articles/i
    })
    expect(heading).toBeInTheDocument()
  })
})
