import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLists, deleteList } from '../../store/list'
import { Link } from 'react-router-dom';
import * as listActions from "../../store/list";
import "./ListNewForm.css"
import "./Lists.css"


export default function Lists() {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.lists)
  const currentUser = useSelector(state => state.session.user)
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const listArr = Object.values(lists)

  useEffect(() => {
    dispatch(loadLists())
  }, [dispatch])

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setName('')
    setNotes('')
    setErrors([])
  };

  const handleDelete = async (listId) => {
    await dispatch(deleteList(listId));
    await dispatch(loadLists());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const list = { name, notes, owner_id: currentUser.id };

    try {
      await dispatch(listActions.newList(list));
      toggleFormVisibility();
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  return (
    <>
      <div className="sidebar-main-container">
        <div className="task-container">
          <div className="all-tasks">
            <Link to={"/app"}>All Tasks</Link>
          </div>
        </div>

        <div className="lists-container">
          <div className="new-list-container">
            <h3>Lists</h3>
            <div onClick={toggleFormVisibility}><i id="new-list-button" className="fa-regular fa-square-plus"></i></div>

            {isFormVisible &&
              <form onSubmit={handleSubmit}>
                <ul className="errors">
                  {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <div className="new-form">
                  <input className="new-form-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name for list" name="Name"></input>

                  <textarea className="new-form-input"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter notes for list" name="Notes"></textarea>

                  <button className="list-button" type="submit">Create List</button>
                </div>
              </form>}
          </div>

          {listArr.map(list => <div key={list.id} className="list-arr" tabIndex="0">
            <a href={`/app/list/${list.id}`}>{list.name}</a>
            <i className="fa-solid fa-trash-can" onClick={() => handleDelete(list.id)}></i>
          </div>)}


        </div>
      </div>
    </>
  )
}
