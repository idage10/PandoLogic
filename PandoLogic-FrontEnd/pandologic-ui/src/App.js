import './App.css';
import './styles.css';
import React from 'react';
import {Input, Card} from 'antd';

class App extends React.Component {
  // Constructor 
  constructor(props) {
    super(props);

    this.state = {
        isLoaded: false,
        // Titles data. Updates data from server on refresh
        jobTitlesData: [],
        // Titles filtered data based on user input
        filteredTitlesOptionsData: [],
        // Search results data based on user input
        searchResultsListData: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDropDownListClick = this.handleDropDownListClick.bind(this);
    this.handleSearchOnClick = this.handleSearchOnClick.bind(this);
}

  componentDidMount() {
    if (this.fetchPromise) {
      // already mounted previously
      return;
    }

    this.fetchPromise = fetch("http://localhost:5000/JobTitles",
        {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              jobTitlesData: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        document.getElementById('dropDownListId').hidden = true;
        document.getElementById('textResultsId').hidden = true;
  }
  
  handleInputChange(e) {
    const dropDownElement = document.getElementById('dropDownListId');
    document.getElementById('textResultsId').hidden = true;

    // Input key length is less then 2 characters
    if (e.target.value.length < 2) {
      dropDownElement.hidden = true;
      return;
    }

    // Input key length is 2 characters or larger
    let allJobTitles = this.state.jobTitlesData;
    // Creating dropdown list html
    var filteredOptionItems = allJobTitles.filter( (jobTitle) => 
        jobTitle.toLowerCase().includes(e.target.value.toLowerCase())).map((title) =>
           <div key={title} onClick={this.handleDropDownListClick}>
              <Card>{title}</Card>
           </div>
    );

    if (filteredOptionItems.length < 1) {
      dropDownElement.hidden = true;
      return;
    }

    this.setState({filteredTitlesOptionsData: filteredOptionItems});
    dropDownElement.hidden = false;
  }

  handleDropDownListClick(e) {
      if (e.target.innerText == "" || e.target.innerText == undefined)
       return;
      
      document.getElementById('searchInputId').value = e.target.innerText;
      document.getElementById('dropDownListId').hidden = true;
  }

  handleSearchOnClick() {
    const inputValue = document.getElementById('searchInputId').value;
    document.getElementById('dropDownListId').hidden = true;

    if (inputValue == "" || inputValue == undefined) {
      document.getElementById('textResultsId').hidden = true;
      return;
    }

    fetch("http://localhost:5000/JobTitles/" + inputValue,
        {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (result.length <= 0) {
              document.getElementById('textResultsId').hidden = true;
              return;
            }

            let listId = 2;
            let dataList = result.map((data) =>
                  <li key={(listId++).toString()}>{data.Item1} in {data.Item2}, {data.Item3}</li>
            );
            
            this.setState({searchResultsListData: dataList});
            document.getElementById('textResultsId').hidden = false;
            document.getElementById("textResultsId").scrollTop = 0;
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              error
            });
          }
        )
  }

  render() {
    return (
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          Job Titles
        </h3>
        <div className="justify-content-center">
          <input type="text" id="searchInputId" className="searchInput" placeholder="Enter a job title" 
            onChange={this.handleInputChange}/>
          <button id="searchButtonId" type="submit" className="searchButton" onClick={this.handleSearchOnClick}>Search</button>
        </div>
        <div className="justify-content-center">
            <div id="dropDownListId" className="dropDownList">
              {this.state.filteredTitlesOptionsData}
            </div>
        </div>
        <div className="justify-content-center">
          <div id="textResultsId" className="textResultsDiv">
            <ul>
              <li key="1">The relevant jobs are:</li>
              {this.state.searchResultsListData}
            </ul>
          </div>
        </div>
      </div>
      );
    }
  }

export default App;