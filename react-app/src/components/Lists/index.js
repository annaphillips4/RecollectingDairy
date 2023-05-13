import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLists, deleteList } from '../../store/list'
import NewListForm from '../ListNewForm'


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
      <h1>Lists</h1>
      {listArr.map(list => <div key={list.id} className="deletable">
        {list.name}
        <i className="fa-solid fa-trash-can" onClick={() => handleDelete(list.id)}></i>
      </div>)}

      <div onClick={toggleFormVisibility}>Add a new list... <i className="fa-regular fa-square-plus"></i></div>
      {isFormVisible && <NewListForm />}
    </>
  )
}
