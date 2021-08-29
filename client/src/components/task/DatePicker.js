import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class DatePicker extends Component {
  componentDidMount() {
    let options = {
      defaultDate: new Date(this.props.selectedDate),
      setDefaultDate: true,
      format: "dd dddd mmm , yyyy",
      autoClose: true,
      firstDay: 1,

      onClose: () => {
        let elem = M.Datepicker.getInstance(this.Select);
        this.props.handleChange(elem.date, this.props.name);
      },
    };
    M.Datepicker.init(this.Select, options);
    console.log("this.props.selectedElem", this.props.selectedElem);
  }

  render() {
    return (
      <div className="input-field col s6">
        <span>{this.props.name}</span>

        <input
          type="text"
          className="datepicker"
          ref={(sel) => {
            this.Select = sel;
          }}
        />
      </div>
    );
  }
}

export default DatePicker;
