import React from "react";

export default function Select() {
  return (
    <>
      <label>Browser Select</label>
      <select className="browser-default">
        <option value="" disabled selected>
          Choose your option
        </option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </>
  );
}
