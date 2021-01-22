import React from "react";

export default function ProjetoBase(props) {
  const handleChangeDate = () => {
    props.onChangeDone(props.id);
  };

  return (
    <>
      <div
        className={
          "row card-panel" + (props.done === true ? " teal" : " purple")
        }
        onClick={handleChangeDate}
      >
        <span className="col s3 white-text">
          <h6>
            Data: <strong>{props.date}</strong>
          </h6>
        </span>
        <span className="col s4 white-text">
          <h6>Descrição: {props.description}</h6>
        </span>
        <span className="col s3 white-text">
          <h6>Status: {props.done === true ? "Feito" : "Pendente"}</h6>
        </span>
      </div>
    </>
  );
}
