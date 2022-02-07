import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBug, loadBugs, resolveBug, unResolvedBugsSelector } from '../store/enitities/bugs';
import './styles.css'

const BugsList = () => {

  const dispatch = useDispatch();
  const bugs = useSelector(unResolvedBugsSelector)
  const [inputText, setInputText] = useState(null)

  useEffect(() => {
    dispatch(loadBugs())
  }, [])

  const unresolveTheBug = (bugId) => {
    dispatch(resolveBug(bugId))
  }
  const addNewBug = () => {
    dispatch(addBug({ description: inputText }))
  }

  return (
    <div>
      <h1>Add bugs</h1>
      <input onChange={(event) => setInputText(event.target.value)}></input>
      <button onClick={() => addNewBug()}>Add Bug</button>
      <ul>
        {bugs.map((bug, index) =>
          <><li className='list' key={bug.id}>{bug.description}
            <button className="btn" key={index} onClick={() => unresolveTheBug(bug.id)}>
              Resolve
            </button>
          </li>
          </>
        )
        }
      </ul>
    </div>
  )
}

export default BugsList