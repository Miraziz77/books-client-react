import React, { Component } from 'react'

class SearchBar extends Component {
    state = {
        search: ""
    }

    handleChange = (e) => {
        const value = e.target.value

        this.setState({ search: value })

        this.props.onSearch(value)
    }

    handleSubmit = () => {
        this.props.onSearch(this.state.search)
    }

    render() {
        return (
            <div className="search">
                <div className="bar">
                    <input
                        type="search"
                        name="search"
                        autoComplete="off"
                        placeholder="Search books..."
                        value={this.state.search}
                        onChange={this.handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                this.handleSubmit()
                            }
                        }}
                    />

                    <button
                        className="search-btn"
                        onClick={this.handleSubmit}
                    >
                        <span>Search</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default SearchBar