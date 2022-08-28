import { Component } from "react";

interface P {
  content: string;
}

export default class Message extends Component<P, {}> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <span className="text-base">
        {this.props.content}
      </span>
    )
  }
}