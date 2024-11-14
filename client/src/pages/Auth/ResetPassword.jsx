import React, { useEffect, useState } from "react";
import { resetPasswordService } from "../../services";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

function ResetPassword() {
  const [data, setData] = useState({
    password: "",
    confirmPassword:""
  });
  const navigate = useNavigate();
  const {token} = useParams();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await resetPasswordService(data,token);
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
  useEffect(()=>{
    if(!token){
      toast.error('Unauthorized access')
      navigate('/')
    }
  },[])
  return (
    <main className="main-container flex items-center justify-center">
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col bg-gradient-to-tr from-gray-200 to-gray-300 hover:bg-gradient-to-tr hover:to-gray-200 hover:from-gray-300 duration-1000 rounded-md shadow-md w-full md:w-[80%] lg:w-[60%] xl:w-[50%] gap-4 px-6 py-10"
      >
        <h1 className="text-primary font-bold text-2xl">RESET PASSWORD</h1>
        <input
          className="transparent-input"
          type="password"
          placeholder="abc@gmail.com"
          value={data.password}
          required
          onChange={handleOnChange}
          name="password"
        />
        <input
          className="transparent-input"
          type="password"
          placeholder="abc@gmail.com"
          value={data.confirmPassword}
          required
          onChange={handleOnChange}
          name="confirmPassword"
        />
        <button
          className="button-primary py-2 font-semibold tracking-widest"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default ResetPassword;
