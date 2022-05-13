import {Card} from 'antd';
import {useState, useEffect} from "react";

const AutoComplete = ({suggestions, searchUrl, setResultsData}) => {
  // Auto complete suggestions
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  // Auto complete cards view, based on filtered data from user input
  const [filteredCardsData, setFilteredCardsData] = useState([]);
  const [url, setUrl] = useState("");

  // Initialize on component mount
  useEffect(() => {
    if (autoCompleteData != suggestions)
      setAutoCompleteData(suggestions);

    if (url != searchUrl)
      setUrl(searchUrl);
    
    document.getElementById('dropDownListId').hidden = true;
    document.getElementById('textResultsId').hidden = true;
  }, [suggestions, searchUrl]);
  
  const handleInputChange = (e) => {
    const dropDownElement = document.getElementById('dropDownListId');
    document.getElementById('textResultsId').hidden = true;

    // Input key length is less then 2 characters
    if (e.target.value.length < 2) {
      dropDownElement.hidden = true;
      return;
    }

    // Input key length is 2 characters or larger
    // Creating dropdown list html
    var filteredCardItems = autoCompleteData.filter( (suggestion) => 
        suggestion.toLowerCase().includes(e.target.value.toLowerCase())).map((suggestion) =>
           <div key={suggestion} onClick={handleDropDownListClick}>
              <Card>{suggestion}</Card>
           </div>
    );

    if (filteredCardItems.length < 1) {
      dropDownElement.hidden = true;
      return;
    }

    setFilteredCardsData(filteredCardItems);
    dropDownElement.hidden = false;
  }

  const handleDropDownListClick = (e) => {
      if (e.target.innerText === "" || e.target.innerText === undefined)
       return;
      
      document.getElementById('searchInputId').value = e.target.innerText;
      document.getElementById('dropDownListId').hidden = true;
  }

  const handleSearchOnClick = () => {
    const inputValue = document.getElementById('searchInputId').value;
    document.getElementById('dropDownListId').hidden = true;

    if (inputValue === "" || inputValue === undefined) {
      document.getElementById('textResultsId').hidden = true;
      return;
    }

    fetch(url + inputValue,
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
            
            setResultsData(result);
            document.getElementById('textResultsId').hidden = false;
            document.getElementById("textResultsId").scrollTop = 0;
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
          }
        )
  }

  return (
      <div>
          <input type="text" id="searchInputId" className="searchInput" placeholder="Enter a job title" 
              onChange={handleInputChange}/>
          <button id="searchButtonId" type="submit" className="searchButton" onClick={handleSearchOnClick}>Search</button>
          <div id="dropDownListId" className="dropDownList">
              {filteredCardsData}
          </div>
      </div>
  );
}

export default AutoComplete;