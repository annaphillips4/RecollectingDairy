import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as listActions from "../../store/list";

const NewListForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.session.user)
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const list = { name, notes, owner_id: currentUser.id }

    return dispatch(listActions.newList(list))
      .then((res) => history.push("/lists"))
      .catch(async (res) => {
        const data = await res.json();
        if (data & data.errors) setErrors(data.errors);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul className="errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <h3>Enter name for list</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="List Name" name="Name"></input>

      <h3>Enter notes for list</h3>
      <textarea
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes" name="Notes"></textarea>

      <button type="submit">Create List</button>
    </form>
  )
}

export default NewListForm;
