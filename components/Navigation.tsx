import { Component } from "react";
import { Transition } from "@headlessui/react";

import getAvatar from "../utils/get-avatar";

interface P {
  user: DiscordUser | boolean | undefined;
  users: number;
  ousers: SUsers[];
}

interface S {
  MobileNavisOpen: boolean;
  ModalOpen: boolean;
}

export default class Navigation extends Component<P, S> {
  constructor(props: P) {
    super(props);
  }

  async componentDidMount() {
    this.setState({ MobileNavisOpen: false, ModalOpen: false });
  }

  render() {
    const DISCORD_LOGIN = "https://discord.com/api/oauth2/authorize?client_id=1009058082292256858&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&response_type=code&scope=identify";

    return (
      <>
        <nav className="py-2 bg-gray-500">
          <div className="flex py-3 justify-between">
            <div className="inline-flex">
              <span className="text-left text-3xl pl-2 text-gray-200 font-bold">
                Online Chat.
              </span>
              <div
                className="flex ml-2 mt-1"
                onClick={() => {
                  this.setState({ ModalOpen: true });
                }}>
                <div className="bg-green-500 p-0 w-5 h-5 rounded-full mt-1" />
                <span className="ml-1 text-xl">
                  {this.props.users ?? 0}
                  명
                </span>
              </div>
            </div>
          <div className="block md:hidden">
            <button
            onClick={() => {
              this.setState({ MobileNavisOpen: !this.state?.MobileNavisOpen });
            }}
            className="bg-gray-900 rounded-md text-gray-400 inline-flex items-center justify-center p-2 mr-2 hover:text-white focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="hidden md:inline-flex mt-1">
            <a
            className="transition text-white text-xl pl-1 mr-3 border-l-2 border-gray-400 flex hover:text-gray-700 hover:cursor-pointer"
            onClick={() => {
              if (this.props.user === undefined) location.href = DISCORD_LOGIN;
            }}
            >
              {
                typeof this.props.user === "boolean"
                ? <>Loading</>
                : this.props.user === undefined
                ? <>Login</>
                : (<>
                  <img alt="profile" src={getAvatar(this.props.user)} className="w-7 h-7 rounded-full" />
                  <span className="ml-2">{this.props.user.username}</span>
                </>)
              }
            </a>
            {
              typeof this.props.user === "boolean" || this.props.user === undefined
              ? <></>
              : (<div
                className="transition mt-1 -ml-2 mr-2 hover:cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("login");
                  location.href = "/";
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400 hover:text-red-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </div>)
            }
          </div>
        </div>
        <Transition
        show={this.state?.MobileNavisOpen || false}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        >
          <div className="block md:hidden border-t-2 border-gray-400 py-1">
            <a
            className="flex text-white text-xl py-1 px-2 hover:text-gray-700"
            onClick={() => {
              if (this.props.user === undefined) location.href = DISCORD_LOGIN;
            }}
            >
              {
                typeof this.props.user === "boolean"
                ? <>Loading</>
                : this.props.user === undefined
                ? <>Login</>
                : (<>
                  <img alt="profile" src={getAvatar(this.props.user)} className="w-7 h-7 rounded-full" />
                  <span className="ml-2">{this.props.user.username}</span>
                </>)
              }
            </a>
            {
              typeof this.props.user === "boolean" || this.props.user === undefined
              ? <></>
              : (<a
                className="flex text-red-400 text-xl py-1 px-2 hover:text-red-700"
                onClick={() => {
                  localStorage.removeItem("login");
                  location.href = "/";
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span className="ml-2">로그아웃</span>
              </a>)
            }
          </div>
        </Transition>
      </nav>
      {this.state?.ModalOpen === true && <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 focus:outline-none">
        <div className="relative w-80 my-6 z-50">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full focus:outline-none">
            <div className="flex p-2 bg-gray-300 border-b border-solid border-slate-200 rounded-t">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <span className="ml-2 font-semibold">접속자 ({this.props.users ?? 0}명 접속 중)</span>
            </div>
            <div className="bg-gray-400 relative flex-auto h-[50vh] overflow-y-scroll">
              {
                this.props.ousers.length === 0
                ? (<div className="p-10 text-center">아무도 없어요...</div>)
                : (<>
                  {this.props.ousers.map(ouser => (
                    <div className="flex pl-2 py-2" key={ouser.id}>
                      <img alt="profile" src={ouser.avatarUrl} className="w-7 h-7 rounded-full" />
                      <span className="truncate text-lg ml-2">{ouser.username}</span>
                    </div>
                  ))}
                </>)
              }
            </div>
            <div className="flex bg-gray-400 items-center justify-end p-6 rounded-b">
              <button
                onClick={() => {
                  this.setState({ ModalOpen: false });
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black" />
      </div>}
    </>
    )
  }
}