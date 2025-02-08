import { render, screen, waitFor } from '@testing-library/react'
import Article from 'my-articles/app/articles/page'
import type { Article as ArticleType } from 'my-articles/types/articles'
import type { FunctionComponent } from 'react'

const mockArticles: ArticleType[] = [
  { _id: 1, hero: 'https://placehold.co/600x400/lightgreen/white?text=img1', excerpt: 'Extrait 1', title: 'Article 1', content: 'Content 1' },
  { _id: 2, hero: 'https://placehold.co/600x400/lightgreen/white?text=img2', excerpt: 'Extrait 2', title: 'Article 2', content: 'Content 2' }
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        articles: mockArticles,
        totalPages: 3
      })
  })
) as jest.Mock

const resolvedComponent = async <T,>(Component: FunctionComponent<T>, props: T): Promise<FunctionComponent<T>> => {
  const ComponentResolved = await Component(props)
  return () => ComponentResolved
}

describe('Articles Page', () => {
  it('should render the title', async () => {
    const ArticleResolved = await resolvedComponent(Article, {
      searchParams: Promise.resolve({ page: '1', deleted: 'false' })
    })
    render(<ArticleResolved searchParams={Promise.resolve({ page: '1', deleted: 'false' })} />)

    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  it('should render the "Ajouter article" button', async () => {
    const ArticleResolved = await resolvedComponent(Article, {
      searchParams: Promise.resolve({ page: '1', deleted: 'false' })
    })
    render(<ArticleResolved searchParams={Promise.resolve({ page: '1', deleted: 'false' })} />)

    const button = screen.getByRole('button', { name: /ajouter article/i })
    expect(button).toBeInTheDocument()
  })

  it('should display the list of articles', async () => {
    const ArticleResolved = await resolvedComponent(Article, {
      searchParams: Promise.resolve({ page: '1', deleted: 'false' })
    })
    render(<ArticleResolved searchParams={Promise.resolve({ page: '1', deleted: 'false' })} />)

    await waitFor(() => {
      const articles = screen.getAllByRole('article')
      expect(articles.length).toBeGreaterThan(0)
    })
  })

  it('should render pagination buttons when there are multiple pages', async () => {
    const ArticleResolved = await resolvedComponent(Article, {
      searchParams: Promise.resolve({ page: '1', deleted: 'false' })
    })
    render(<ArticleResolved searchParams={Promise.resolve({ page: '1', deleted: 'false' })} />)

    await waitFor(() => {
      const nextPageButton = screen.getByRole('link', { name: /page suivante/i })
      expect(nextPageButton).toBeInTheDocument()
    })
  })

  it('should render the "Page précédente" button if not on the first page', async () => {
    const ArticleResolved = await resolvedComponent(Article, {
      searchParams: Promise.resolve({ page: '2', deleted: 'false' })
    })
    render(<ArticleResolved searchParams={Promise.resolve({ page: '2', deleted: 'false' })} />)

    await waitFor(() => {
      const prevPageButton = screen.getByRole('link', { name: /page précédente/i })
      expect(prevPageButton).toBeInTheDocument()
    })
  })

  it('should display a toast message when an article is deleted', async () => {
    const ArticleResolved = await resolvedComponent(Article, {
      searchParams: Promise.resolve({ page: '1', deleted: 'true' })
    })
    render(<ArticleResolved searchParams={Promise.resolve({ page: '1', deleted: 'true' })} />)

    await waitFor(() => {
      const toastMessage = screen.getByText(/l'article a été supprimé/i)
      expect(toastMessage).toBeInTheDocument()
    })
  })

  it('should navigate to the correct page when pagination buttons are clicked', async () => {
    const ArticleResolved = await resolvedComponent(Article, {
      searchParams: Promise.resolve({ page: '2', deleted: 'false' })
    })
    render(<ArticleResolved searchParams={Promise.resolve({ page: '2', deleted: 'false' })} />)

    const prevButton = await screen.findByRole('link', { name: /page précédente/i })
    expect(prevButton).toHaveAttribute('href', '/articles')

    const nextButton = screen.getByRole('link', { name: /page suivante/i })
    expect(nextButton).toHaveAttribute('href', '/articles?page=3')
  })
})