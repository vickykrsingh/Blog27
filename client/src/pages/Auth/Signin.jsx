import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInService } from "../../services";
import { toast } from "react-toastify";
import GoogleLogin from "./GoogleLogin";

function Signin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await signInService(data);
      if (resp.success) {
        toast.success(resp.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <main className="main-container flex items-center justify-center">
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col bg-gradient-to-tr from-gray-200 to-gray-300 hover:bg-gradient-to-tr hover:to-gray-200 hover:from-gray-300 duration-1000 rounded-md shadow-md w-full md:w-[80%] lg:w-[60%] xl:w-[50%] gap-4 px-6 py-10"
      >
        <h1 className="text-primary font-bold text-2xl">SIGN IN</h1>
        <input
          className="transparent-input"
          type="text"
          placeholder="abc@gmail.com"
          value={data.email}
          required
          onChange={handleOnChange}
          name="email"
        />
        <input
          className="transparent-input"
          type="password"
          placeholder="*******"
          value={data.password}
          required
          onChange={handleOnChange}
          name="password"
        />
        <div className="w-full flex justify-end">
          <Link
            to={"/forgot-password"}
            className="text-sm hover:text-primary duration-300"
          >
            forget password ?
          </Link>
        </div>
        <button
          className="button-primary py-2 font-semibold tracking-widest"
          type="submit"
        >
          Submit
        </button>
        <div className="flex w-full justify-center text-sm">
          <Link to={"/sign-up"}>
            don't have and account ?{" "}
            <span className="cursor-pointer hover:text-primary duration-300">
              create one
            </span>
          </Link>
        </div>
        <p className="w-full text-center tracking-wider">or</p>
        <GoogleLogin/>
      </form>
    </main>
  );
}

export default Signin;
