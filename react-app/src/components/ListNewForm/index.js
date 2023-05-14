import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as listActions from "../../store/list";
import "./ListNewForm.css"


const NewListForm = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user)
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const list = { name, notes, owner_id: currentUser.id }

    return dispatch(listActions.newList(list))
      // .then((res) => history.push("/lists"))
      .catch(async (res) => {
        const data = await res.json();
        if (data & data.errors) setErrors(data.errors);
      });
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <div className="new-form">
        {/* <h3></h3> */}
        <input className="new-form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name for list" name="Name"></input>

        {/* <h3></h3> */}
        <textarea className="new-form-input"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter notes for list" name="Notes"></textarea>

        <button className="list-button" type="submit" onClick={toggleFormVisibility}>Create List</button>
      </div>
    </form>
  )
}

export default NewListForm;
