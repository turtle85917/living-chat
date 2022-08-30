import { Component } from "react";

import Container from "./Container";
import FirstMessage from "./FirstMessage";

interface P {
  data: IMessage[]
}

export default class Messages extends Component<P, {}> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <div className="message-container overflow-y-scroll overflow-x-hidden mb-1">
        <FirstMessage />
        {this.props.data.map((Idata, idx) => (
          <Container key={idx} data={Idata} />
        ))}
      </div>
    )
  }
}