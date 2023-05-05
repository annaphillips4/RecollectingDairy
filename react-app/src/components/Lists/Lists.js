import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLists } from '../../store/list'


export default function Lists() {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.lists)

  const listArr = Object.values(lists)
  console.log(lists)

  useEffect(() => {
    dispatch(loadLists())
  }, [dispatch])

  return (
    <>
      {listArr.map(list => <div>{list.name}</div>)}
    </>
  )
}
