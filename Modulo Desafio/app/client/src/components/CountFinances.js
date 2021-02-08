import React from "react";

export default function ProjetoBase(props) {
  return (
    <>
      <div className="row center">
        <div className="col s3">
          <h6>Launch: {props.metric.launch}</h6>
        </div>
        <div className="col s3">
          <h6>Revenue: {props.metric.revenue}</h6>
        </div>
        <div className="col s3">
          <h6>Expenses: {props.metric.expenses}</h6>
        </div>
        <div className="col s3">
          <h6>Balance: {props.metric.balance}</h6>
        </div>
      </div>
    </>
  );
}
