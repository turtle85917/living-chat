import { Component } from "react";

import getDate from "../../utils/get-date";

interface P {
  data: IUser;
  timestamp: number;
}

export default class User extends Component<P, {}> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <div className="flex">
        <img alt="profile" src={this.props.data.avatar_url} className="w-8 h-8 rounded-full" />
        <span className="ml-2 my-auto text-xl">
          {this.props.data.username}
          <span className="text-sm mt-2 ml-2 text-gray-700">{getDate(this.props.timestamp)}</span>
        </span>
      </div>
    )
  }
}