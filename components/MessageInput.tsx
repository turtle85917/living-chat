import { Component } from "react";

interface P {
  connect: DiscordUser | boolean | undefined;
  sendMessage: () => Promise<void>;
}

export default class MessageInput extends Component<P, {}> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <div className="w-full mb-4 absolute">
        <div className="flex rounded-xl">
          <input
            className="content w-full truncate rounded-l-md py-3 px-2 text-white bg-gray-600 focus:outline-none"
            placeholder={
              typeof this.props.connect === "boolean"
              ? " ๐ก ์ ์๋ง ๊ธฐ๋ค๋ ค์ฃผ์ธ์..."
              : this.props.connect === undefined
              ? " ๐ ๋ก๊ทธ์ธ์ ํด์ฃผ์ธ์."
              : " ๐ฌ ๋ฉ์์ง ๋ด์ฉ์ ์๋ ฅํด์ฃผ์ธ์."
            }
            disabled={typeof this.props.connect === "boolean" || this.props.connect === undefined}
            onKeyDown={(event) => {
              const keycode = event.code;
              if (keycode === "Enter") {
                this.props.sendMessage();
              }
            }}
            />
          <button
            className="bg-gray-600 px-3 border-l-2 text-gray-500 border-gray-400 rounded-r-md hover:text-gray-300 focus:outline-none"
            onClick={() => {
              this.props.sendMessage();
            }}
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto ml-1 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <div className="flex ml-2 opacity-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          ์๋ฌด๋ ์๋ ฅ์ ์ํ๊ณ  ์์ด์.
        </div>
      </div>
    );
  }
}