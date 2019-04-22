import React from "react";

import TemperaturInput from "./TemperatureInput";

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: "", scale: "c" };

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

  handleCelsiusChange(temperature) {
    this.setState({
      scale: "c",
      temperature
    });
  }

  handleFahrenheitChange(temperature) {
    this.setState({
      scale: "f",
      temperature
    });
  }

  render() {
    const { temperature, scale } = this.state;
    const celsius =
      scale === "f" ? this.tryConvert(temperature, this.toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? this.tryConvert(temperature, this.toFahrenheit) : temperature;

    return (
      <div>
        <TemperaturInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperaturInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

export default Calculator;
