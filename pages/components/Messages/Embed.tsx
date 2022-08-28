import { Component } from "react";

interface P {
  data: IEmbed;
}

export default class Embed extends Component<P, {}> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <div className="embed bg-gray-500 border-gray-500 px-2 py-2 rounded-lg" style={{ borderColor: this.props.data.color, borderLeftWidth: this.props.data.color ? "6px" : "0" }}>
        {this.props.data.title && <div className="text-lg font-bold">{this.props.data.title}</div>}
        {this.props.data.description && <div className="text-base">{this.props.data.description}</div>}
        {this.props.data.stacks &&
          <div>
            {
              this.props.data.stacks.map((stack, idx) => (
                <div key={idx}>
                  <span className="bg-gray-400 font-bold">{stack.key[0]}</span>
                  <span className="font-sans">{stack.value}</span>
                </div>
              ))
            }
          </div>
        }
        {this.props.data.thumbnail && <div className="overflow-hidden max-h-40 rounded-md"><img alt="image" src={this.props.data.thumbnail} /></div>}
      </div>
    )
  }
}