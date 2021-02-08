import React from "react";

export default function CardComponent(props) {
  const handleEditFinance = () => {
    console.log(props.id)
    // props.onChangeFilter(props.id);
  };

  const handleDeleteFinance = () => {
    console.log(props.id)
    // props.onChangeFilter(props.id);
  };

  return (
    <>
      <div
        className={
          "row card-panel" + (props.type === "-" ? " teal" : " purple")
        }
      >
        <span className="col left white-text">
          <h4>{props.day}</h4>
        </span>
        <span className="col left white-text">
          <h5>{props.category}</h5>
          <h7>{props.description}</h7>
        </span>
        <span className="col right center white-text center">
          <button className="col btn-flat white-text">
            <i className="material-icons" onClick={handleEditFinance}>
              create
            </i>
          </button>

          <button className="col btn-flat white-text">
            <i className="material-icons" onClick={handleDeleteFinance}>
              delete
            </i>
          </button>
        </span>
        <span className="col right center white-text">
          <h5>{`R$ ${props.value}`}</h5>
        </span>
      </div>
    </>
  );
}
