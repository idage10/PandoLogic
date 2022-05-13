import {useState, useEffect} from "react";

const TextList = ({dataList}) => {
    const [textListData, setTextListData] = useState([]);

    // Initialize on component mount
    useEffect(() => {
        let listId = 2;
        let textResultsData = dataList.map((data) =>
                  <li key={(listId++).toString()}>{data}</li>
            );
        setTextListData(textResultsData);
    }, [dataList]);

    return (
        <div id="textResultsId" className="textResultsDiv">
        <ul>
          <li key="1">The relevant jobs are:</li>
          {textListData}
        </ul>
        </div>
    );
}

export default TextList;