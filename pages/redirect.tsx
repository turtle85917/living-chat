import { useEffect } from "react";
import type { NextPage } from "next";

import axios from "axios";

const Redirect: NextPage = () => {
  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const code = search.get("code");

    if (!code) {
      location.href = "/";
    }

    axios("http://localhost:3000/api/user/login", {
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
      <h3 className="text-gray-700 text-center">Loading...</h3>
    </>
  );
};

export default Redirect;