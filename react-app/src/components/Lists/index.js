import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLists, deleteList } from '../../store/list'
import NewListForm from '../ListNewForm'
import { Link } from 'react-router-dom';
import "./Lists.css"


export default function Lists() {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.lists)
  const [isFormVisible, setIsFormVisible] = useState(false);

  const listArr = Object.values(lists)

  useEffect(() => {
    dispatch(loadLists())
  }, [dispatch])

  const handleDelete = async (listId) => {
    await dispatch(deleteList(listId));
    await dispatch(loadLists());
  }

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <div className="sidebar-main-container">
        <div className="task-container">
          <div className="all-tasks">
            <Link to={`/app`}>All Tasks</Link>
          </div>
        </div>

        <div className="lists-container">
          <div className="new-list-container">
            <h3>Lists</h3>
            <div onClick={toggleFormVisibility}><i id="new-list-button" className="fa-regular fa-square-plus"></i></div>
            {isFormVisible && <NewListForm />}
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
