import React from "react";

export default function Form(props) {
  const handleChangeText = () => {
    props.onChangeDone(props.id);
  };

  return (
    <>
        <div class="input-field col s10">
          <input id="first_name" type="text" class="validate"/>
          <label for="first_name">First Name</label>
        </div>
    </>
  );
}
