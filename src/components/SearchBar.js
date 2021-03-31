import React from 'react';

class SearchBar extends React.Component {
    state = { 
        text: ''
    };

    onInputChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const text = this.state.text;
        if(text) {
            this.props.onSubmit(text);
        }
    }

    render() { 
        return ( 
            <form onSubmit={this.onFormSubmit} className="ui form">
                <div className="ui fluid action input">
                    <input type="text" value={this.state.text} onChange={this.onInputChange} placeholder="Video Search" />
                    <button type="submit" className="ui icon button">
                        <i className="search icon"></i>
                    </button>
                </div>
            </form>
         );
    }
}
 
export default SearchBar;