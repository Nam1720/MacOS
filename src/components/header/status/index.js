import React, { useEffect, useState } from "react";
import data from "./data";
Status.propTypes = {};

function Status(props) {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const useClockInterval = setInterval(() => {
      setDate();
    }, 1000);

    // xoá interval
    return () => {
      clearInterval(useClockInterval);
    };
  }, []);

  const setDate = () => {
    let date = new Date();
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    options.timeZone = "UTC";
    options.timeZoneName = "short";
    const d = new Date();
    let time = d.toLocaleTimeString();
    setTimeString(
      `${date.toLocaleString("en-US", options).split(",", [2])}  ${time}`
    );
  };
  const showElement = (element) => {
    let item = document.querySelector(element);
    item.classList.toggle("active");
  };

  function hideElement(element) {
    let item = document.querySelector(element);
    item.classList.remove("active");
  }

  return (
    <div className="top-bar__right">
      <ul className="top-bar__left display-flex-center  list-style-none">
        {data.map((x) => (
          <li key={x.id} className="item item--status">
            <button
              onClick={() => {
                showElement(`.${x.name}`);
              }}
              className="label"
            >
              {x.icon}
            </button>
            <div
              className={x.name}
              onClick={() => {
                hideElement(`.${x.name}`);
              }}
            >
              <div className="display-flex  justify-content-between">
                <p>
                  <b>{x.title}</b>
                </p>
                <div className="toggle active-icon"></div>
                <p className="percent">{x.percent}%</p>
              </div>
              <p className="gray"> {x.gray} </p>
            </div>
          </li>
        ))}
        <li className="item item--date">{timeString}</li>
      </ul>
    </div>
  );
}

export default Status;
