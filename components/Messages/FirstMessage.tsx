import { Component } from "react";

export default class FirstMessage extends Component {
  render() {
    return (
      <div className="flex py-2 my-2">
        <span className="font-bold text-2xl mx-auto">
          <a className="text-gray-500">Online Chat.</a>에 어서 오세요!
        </span>
      </div>
    )
  }
}