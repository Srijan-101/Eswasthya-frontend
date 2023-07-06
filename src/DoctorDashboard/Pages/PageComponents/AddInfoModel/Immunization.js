import { TbVaccine } from "react-icons/tb";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Store/UserState";
import Message from '../../../../UserAuthentication/Helper/Message'



const Immunization = ({ patientsInformation }) => {
    const { getStoredCookie } = useContext(AuthContext)
    const [VaccType, setVaccType] = useState([]);
    const [Data, setData] = useState({});
    const [status,setStatus] = useState({
          message : "",
    })


    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}api/vaccination/get-vaccine-name-list`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
        })
            .then((res) => setVaccType(res?.data?.data))
            .catch((error) => console.log(error))
    }, [])

    const onChangeValue = (e) => {
        setData((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    console.log(patientsInformation);

    const onAdd = () => {

        let date = new Date();
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let formattedDate = year + "-" + month + "-" + day;


        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}api/vaccination/save`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
            data: {
                vaccineName: Data.vaccineName,
                dosage: Data.dosage,
                vaccinationDate: formattedDate,
                patientId: patientsInformation?.AppointmentDetails?.patientId
            }
        })
        .then((res) => setStatus({
              message : res?.data?.message,
              error : false
        }))
        .catch((error) =>   {
            setStatus({
                message : error?.data?.message,
                error : true
          })
        });
    }

    const onClose = () => {
        let a = document.getElementById("vaccineModal");
        a.classList.add("hidden");
    }


    return (
        <div
            id="vaccineModal"
            tabindex="-1"
            aria-hidden="true"
            class="backdrop-blur-sm bg-gray/30 hidden flex items-center justify-center h-screen fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div class="relative w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                        <span className="text-4xl mr-2">
                            <TbVaccine />
                        </span>{" "}
                        Add Immunization
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

                    <div class="p-6 m-6">
                         {status.message || status?.error ? <Message message={status?.message} error={status?.error}/> : null } 
                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">

                            <div className="relative">
                                <label htmlfor="role" class="block mb-2 text-sm  text-gray-400 dark:text-white">Select vaccination type</label>
                                <select onChange={onChangeValue} name="vaccineName" id="role" defaultValue={VaccType[0]} required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {
                                        VaccType.map((ele, key) => {
                                            return (
                                                <option value={ele} key={key}>{ele}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="relative">
                                <label htmlfor="role" class="block mb-2 text-sm  text-gray-400 dark:text-white">Select number of dosage</label>
                                <select onChange={onChangeValue} name="dosage" id="role" defaultValue={1} required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="2">3</option>
                                    <option value="2">4</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div class="ml-3 flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={onAdd}
                            data-modal-hide="defaultModal"
                            type="button"
                            class="text-white bg-eswasthyaprim focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add
                        </button>
                        <button
                            onClick={onClose}
                            data-modal-hide="defaultModal"
                            type="button"
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

export default Immunization;
