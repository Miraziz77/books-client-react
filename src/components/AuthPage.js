import React, { Component } from 'react'

const API = process.env.REACT_APP_API_URL

class AuthPage extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        isRegister: false,
        error: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ""
        })
    }

    // ================= LOGIN =================
    login = async () => {
        if (!this.state.username || !this.state.password) {
            this.setState({ error: "Enter username and password" })
            return
        }

        try {
            const res = await fetch(`${API}/auth/jwt/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })

            const data = await res.json()

            if (!res.ok) {
                this.setState({ error: data.detail || "Login failed" })
                return
            }

            this.props.onLogin(data.access)

        } catch (err) {
            this.setState({ error: "Server error" })
        }
    }

    // ================= REGISTER =================
    register = async () => {
        const { username, email, password } = this.state

        if (!username || !email || !password) {
            this.setState({ error: "Fill all fields" })
            return
        }

        if (password.length < 8) {
            this.setState({ error: "Password must be at least 8 characters" })
            return
        }

        try {
            const res = await fetch(`${API}/auth/users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })

            let data
            try {
                data = await res.json()
            } catch {
                this.setState({ error: "Server returned invalid response" })
                return
            }

            if (!res.ok) {
                const firstError = Object.values(data)[0]
                this.setState({
                    error: Array.isArray(firstError)
                        ? firstError[0]
                        : "Registration failed"
                })
                return
            }

            // авто логин после регистрации
            await this.login()

        } catch (err) {
            this.setState({ error: "Server error" })
        }
    }

    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h2>
                        {this.state.isRegister ? "Create Account" : "Welcome Back"}
                    </h2>

                    <p className="auth-subtitle">
                        {this.state.isRegister
                            ? "Register to start using the app"
                            : "Login to continue"}
                    </p>

                    {/* Username */}
                    <input
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                    />

                    {/* Email (only register) */}
                    {this.state.isRegister && (
                        <input
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                        />
                    )}

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />

                    {/* ERROR */}
                    {this.state.error && (
                        <p style={{ color: "red", marginTop: "10px" }}>
                            {this.state.error}
                        </p>
                    )}

                    <button
                        onClick={
                            this.state.isRegister ? this.register : this.login
                        }
                    >
                        {this.state.isRegister ? "Register" : "Login"}
                    </button>

                    <p
                        className="auth-switch"
                        onClick={() =>
                            this.setState({
                                isRegister: !this.state.isRegister,
                                error: ""
                            })
                        }
                    >
                        {this.state.isRegister
                            ? "Already have an account? Login"
                            : "No account? Register"}
                    </p>
                </div>
            </div>
        )
    }
}

export default AuthPage