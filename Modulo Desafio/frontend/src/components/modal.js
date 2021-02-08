import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        // console.log("Open Start");
      },
      onOpenEnd: () => {
        // console.log("Open End");
      },
      onCloseStart: () => {
        // console.log("Close Start");
      },
      onCloseEnd: () => {
        // console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "30%",
    };
    M.Modal.init(this.Modal, options);

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
    return (
      <div className="input-field col">
        <div>
          <a
            className="waves-effect waves-light btn modal-trigger"
            data-target="modal1"
          >
            Modal
          </a>

          <div
            ref={(Modal) => {
              this.Modal = Modal;
            }}
            id="modal1"
            className="modal"
          >
            <div className="modal-content">
              <div className="row center">
                <p className="col s6">
                  <label>
                    <input
                      className="with-gap"
                      name="group3"
                      type="radio"
                      checked
                    />
                    <span>Despesa</span>
                  </label>
                </p>
                <p className="col s6">
                  <label>
                    <input
                      className="with-gap"
                      name="group3"
                      type="radio"
                      checked
                    />
                    <span>Lançamento</span>
                  </label>
                </p>
              </div>
              <div className="input-field col s12">
                <input id="Description" type="text" className="validate" />
                <label for="description">Descrição</label>
              </div>
              <div className="input-field col s12">
                <input id="category" type="text" className="validate" />
                <label for="category">Categorias</label>
              </div>
              <div className="input-field col s6">
                <input id="value" type="text" className="validate" />
                <label for="value">Valor</label>
              </div>
              <div className="input-field col s6">
                <input id="value" type="text" className="validate" />
                <label for="value">Data</label>
              </div>
              <a className="waves-effect waves-light btn-small">Salvar</a>
              <a className="modal-close waves-effect waves-red btn-flat">
                Fechar
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
