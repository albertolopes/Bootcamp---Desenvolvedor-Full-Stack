import React from "react";

export default function ProjetoBase(props) {
  return (
    <div className="row center">
      <div className="col s3">
        <h6>Total de Tarefas: {props.all}</h6>
      </div>
      <div className="col s3">
        <h6>Tarefas cumpridas: {props.tasksMaked}</h6>
      </div>
      <div className="col s3">
        <h6>Total não cumpridas: {props.tasksNotMaked}</h6>
      </div>
      <div className="col s3">
        <h6>
            Pesquisando: {(props.month.length < 2 ? "0" + props.month : props.month)}/{props.year}
        </h6>
      </div>
    </div>
  );
}
