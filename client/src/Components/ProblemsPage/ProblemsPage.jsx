import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import "./ProblemsPage.css"
// import {backendUrl} from "../../constants.js";

const SUBMISSIONS = [];

const ProblemsPage = () => {
  const [CodeSeg, setCodeSeg] = useState("");
  const { pid } = useParams() ;
  const cleanId = pid.substring(1) ;
  const [problem, setProblem] = useState(null);
  const [submission, setSubmission] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [currentTab, setCurrentTab] = useState('details'); // Default tab is 'details'

    const init = async () => {
      const response = await fetch(`http://localhost:3000/problems/` + cleanId, {
        method: "GET",
      });

      const json = await response.json(); 
      setProblem(json.problem);
    }

    const handleSubmit = async (event) => {
      if (event) {
        event.preventDefault();
      }
      const response = await fetch(`http://localhost:3000/submissions`, {
        method: "POST",
        headers: {
          "authorization": localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          problemId: cleanId,
          submission: submission
        })
      });
  
      const json = await response.json();
      console.log(json);
  
      // Refresh submissions after successful submission
      fetchSubmissions();
    }

    
    const fetchSubmissions = async (event) => {
      event.preventDefault();
      const response = await fetch(`http://localhost:3000/submissions/${cleanId}`, {
        method: "GET",
        headers: {
          "authorization": localStorage.getItem("token")
        }
      });
  
      const json = await response.json();
      // console.log("-------------------------------------->>>>>>> fetch submissions working!")
      console.log(json.submissions);
      setSubmissions(json.submissions);
      // console.log("-------------------------------------->>>>>>> fetch submissions might now working!")
    }
  
    useEffect(() => {
      init();
      fetchSubmissions();
    }, [])

    useEffect(() => {
      if (currentTab === 'submissions') {
        // console.log("-------------------------------------->>>>>>> fetch submissions working!")
        fetchSubmissions();
        // console.log("-------------------------------------->>>>>>> fetch submissions might now working!")
      }
    }, [currentTab]);


  const handleKey = (event) => {
    if (event.key == "Tab"){
      event.preventDefault() ;
      const { selectionStart , selectionEnd , value } = event.target ;
      const val = value.substring(0,selectionStart) + "\t" + value.substring(selectionStart) ;
      event.target.value = val;
      event.target.selectionStart = event.target.selectionEnd = selectionStart+1;
    }
    setCodeSeg(event.value) ;
  }

  return (

    <div>
      <div className="right-panel">
        <div className="tab">
          <button className={currentTab === 'details' ? 'active' : ''} onClick={() => setCurrentTab('details')}>
            Problem Details
          </button>
          <button type="button" id="submissions"
              className={currentTab === 'submissions' ? 'active' : ''} 
              onClick={(e) => {fetchSubmissions(e);}}>
            Submissions
          </button>
        </div>
        {currentTab === 'details' && (
          <>
            {problem ? (
              <div id="problempage" className="flex-row">
                <div className="ques">
                  <h1>{problem.title}</h1>
                  <h5>Description</h5>
                  <p>{problem.description}</p>
                  <code>Input : {problem.exampleIn}</code>
                  <code>Output : {problem.exampleOut}</code>
                </div>
                <div className="code">
                  <h1>Code Here</h1>
                  <div className="code-form">
                    <textarea onChange={(e) => setSubmission(e.target.value)} name="SolvedCode" onKeyDown={(event) => handleKey(event)}></textarea>

                    <button type="button" id="submit" onClick={(e) => handleSubmit(e)}>
                      SubmitCode
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>The searched Question Doesn't exist</div>
            )}
          </>
        )}
        {currentTab === 'submissions' && (
          <div className="submissions-tab">
            <h2>Submissions</h2>
            <ul>
              {submissions.map((submission, index) => (
                <li key={index}>
                  <div>{submission.submission}</div>
                  <div>Status: {submission.status}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    
  )
}

export default ProblemsPage;