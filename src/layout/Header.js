import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <header>
                <div className="header__nav">

                <a href="#!" className="brand__logo" onClick={this.props.resetToDefault}>
                    Creative Book App
                </a>

                    <ul>
                        <li>
                            <a href="#!" className="nav-btn" onClick={() => this.props.setView("categories")}>
                                Categories
                            </a>
                        </li>

                        <li>
                            <a href="#!" className="nav-btn" onClick={() => this.props.setView("authors")}>
                                Authors
                            </a>
                        </li>

                        <li>
                            <a href="#!" className="nav-btn" onClick={this.props.logout}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="main-head"></div>
            </header>
        )
    }
}

export default Header