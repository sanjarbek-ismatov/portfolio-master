import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import cn from "classnames";
import s from "styles/Filter.module.scss";
const Filter = () => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={cn({
        [s.container]: true,
        [s.containerShow]: show,
      })}
    >
      <FontAwesomeIcon
        onClick={() => setShow(!show)}
        className={s.icon}
        icon={faSliders}
      />
      <div className={s.filters}>
        <label>
          <input id="html" type="checkbox" />
          <span></span>
          Html
        </label>
        <label>
          <input id="javascript" type="checkbox" />
          <span></span>
          Javascript
        </label>
        <label>
          <input id="javascript" type="checkbox" />
          <span></span>
          Javascript
        </label>
        <label>
          <input id="javascript" type="checkbox" />
          <span></span>
          Javascript
        </label>
        <label>
          <input id="javascript" type="checkbox" />
          <span></span>
          Javascript
        </label>
        <label>
          <input id="javascript" type="checkbox" />
          <span></span>
          Javascript
        </label>
        <label>
          <input id="javascript" type="checkbox" />
          <span></span>
          Javascript
        </label>
        <label>
          <input id="javascript" type="checkbox" />
          <span></span>
          Javascript
        </label>
        <label>
          <input id="javascript" type="checkbox" />
          <span></span>
          Javascript
        </label>
        <label>
          <input id="javascript" type="checkbox" />
          <span></span>
          Javascript
        </label>
      </div>
    </div>
  );
};

export default Filter;
