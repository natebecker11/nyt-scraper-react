import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import ArticleItem from './components/ArticleItem'

class App extends Component {

  state = {
    term: '',
    begin: '',
    end: '',
    articles: [],
    loading: false,
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    console.log('sending...')
    this.setState({ loading: true })
    axios.post('/api/search/', this.state)
      .then(({ data }) => {
        console.log('recd')
        console.log(data)
        this.setState({ articles: data, loading: false })
      })
      .catch(x => console.log(x))
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
        <section className='loading-area' style={this.state.loading ? {} : {display: 'none'}}>
          <img alt='Loading' src={ require('./loading.gif') }/>
        </section>
        <section className='results-area' style={this.state.articles.length > 0 ? {} : {display: 'none'}}>
          <h2>Results</h2>
          {this.state.articles.map(article => <ArticleItem key={article.link} {...article} />)}
        </section>
        <section className='saved-area'>
        </section>
      </div>
    );
  }
}

export default App;
