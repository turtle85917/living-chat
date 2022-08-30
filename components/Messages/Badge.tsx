import { Component } from "react";

interface P {
  type: string;
}

export default class Badge extends Component<P, {}> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <span className="ml-1 px-1 py-1 leading-4 rounded-lg bg-indigo-500">
        <span className="text-xs text-white">{this.props.type}</span>
      </span>
    )
  }
}