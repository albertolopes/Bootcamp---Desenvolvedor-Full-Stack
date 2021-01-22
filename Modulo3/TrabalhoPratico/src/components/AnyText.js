import React, { Component } from "react";

import css from "./word.module.css";

export default class AnyText extends Component {
  handleInputChange = (event) => {
    this.props.onChangeText(event.target.value);
  };

  render() {
    const { text } = this.props;
    return (
      <div className={css.flexRow}>
        <input
          placeholder="Type anything"
          type="text"
          value={text}
          onChange={this.handleInputChange}
        />

      </div>
    );
  }
}
