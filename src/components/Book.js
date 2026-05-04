import React from 'react'

const Book = ({ title, author, image, year }) => {
    return (
        <div className="card">
            <div className="card__img">
                <img src={image} alt={title} />
            </div>
            <div className="card__info">
                <p>{author}</p>
                <h2>{title}</h2>
                <p>{year}</p>
            </div>
        </div>
    )
}

export default Book