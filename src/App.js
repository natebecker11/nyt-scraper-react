import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    term: '',
    begin: '',
    end: '',
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    console.log('heard')
    axios.post('/api/search/', this.state)
      .then(x => console.log(x))
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>New York Times Article Scrubber</h1>
          <h3>Search for and annotate articles of interest!</h3>
        </header>
        <section className='search-area'>
          <h2>Search</h2>
          <form>
            <label htmlFor='searchTerm'> Topic
              <input id='searchTerm' name='term' type='text' onChange={(e) => this.handleInputChange(e)} value={ this.state.term }/>
            </label>
            <label htmlFor='searchBegin'> Begin Date
              <input id='searchBegin' name='begin' type='date' onChange={(e) => this.handleInputChange(e)} value={ this.state.begin }/>
            </label>
            <label htmlFor='searchEnd'> End Date
              <input id='searchEnd' name='end' type='date' onChange={(e) => this.handleInputChange(e)} value={ this.state.end }/>
            </label>
            <button type='button' onClick={this.handleFormSubmit}> Submit </button>
          </form>
        </section>
        <section className='results-area'>
        </section>
        <section className='saved-area'>
        </section>
      </div>
    );
  }
}

export default App;
