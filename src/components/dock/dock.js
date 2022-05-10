import React, { useEffect, useState } from "react";
import data from "./data";
import { Fragment } from "react";

Dock.propTypes = {};

function Dock(props) {
  useEffect(() => {
    let icons = document.querySelectorAll(".box-img");
    icons.forEach((item, index) => {
      item.addEventListener("mouseover", (e) => {
        focus(item, index);
      });
      item.addEventListener("mouseleave", (e) => {
        icons.forEach((item) => {
          item.style.width = "48px";
          item.style.transition = "width 0.2s";
        });
      });
    });

    const focus = (element, index) => {
      let previous = index - 1;
      let previous1 = index - 2;
      let next = index + 1;
      let next2 = index + 2;

      if (previous === -1) {
        element.style.width = "92px";
        icons[next].style.width = "78px";
      } else if (previous === 0) {
        element.style.width = "92px";
        icons[previous].style.width = "78px";
        icons[next].style.width = "78px";
      } else if (next === icons.length - 1) {
        element.style.width = "92px";
        icons[previous].style.width = "78px";
        icons[next].style.width = "78px";
      } else if (next === icons.length) {
        element.style.width = "92px";
        icons[previous].style.width = "78px";
      } else {
        element.style.width = "92px";
        icons[previous].style.width = "78px";
        icons[previous1].style.width = "65px";
        icons[next].style.width = "78px";
        icons[next2].style.width = "65px";
      }
    };
  }, []);

  const [workList, setWorkList] = useState(data);
  const showItem = (element) => {
    let item = document.querySelector(element);
    item.classList.toggle("active");
  };
  return (
    <>
      <ul className="dock list-style-none">
        {workList.map((x) => {
          return (
            <React.Fragment key={x.id}>
              <li data-tittle={x.name}>
                <div className="box-img">
                  <img
                    onClick={() => {
                      showItem(`.${x.name}`);
                    }}
                    className="dock-icon"
                    src={x.icon}
                    alt={x.name}
                  />
                </div>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
}

export default Dock;
