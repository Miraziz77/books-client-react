import React, { Component } from 'react'
import Books from '../components/Books'
import SearchBar from '../components/SearchBar'

const API = process.env.REACT_APP_API_URL

class Main extends Component {
    state = {
        books: [],
        categories: [],
        authors: [],

        next: null,
        prev: null,

        nextAuthors: null,
        prevAuthors: null,

        nextCategories: null,
        prevCategories: null,

        currentUrl: `${API}/api/v1/books/`,
        baseUrl: `${API}/api/v1/books/`
    }

    componentDidMount() {
        this.loadBooks()
        this.loadCategories()
        this.loadAuthors()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.view !== this.props.view) {
            if (this.props.view === "books") {
                this.loadBooks(this.state.baseUrl)
            }
        }
    }

    // ================= BOOKS =================

    loadBooks = (url = this.state.baseUrl) => {
        fetch(url, {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const results = data.results || data

                const adapted = this.adaptApiData(results)

                this.setState({
                    books: adapted,
                    next: data.next,
                    prev: data.previous,
                    currentUrl: url
                })
            })
            .catch(err => console.log(err))
    }

    // ================= CATEGORIES =================

    loadCategories = (url = `${API}/api/v1/category/`) => {
        fetch(url, {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const results = data.results || data

                this.setState({
                    categories: results,
                    nextCategories: data.next || null,
                    prevCategories: data.previous || null
                })
            })
            .catch(err => console.log(err))
    }

    // ================= AUTHORS =================

    loadAuthors = (url = `${API}/api/v1/authors/`) => {
        fetch(url, {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const results = data.results || data

                this.setState({
                    authors: results,
                    nextAuthors: data.next,
                    prevAuthors: data.previous
                })
            })
            .catch(err => console.log(err))
    }

    // ================= ADAPT =================

    adaptApiData = (data) => {
        const fallbackImages = [
            "https://images.unsplash.com/photo-1512820790803-83ca734da794",
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
            "https://images.unsplash.com/photo-1519681393784-d120267933ba",
            "https://images.unsplash.com/photo-1528207776546-365bb710ee93"
        ]

        return data.map(item => {
            const randomFallback =
                fallbackImages[Math.floor(Math.random() * fallbackImages.length)]

            return {
                title: item.title,
                year: item.publisheddate
                    ? new Date(item.publisheddate).getFullYear()
                    : "Unknown",

                image: item.thumbnailurl
                    ? item.thumbnailurl
                    : randomFallback,

                author: item.authors?.length
                    ? item.authors.map(a => a.name).join(", ")
                    : "Unknown author"
            }
        })
    }

    // ================= SEARCH =================

    searchBooks = (text) => {
        const query = text.trim()

        if (!query) {
            if (this.props.view === "authors") {
                this.loadAuthors()
            } else if (this.props.view === "categories") {
                this.loadCategories()
            } else {
                this.loadBooks(this.state.baseUrl)
            }
            return
        }

        if (this.props.view === "authors") {
            this.loadAuthors(
                `${API}/api/v1/authors/?search=${query}`
            )
        } 
        else if (this.props.view === "categories") {
            this.loadCategories(
                `${API}/api/v1/category/?search=${query}`
            )
        } 
        else {
            const separator = this.state.baseUrl.includes("?") ? "&" : "?"
            const url = `${this.state.baseUrl}${separator}search=${query}`

            this.loadBooks(url)
        }
    }

    // ================= AUTHORS CLICK =================

    renderAuthors = () => {
        return (
            <div>
                <div className="authors">
                    {this.state.authors.map(author => (
                        <div
                            key={author.id}
                            className="author-card"
                            onClick={() => {
                                const url =
                                    `${API}/api/v1/books/?authors=${author.id}`

                                this.setState(
                                    { baseUrl: url },
                                    () => this.props.setView("books")
                                )
                            }}
                        >
                            <div className="author-card__info">
                                <h3>{author.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button
                        className="btn btn-page"
                        disabled={!this.state.prevAuthors}
                        onClick={() => this.loadAuthors(this.state.prevAuthors)}
                    >
                        ← Prev
                    </button>

                    <button
                        className="btn btn-page"
                        disabled={!this.state.nextAuthors}
                        onClick={() => this.loadAuthors(this.state.nextAuthors)}
                    >
                        Next →
                    </button>
                </div>
            </div>
        )
    }

    // ================= CATEGORIES CLICK =================

    renderCategories = () => {
        return (
            <div>
                <div className="authors">
                    {this.state.categories.map(cat => (
                        <div
                            key={cat.id}
                            className="author-card"
                            onClick={() => {
                                const url =
                                    `${API}/api/v1/books/?categories=${cat.id}`

                                this.setState(
                                    { baseUrl: url },
                                    () => this.props.setView("books")
                                )
                            }}
                        >
                            <div className="author-card__info">
                                <h3>{cat.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button
                        className="btn btn-page"
                        disabled={!this.state.prevCategories}
                        onClick={() => this.loadCategories(this.state.prevCategories)}
                    >
                        ← Prev
                    </button>

                    <button
                        className="btn btn-page"
                        disabled={!this.state.nextCategories}
                        onClick={() => this.loadCategories(this.state.nextCategories)}
                    >
                        Next →
                    </button>
                </div>
            </div>
        )
    }

    renderBooks = () => {
        return (
            <div>
                <Books books={this.state.books} />

                <div className="pagination">
                    <button
                        className="btn btn-page"
                        disabled={!this.state.prev}
                        onClick={() => this.loadBooks(this.state.prev)}
                    >
                        ← Prev
                    </button>

                    <button
                        className="btn btn-page"
                        disabled={!this.state.next}
                        onClick={() => this.loadBooks(this.state.next)}
                    >
                        Next →
                    </button>
                </div>
            </div>
        )
    }

    render() {
        const { view } = this.props

        return (
            <div className="container">
                <SearchBar onSearch={this.searchBooks} />

                {view === "authors"
                    ? this.renderAuthors()
                    : view === "categories"
                    ? this.renderCategories()
                    : this.renderBooks()
                }
            </div>
        )
    }
}

export default Main