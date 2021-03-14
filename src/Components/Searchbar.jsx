import { Component } from 'react'

export default class Searchbar extends Component {
    state = {
        query: ''
    }

    setQuery = (e) => {
        this.setState({
            query: e.currentTarget.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    }
    render() {


        return (<header className="Searchbar" onSubmit={this.handleSubmit}>
            <form className="SearchForm">
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    placeholder="Search images and photos"
                    value={this.state.query}
                    onChange={this.setQuery}
                />
            </form>
        </header>)
    }
}

