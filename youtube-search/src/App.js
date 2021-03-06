import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    searchValue: '',
    searchResults: [],
    nextPageToken: '',
    isLoadmore: false,
  };

  handleSearchValueChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  }; 

  handleFormSubmit = (event) => {
    event.preventDefault();

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.searchValue}&type=video&key=AIzaSyAbl1W8sIW5RIKRU3TIuTF_Cpbh0dAkzqU`, {})
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          searchResults: [...this.state.searchResults, ...data.items],
          nextPageToken: data.nextPageToken,
        });
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message);
      });
  };

  handleLoadmore = (event) => {
    this.setState({
      isLoadmore: true,
    });
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.searchValue}&type=video&key=AIzaSyAbl1W8sIW5RIKRU3TIuTF_Cpbh0dAkzqU&pageToken=${this.state.nextPageToken}`, {})
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          searchResults: [...this.state.searchResults, ...data.items],
          nextPageToken: data.nextPageToken,
          isLoadmore: false,
        });
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 text-center">
            <img src="https://www1-lw.xda-cdn.com/files/2017/08/After-12-Years-Google-Gives-YouTube-a-New-Logo.png" alt="New YouTube Logo" />
            <h1>Let's Search</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <form id="Search" onSubmit={this.handleFormSubmit} >
              <div className="form-group">
                <input 
                  type="text" 
                  name="keyword" 
                  id="keyword" 
                  className="form-control" 
                  required
                  value={this.state.searchValue}
                  onChange={this.handleSearchValueChange} 
                />
                <br/>
                <input 
                  type="submit" 
                  className="btn btn-primary form-control" 
                  value="Submit" 
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" id="result-list">
            {this.state.searchResults.map((item, index) => {
              return (
                <a key={index} className="result col-md-12" href={`https://www.youtube.com/watch?v=${item.id.videoId}`} target="_blank" >
                  <div className="row">
                    <div className="col-4">
                      <img src={`${item.snippet.thumbnails.medium.url}`} />
                    </div>
                    <div className="col-8">
                      <div className="video-info">
                        <h2 className="title">{item.snippet.title}</h2>
                        <p className="description">{item.snippet.description}</p>
                        <span>
                          View >>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            {this.state.nextPageToken ? (
              <button 
                className="btn btn-primary form-control"
                onClick={this.handleLoadmore}   
              >
              {this.state.isLoadmore ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
              ) : 'Load More'}  
            </button>
            ) : null }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
