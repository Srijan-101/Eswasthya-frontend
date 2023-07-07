
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Store/UserState";
import Message from '../../../../UserAuthentication/Helper/Message'
import {MdOutlineMedicalInformation} from 'react-icons/md'
import { PatientDetailsContext } from "../../PatientsDetailsState/PatientDetailContext";


const UpdateInfo = ({patientsInformation}) => {

    const { getStoredCookie } = useContext(AuthContext)
    const {setFlag,Flag} = useContext(PatientDetailsContext)


    const [status,setStatus] = useState({
        message : "",
    })

    const [value,setValue] = useState({
         height : "",
         weight : "",
         patientId : localStorage.getItem("patientId")
    })

    useEffect(() => {
          setValue((prevState) => {return {...prevState,height : patientsInformation?.height,  weight : patientsInformation?.weight}})
    },[])


    const onChangeEvent = name => event => {
         setValue((preState) => {
                return { ...preState, [name]: event.target.value }
         })
    }

    const Update = () => {
        axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API}api/patient/update-height-weight`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
            data: value
        })
        .then((res) => {setStatus({
              message : res?.data?.message,
              error : false
        }); setFlag(Flag ? false : true) })
        .catch((error) =>   {
            setStatus({
                message : error?.data?.message,
                error : true
          })
        });

        setTimeout(() => {
              setStatus({
                   message : ''
              })
        },2000)
    }

    const onClose = () => {
        let a = document.getElementById("UpdateModal");
        a.classList.add("hidden");
    }


    return (
        <div
            id="UpdateModal"
            tabindex="-1"
            aria-hidden="true"
            class="backdrop-blur-sm  hidden bg-gray/30  flex items-center justify-center h-screen fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div class="relative w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                        <span className="text-3xl mr-2 text-white">
                          <MdOutlineMedicalInformation/>
                        </span>{" "}
                            Update basic patients information 
                        <button
                            onClick={onClose}
                            type="button"
                            class="text-gray-400 bg-transparent text-white hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal"
                        >
                            <svg
                                class="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="relative p-6">
                    {
                        
                         status.message || status?.error ? <Message message={status?.message} error={status?.error}/> : null 
                    } 
                <div className='grid grid-cols-2 gap-6'>
                    <div className=' text-left  text-gray-400 '>
                        <h1 className='sm:text-[15px] text-[12px] pb-2 relative text-gray-400'>Enter your height</h1>
                        <input
                            onChange={onChangeEvent("height")}
                            type="number"
                            value={value.height}
                            min={1}
                            max={200}
                            id="email-address-icon"
                            class="placeholder-gray-300 h-[50px] 0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  "
                            placeholder="1 Ft"
                        ></input>
                    </div>
                    <div className=' text-left text-gray-400 '>
                        <h1 className='sm:text-[15px] text-[12px] pb-2 relative text-gray-400'>Enter your weight</h1>
                        <input
                            onChange={onChangeEvent("weight")}
                            value={value.weight}
                            type="number"
                            min={1}
                            max={200}
                            id="email-address-icon"
                            class="placeholder-gray-300 h-[50px] 0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  "
                            placeholder="1 KG"
                        ></input>
                    </div>
                </div>
            </div>
                    <div class="ml-3 flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={Update}
                            data-modal-hide="defaultModal"
                            type="button"
                            class="text-white bg-eswasthyaprim focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Update
                        </button>
                        <button
                            data-modal-hide="defaultModal"
                            type="button"
                            onClick={onClose}
                            class="text-gray-500 bg-white hover:bg-gray-100  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateInfo;
