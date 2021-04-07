import React from 'react';
import Autosuggest from 'react-autosuggest';
import './App.css';

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div style={{color: "white"}}>
        {suggestion}
    </div>
);

class App extends React.Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({value}) => {
        fetch("https://wfgz7cju24.execute-api.us-east-1.amazonaws.com/query?term=" + value)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    this.setState({
                        suggestions: data.result
                    });
                    return data.result
                },
                (error) => {
                }
            );
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const {value, suggestions} = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a country',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <div className="App">
                <header className="App-header">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />

                </header>
                <div className="bloglink">
                    This is a sample application of "Autocomplete API with Serverless Redis". <br/>
                    See <a style={{color: "#ddd"}} href="http://docs.upstash.com/tutorials/auto_complete_with_serverless_redis">
                    the blog post.
                </a>
                </div>

            </div>

        );
    }
}

export default App;
