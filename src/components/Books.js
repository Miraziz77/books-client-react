import React, { Component } from 'react'
import Book from './Book'

class Books extends Component {
    render() {
        const { books = [] } = this.props

        return (
            <div className="books">
                {books.length ? (
                    books.map((book, index) => (
                        <Book key={index} {...book} />
                    ))
                ) : (
                    <p className="empty">Data is not found</p>
                )}
            </div>
        )
    }
}

export default Books