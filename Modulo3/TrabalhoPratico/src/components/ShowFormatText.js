import React, { Component } from "react";

import css from "./word.module.css";

export default class ShowFormatText extends Component {
  handleInputChange = (event) => {
    this.props.onChangeText(event.target.value);
  };

  render() {
    const { title, text } = this.props;
    return (
      <div className={css.flexRow}>
        <div className="input-field">
          <input           
            disabled
            placeholder=""
            type="text"
            value={text}
            onChange={this.handleInputChange}
          />
          <label  class="active" htmlFor="title">
            {title}
          </label>
        </div>        
      </div>
    );
  }
}
