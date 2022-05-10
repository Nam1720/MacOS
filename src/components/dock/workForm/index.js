import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Fragment } from "react";

const WorkForm = () => {
  const statusList = [
    { id: 1, value: "Doing" },
    { id: 2, value: "Done" },
    { id: 3, value: "Refuse" },
  ];

  const errInvalidate = {
    work: "Nhập tên công việc",
    status: "Chọn trạng thái",
  };
  const valid = {
    work: "",
    status: "",
  };

  const [todos, setTodos] = useState(() => {
    const localWorkList = JSON.parse(localStorage.getItem("workList"));
    //?? điều kiện là null và rỗng
    return localWorkList ?? [];
  });
  const [WorkName, setWorkName] = useState("");
  const [Status, setStatus] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [todoSelected, setTodoSelected] = useState(-1);
  const [error, setError] = useState(valid);

  //valudate form
  useEffect(() => {
    if (WorkName !== "" && Status !== "") {
      setError(valid);
    } else if (WorkName !== "") {
      const newObj = { ...errInvalidate, work: "" };
      setError(newObj);
    } else if (Status !== "") {
      const newObj = { ...errInvalidate, status: "" };
      setError(newObj);
    }
  }, [WorkName, Status]);

  // save localStorage
  useEffect(() => {
    const jsonWork = JSON.stringify(todos);
    localStorage.setItem("workList", jsonWork);
    setIsEdit(false);
    setTodoSelected(-1);
  }, [todos]);

  // show value edit
  useEffect(() => {
    if (!isEdit) return;
    if (todoSelected === -1) return;
    const index = todos.findIndex((todo) => todo.id === todoSelected);
    if (index === -1) return;
    setWorkName(todos[index].name);
    setStatus(todos[index].status);
  }, [isEdit, todoSelected]);

  const hideItem = (element) => {
    let item = document.querySelector(element);
    item.classList.remove("active");
  };

  const getWorkName = (e) => {
    setWorkName(e.target.value);
  };
  const getStatus = (e) => {
    setStatus(e.target.value);
  };

  //Event submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      if (WorkName === "") return setError(errInvalidate);
      if (Status === "") setError(errInvalidate);
      setTodos((values) => [
        ...values,
        { name: WorkName, status: Status, id: uuidv4() },
      ]);
      setWorkName("");
      setStatus("");
    }

    if (isEdit) {
      const index = todos.findIndex((todo) => todo.id === todoSelected);
      if (index === -1) return;
      const newTodo = { ...todos[index], name: WorkName, status: Status };
      const newTodos = [...todos];
      newTodos[index] = newTodo;
      setTodos(newTodos);
    }
  };

  //delete job
  const deleteJob = (index) => {
    const newWork = [...todos];
    newWork.splice(index, 1);
    setTodos(newWork);
    const jsonWork = JSON.stringify(newWork);
    localStorage.setItem("workList", jsonWork);
  };

  //edit job
  const edit = (id) => {
    setIsEdit(true);
    setTodoSelected(id);
  };

  // even move element
  useEffect(() => {
    // move element
    function dragElement(element) {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

      if (element.querySelector("#header-work-list")) {
        // If present, the window-top element is where you move the parent element from
        element.querySelector("#header-work-list").onmousedown = dragMouseDown;
      } else {
        // Otherwise, move the element itself
        element.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = element.offsetTop - pos2 + "px";
        element.style.left = element.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    dragElement(document.getElementById("popup-work-list"));
  }, []);

  return (
    <>
      <div className=" Worklist work-list" id="popup-work-list">
        <div className="Worklist__header" id="header-work-list">
          <div className="Worklist__header__actions flex-1">
            <i
              className="bx bx-x bg-color-red exit"
              onClick={() => {
                hideItem(".Worklist");
              }}
            ></i>
            <i className="bx bx-minus bg-color-yellow "></i>
            <i className="bx bx-expand-alt bg-color-green "></i>
          </div>
          <h3 className="flex-1">Work List</h3>
          <div className="flex-1"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <ul className="work-list__form__List display-flex">
            <li className="item flex-1">
              <input
                value={WorkName}
                onChange={getWorkName}
                type="text"
                id="work-name"
                placeholder="Import work name"
              />
              <p id="error-work-name">{error?.work}</p>
            </li>
            <li className="item flex-1">
              <select
                id="status"
                name="status"
                value={Status}
                onChange={getStatus}
              >
                <option value="">-- Select status --</option>
                {statusList.map((x) => {
                  return (
                    <Fragment key={x.id}>
                      <option value={x.value}>{x.value}</option>
                    </Fragment>
                  );
                })}
              </select>
              <p id="error-work-name">{error?.status}</p>
            </li>
            <li className="item flex-1">
              <input
                type="submit"
                id="btn-submit"
                value={isEdit ? "Edit" : "Add"}
              />
            </li>
          </ul>
        </form>

        <div className="work-list__result">
          <table className="work-list__result__table">
            <thead id="table-head">
              <tr>
                <td>Stt</td>
                <td>Tên công việc</td>
                <td>Trạng thái</td>
                <td colSpan={2}>Xử lý</td>
              </tr>
            </thead>
            <tbody id="table-body">
              {todos.map((x, index) => (
                <tr key={uuidv4()}>
                  <td>{index + 1}</td>
                  <td>{x.name}</td>
                  <td>{x.status}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => edit(x.id)}>
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteJob(index)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WorkForm;
