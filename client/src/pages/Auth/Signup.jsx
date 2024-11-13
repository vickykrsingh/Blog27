import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUpService } from "../../services";
import { toast } from "react-toastify";
import GoogleLogin from "./GoogleLogin";

function SignUp() {
  const [data, setData] = useState({
    name:"",
    username:"",
    email: "",
    password: "",
  });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await signUpService(data);
      console.log(resp);
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
        <h1 className="text-primary font-bold text-2xl">SIGN UP</h1>
        <input
          className="transparent-input"
          type="text"
          placeholder="Enter your name"
          value={data.name}
          required
          onChange={handleOnChange}
          name="name"
        />
        <input
          className="transparent-input"
          type="text"
          placeholder="username"
          value={data.username}
          required
          onChange={handleOnChange}
          name="username"
        />
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
        <button
          className="button-primary py-2 font-semibold tracking-widest"
          type="submit"
        >
          Submit
        </button>
        <div className="flex w-full justify-center text-sm">
          <Link to={"/sign-in"}>
            already have and account ?{" "}
            <span className="cursor-pointer hover:text-primary duration-300">
              signin
            </span>
          </Link>
        </div>
        <p className="w-full text-center tracking-wider">or</p>
        <GoogleLogin/>
      </form>
    </main>
  );
}

export default SignUp;
