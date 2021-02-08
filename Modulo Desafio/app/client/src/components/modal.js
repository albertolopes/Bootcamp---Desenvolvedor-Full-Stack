import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import { post } from "../services/apiService";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: null,
      value: null,
      category: null,
      yearMonthDay: null,
      type: "+",
    };
  }

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

  handleChange = (evento) => {
    const value = evento.target.value;
    const name = evento.target.name;

    this.setState({ [name]: value });
    console.log(this.state);
  };
  

  save = async () => {
    const response = await post(this.state);
    console.log(response)
    this.props.onChangeInsert();
  };

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
            ref={(modal) => {
              this.Modal = modal;
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
                      name="type"
                      value="-"
                      
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
                      name="type"
                      value="+"
                      onChange={this.handleChange}
                    />
                    <span>Lançamento</span>
                  </label>
                </p>
              </div>
              <div className="input-field col s12">
                <input
                  id="Description"
                  type="text"
                  className="validate"
                  name="description"
                  onChange={this.handleChange}
                />
                <label for="description">Descrição</label>
              </div>
              <div className="input-field col s12" name="category">
                <input
                  id="category"
                  type="text"
                  className="validate"
                  name="category"
                  onChange={this.handleChange}
                />
                <label for="category">Categorias</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="value"
                  type="text"
                  className="validate"
                  name="value"
                  onChange={this.handleChange}
                />
                <label for="value">Valor</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="value"
                  type="text"
                  className="validate"
                  name="yearMonthDay"
                  onChange={this.handleChange}
                />
                <label for="value">Data</label>
              </div>
              <a className="waves-effect waves-light btn-small" onClick={this.save}>Salvar</a>
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
