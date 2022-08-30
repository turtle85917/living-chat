import { Component } from "react";

import getDate from "../../utils/get-date";

import Badge from "./Badge";

interface P {
  data: IUser;
  dev: boolean;
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
        <span className="flex ml-2 my-auto text-xl">
          {this.props.data.username}
          {this.props.dev && <Badge type="TEST" />}
          <span className="text-xs mt-2 ml-2 text-gray-700">{getDate(this.props.timestamp)}</span>
        </span>
      </div>
    )
  }
}