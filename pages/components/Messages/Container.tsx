import { Component } from "react";

import Message from "./Message";
import Embed from "./Embed";
import User from "./User";

import getDate from "../../utils/get-date";

interface P {
  data: IMessage;
}

export default class Container extends Component<P, {}> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <div className="py-2 ml-2 my-2">
        {this.props.data.user && (
          <>
            <User data={this.props.data.user} timestamp={this.props.data.timestamp} />
            <div className="content mt-1 w-fit mr-2">
              {this.props.data.content && <Message content={this.props.data.content} />}
              {
                this.props.data.embeds?.map((embed, idx) => (
                  <Embed key={idx} data={embed} />
                ))
              }
            </div>
          </>
        )}
        {this.props.data.system && (
          <>
            <div className="flex">
              <span className="text-gray-500 ml-2">
                시스템 메시지가 도착했어요.
                <span className="text-sm ml-2 text-gray-700">{getDate(this.props.data.timestamp)}</span>
              </span>
            </div>
            <span className="content text-lg font-bold">{this.props.data.content}</span>
          </>
        )}
      </div>
    )
  }
}