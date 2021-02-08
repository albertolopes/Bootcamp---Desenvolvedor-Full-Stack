import React from "react";

import Cart from "./components/card";
import Select from "./components/select";
import Modal from "./components/modal";
import Form from "./components/form";

export default function App() {
  return (
    <>
      <div className="row container center">
        <h4>Bootcamp Full Stack - Desafio Final</h4>
      </div>
      <div className="row container center">
        <h5>Controle Financeiro Pessoal</h5>
      </div>
      <div className="row container center">
        <Select />
      </div>
      <div className="row container center">
          <Modal />
          <Form />
      </div>
      <div className="row container center">
        <Cart />
      </div>
    </>
  );
}
