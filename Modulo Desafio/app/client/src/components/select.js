import React from "react";

export default function Select(props) {
  const handleChangeDate = date => {
    props.onChangeDate(date.target.value);
  };

  return (
    <>
      <label>Browser Select</label>
      <select className="browser-default" onClick={handleChangeDate}>
        <option value="" disabled selected>
          Choose your option
        </option>
        {/* {console.log(props.date)} */}
        {props.date && props.date.map((date) =>(
          <option value={date}>{date}</option>
        ))}
      </select>
    </>
  );
}
