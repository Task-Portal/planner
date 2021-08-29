import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class SelectComponent extends Component {
  componentDidMount() {
    M.FormSelect.init(this.Select, {});
    console.log("this.props.selectedElem", this.props.selectedElem);
  }
  handleChangeSelect = (e) => {
    this.props.handleChange(e, "status");
  };

  render() {
    return (
      <div className="input-field col s6">
        <span>Status</span>
        <select
          ref={(sel) => {
            this.Select = sel;
          }}
          onChange={() => {
            let elem = M.FormSelect.getInstance(this.Select);
            this.handleChangeSelect(elem.input.value);
          }}
          value={this.props.selectedElem}
        >
          <option value="None">None</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    );
  }
}

export default SelectComponent;
