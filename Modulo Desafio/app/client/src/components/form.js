import React from "react";

export default function Form(props) {
  const handleChangeFilter = (e) => {
    props.onChangeFilter(e.target.value);
  };

  return (
    <>
        <div class="input-field col s10">
          <input id="filter" type="text" class="validate" onKeyDown={handleChangeFilter}/>
          <label for="filter">Filter by description</label>
        </div>
    </>
  );
}
