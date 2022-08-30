import { useEffect } from "react";
import type { NextPage } from "next";

import axios from "axios";
import Head from "next/head";

const Redirect: NextPage = () => {
  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const code = search.get("code");

    if (!code) {
      location.href = "/";
    }

    axios(`${process.env.BACKEND}/user/login`, {
      method: "POST",
      data: { code }
    }).then(res => {
      localStorage.setItem("login", res.data.message);
      location.href = "/";
    }).catch(() => {
      location.href = "/";
    });
  }, []);

  return (
    <>
      <Head>
        <title>Online Chat. - Redirect...</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h3 className="text-gray-700 text-center">Loading...</h3>
    </>
  );
};

export default Redirect;