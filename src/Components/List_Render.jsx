import React, { use, useState } from "react";
import { MdOutlineSaveAlt } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const List_Render = () => {
  let [items, setItems] = useState([
    { id: 1, Task: "Readding", checked: true },
    { id: 2, Task: "Writing", checked: false },
    { id: 3, Task: "Swimming", checked: true },
    { id: 4, Task: "Jogging", checked: false },
    { id: 5, Task: "Music", checked: true },
    { id: 6, Task: "Singing", checked: false },
    { id: 7, Task: "Dancing", checked: true },
  ]);

  // handled to checkbox:
  let handlecheck = (id) => {
    let newItems = items.map((obj) => {
      return obj.id === id ? { ...obj, checked: !obj.checked } : obj;
    });
    setItems(newItems);
  };

  // input box value access:
  let [newvalue, setnewvalue] = useState("");
  let [isEdit, setEdit] = useState();
  let [CurrentElementValue, setCurrentElementValue] = useState(null);

  // handle the edit button:
  // update the items
  let handlebutton = (id) => {
    let ListItem = items.find((obj) => obj.id == id);
    setnewvalue(ListItem.Task);
    setEdit(true);
    setCurrentElementValue(id);
  };

  // delete button (DELETE):
  let handledelete = (id) => {
    let newItems = items
      .filter((obj) => obj.id !== id)
      .map((obj, index) => {
        return { ...obj, id: index + 1 };
      });
    setItems(newItems);
  };

  // handeleAdd_or_Save :ADD OR SAVE THE INPUT ITEMS IN LIST

  // ADD
  let handeleAdd_or_Save = () => {
    // Save (update)
    if (isEdit) {
      let newListItems = items.map((obj) => {
        return obj.id === CurrentElementValue
          ? { ...items, Task: newvalue }
          : obj;
      });
      setItems(newListItems);
      setCurrentElementValue(null);
      setnewvalue("");
      setEdit(false);
    } else {
      setItems([
        ...items,
        { id: items.length + 1, Task: newvalue, checked: false },
      ]);
      setnewvalue("");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Make Your Task</h1>

        {/* input field value access and the list */}
        <div className="input">
          <input
            type="text"
            placeholder="Add new Task"
            value={newvalue}
            onChange={(e) => setnewvalue(e.target.value)}
          />
          <button onClick={handeleAdd_or_Save} id="add">
            {isEdit ? <MdOutlineSaveAlt /> :<CiCirclePlus />}
          </button>
        </div>

        <div>
          <ul>
            {items.map((obj) => {
              return (
                <li key={obj.id} id="list">
                  <input
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handlecheck(obj.id)}
                  />
                  <label>{obj.Task} </label>
                  <FaEdit id="edit" onClick={() => handlebutton(obj.id)} />
                  <MdDelete id="delete" onClick={() => handledelete(obj.id)} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default List_Render;
