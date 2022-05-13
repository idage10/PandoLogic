import './App.css';
import './css/styles.css';
import React from 'react';
import {useState, useEffect, useRef} from "react";
import AutoComplete from './components/AutoComplete';
import TextList from './components/TextList';

const App = () => {
  // Titles data. Updates data from server on refresh
  const [jobTitlesData, setJobTitlesData] = useState([]);
  // Search results data based on user search
  const [searchResultsData, setSearchResultsData] = useState([]);
  const [textListData, setTextListData] = useState([]);
  const didMount = useRef(false);

  // Initialize on component mount only once
  useEffect(() => {
    // already mounted previously
    if (didMount.current) {
      return;
    }

    didMount.current = true;
    fetch("http://localhost:5000/JobTitles",
        {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            setJobTitlesData(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
          }
        )
  }, []);

  // Initialize on component mount
  useEffect(() => {
    let dataList = searchResultsData.map((data) =>
              `${data.Item1} in ${data.Item2}, ${data.Item3}`
        );
    setTextListData(dataList);
  }, [searchResultsData]);

  return (
    <div className="container justify-content-center">
      <h3 className="m-3 d-flex justify-content-center">
        Job Titles
      </h3>
      <AutoComplete suggestions={jobTitlesData} searchUrl={"http://localhost:5000/JobTitles/"} setResultsData={setSearchResultsData}></AutoComplete>
      <TextList dataList={textListData}></TextList>
    </div>
    );
  }

export default App;