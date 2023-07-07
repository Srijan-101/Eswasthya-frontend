import React, { useState } from "react";
import LoginImage from "../assets/login.jpg";
import logo from "../assets/logo.png";
import Message from "./Helper/Message";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

function ResetPassword() {

  const initialState = {
    loading: false,
    error: false,
    password: "",
    repassword: "",
    message: "",
  };

  const { userId, Link } = useParams();
  const [values, setValues] = useState(initialState);

  const onSubmit = async (event) => {
    console.log(values);
    event.preventDefault();
    setValues((prevState) => ({ ...prevState, loading: true }));
   

      if (values.password !== values.repassword) {
        setValues((prevState) => {
          return {
            ...prevState,
            error: true,
            loading: false,
            message: "Please make sure your password match.",
          };
        });


      } else {
         axios.get(
          `${process.env.REACT_APP_API}api/user/verify-reset-password-link/${userId}/${Link}`
        ).then((res) => {
            console.log(res);
        })
        .catch((error) => console.log(error))
     }

    //     if(res) {
    //       axios({
    //          url :`${process.env.REACT_APP_API}api/user/change-password`,
    //          method : 'POST',
    //          data : {
    //             newPassword : values?.password,
    //             id : userId
    //          }
    //       }).then((res) => {
    //         setValues((preState) => {
    //           return { ...preState, message: res?.data?.message, loading: false, error: false,repassword:'',password:''}
    //         })
    //       }).catch((error) => {
    //         setValues((prevState) => ({
    //           ...prevState,
    //           message: error?.response?.data?.data[0],
    //           loading: false,
    //           error: true,
    //         }));
    //       })
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setValues((prevState) => ({
    //     ...prevState,
    //     message: error?.response?.data?.data[0],
    //     loading: false,
    //     error: true,
    //   }));
    // }
  };

  const onChangee = name => event => {
    setValues((preState) => {
      return { ...preState, [name]: event.target.value }
    })
  }

  return (
    <>
      <div className="sm:overflow-hidden w-screen h-screen grid grid-cols-1 xl:grid-cols-2 bg-[#ffff]">
        <div className="p-4 flex flex-col justify-center items-center  ">
          <form className="border-[#f8f8f8] h-auto sm:w-[600px] h-auto w-[350px] items-center rounded-sm  p-9 m-8 mt-1 mx-24 bg-white mb-5">
            <div className="flex justify-center items-center pb-5">
              <img src={logo} alt="" class="self-center h-[80px] pt-2 " />
            </div>
            <div className="items-center mb-5">
              <h6 className="sm:text-[18px] text-[16px] sm:mb-[-8px] font-medium text-gray-500">
                RESET PASSWORD
              </h6>
              <h2 className="sm:text-[35px] text-[25px]  font-medium sm:pt-1  text-gray-600">
                kcsrijan33@gmail.com,
              </h2>
              <h6 className="sm:text-[17px] text-[15px]  pb-5 text-gray-400">
                Enter your new password and manage your account.
              </h6>
            </div>
            {values.error || values.message ? <Message message={values.message} error={values.error} /> : null}
            <div class="pb-6">
              <div className="grid grid-cols-1 pb-2">
                <div className=" text-left  text-gray-500 ">
                  <h1 className="sm:text-[15px] text-[12px]  relative text-gray-400">
                    Enter your new password
                  </h1>
                </div>
              </div>

              <div class="relative">
                <input
                  type="password"
                  onChange={onChangee("password")}
                  name="password"
                  id="email-address-icon"
                  class=" placeholder-gray-300 0 h-[50px] border border-gray-300 text-gray-900 text-[15px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  "
                  placeholder="Password"
                ></input>
              </div>
            </div>
            <div class="pb-6">
              <div className="grid grid-cols-1 pb-2">
                <div className=" text-left  text-gray-500 ">
                  <h1 className="sm:text-[15px] text-[12px]  relative text-gray-400">
                    Reenter your password
                  </h1>
                </div>
              </div>
              <div class="relative">
                <input
                  type="password"
                  onChange={onChangee("repassword")}
                  name="repassword"
                  id="email-address-icon"
                  class=" placeholder-gray-300 0 h-[50px] border border-gray-300 text-gray-900 text-[15px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  "
                  placeholder="Reenter password"
                ></input>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button  type="button" onClick={onSubmit} className="sm:w-[520px] rounded-md w-[275px] text-center py-3 mt-8 font-bold  bg-[#42ADF0] hover:bg-[#4D6B9C] relative  text-white hover:bold">
                Submit
              </button>
            </div>
            <div className="text-left sm:mt-[25px] mt-5 text-gray-500 ">
              <p className="sm:text-l text-[14px]">
                Remembered your password?{" "}
                <a className="sm:text-[15px] text-[15px]  text-[#42ADF0] hover:text-[#4D6B9C] ">
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="  w-full h-full hidden xl:block mt-[15%] p-[2%] bg-white">
          <img className="inline auto" src={LoginImage} alt="/" />
          {/* <img className='inline 2xl:w-[550px] 2xl:h-[550px]  w-[400px] h-[350px]' src={laptop} alt="/" /> */}
        </div>
      </div>
    </>
  );
}
export default ResetPassword;
