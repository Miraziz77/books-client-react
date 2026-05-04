import React, { Component } from 'react'
import Header from './layout/Header'
import Main from './layout/Main'
import Footer from './layout/Footer'
import AuthPage from './components/AuthPage'

class App extends Component {
    state = {
        token: localStorage.getItem("token") || null,

        view: "books",
        selectedAuthor: null
    }

    // ================= AUTH =================

    login = (token) => {
        localStorage.setItem("token", token)
        this.setState({ token })
    }

    logout = () => {
        localStorage.removeItem("token")
        this.setState({ token: null })
    }

    // ================= NAV =================

    setView = (view) => {
        this.setState({
            view,
            selectedAuthor: null
        })
    }

    selectAuthor = (author) => {
        this.setState({
            selectedAuthor: author,
            view: "books"
        })
    }

    resetToDefault = () => {
        this.setState({
            view: "books",
            selectedAuthor: null
        })
    }

    // ================= RENDER =================

    render() {
        // ❗ ЕСЛИ НЕТ ТОКЕНА → LOGIN
        if (!this.state.token) {
            return (
                <AuthPage
                    onLogin={this.login}
                />
            )
        }

        return (
            <div>
                <Header
                    setView={this.setView}
                    resetToDefault={this.resetToDefault}
                    logout={this.logout}
                />

                <Main
                    view={this.state.view}
                    selectedAuthor={this.state.selectedAuthor}
                    selectAuthor={this.selectAuthor}
                    setView={this.setView}
                    token={this.state.token}
                />

                <Footer />
            </div>
        )
    }
}

export default App