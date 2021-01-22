import React from "react";

export default function Button(props) {
  const handleChangeDate = () => {
    props.onChangeDate(
      isInt(props.name) === true
        ? props.name
        : props.month === 0
        ? 1
        : props.month + 1
    );
  };

  function isInt(value) {
    return (
      !isNaN(value) &&
      (function (x) {
        return (x | 0) === x;
      })(parseFloat(value))
    );
  }

  return (
    <>
      <div className="center col s1">
        <span
          className={"waves-effect waves-light btn-small " + props.color}
          onClick={handleChangeDate}
        >
          {props.name}
        </span>
      </div>
    </>
  );
}
