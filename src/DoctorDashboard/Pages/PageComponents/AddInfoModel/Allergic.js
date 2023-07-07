import { TbVaccine } from "react-icons/tb";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Store/UserState";
import Message from '../../../../UserAuthentication/Helper/Message'
import { PatientDetailsContext } from "../../PatientsDetailsState/PatientDetailContext";



const Allergic = () => {
    const { getStoredCookie } = useContext(AuthContext)
    const {allergicFlag,setAllergicFlag} = useContext(PatientDetailsContext)



    const [VaccType, setVaccType] = useState([]);
    const [Drugs, setDrugs] = useState([]);


    const [InitalData, setInitialData] = useState([]);

    const [Main, setMain] = useState([]);
    const [Data, setData] = useState({});

    const [initalAdd, setInitialAdd] = useState([]);
    const [Removeserver, setRemoveserver] = useState([]);



    const [status, setStatus] = useState({
        message: "",
    })

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}api/prescription/list-medicine-type`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
        })
            .then((res) => setVaccType(res?.data?.data))
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        setMain([])
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}api/allergic-medicine/list?patientId=${localStorage.getItem('patientId')}`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
        })
            .then((res) => {
                res?.data?.data.map((ele) => {
                    setInitialData((prevState) => {
                        return [...prevState, { ele }];
                    })
                    setMain((prevState) => {
                        return [...prevState, ele?.allergicMedicineName]
                    })
                })
            })
            .catch((error) => console.log(error))
    }, [])




    const setDrugsValue = (e) => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}api/prescription/list-medicine-name-by-type?medicineType=${e.target.value}`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
        })
            .then((res) => setDrugs(res?.data?.data))
            .catch((error) => console.log(error))
    }


    const AddDrug = (name) => {
        if (!Main.includes(name)) {
            initalAdd.push(name);
            const newArray = [...Main, name];
            setMain(newArray);
        }
    }

    const RemoveDrug = (name) => {
        Removeserver.push(name);
        const updatedArray = Main.filter(item => item !== name);
        setMain(updatedArray);
    }


    const onChangeValue = (e) => {
        setData((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
        if (e.target.name === "vaccineName") setDrugsValue(e);
    }
    

   


    const onAdd = () => {

        const getId = [];
        if (Removeserver.length !== 0) {
            for (let i = 0; i < InitalData.length; i++) {
                for (let j = 0; j < Removeserver.length; j++) {
                    if (InitalData[i].ele.allergicMedicineName === Removeserver[j]) {
                        getId.push(InitalData[i].ele.id)
                    }
                }
            }
        }

        if (getId.length !== 0) {
            getId.map((ele) => {
                axios({
                    method: "DELETE",
                    url: `${process.env.REACT_APP_API}api/allergic-medicine/delete?allergicMedicineId=${ele}`,
                    headers: {
                        'Authorization': `Bearer ${getStoredCookie("token")}`,
                    },
                }) .catch((error) => console.log(error))
            })
            setStatus({
                message: "Allergic drug updated sucessfully!",
                error: false
            })
            setAllergicFlag(allergicFlag ? false : true)
        }

        if(initalAdd.length !== 0){
            let allergicMedicineList = []
            initalAdd.map((ele) => allergicMedicineList.push({allergicMedicineName:ele}))

            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API}api/allergic-medicine/save`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
                data: {
                    patientDetailId : localStorage.getItem("patientId"),
                    allergicMedicineList
                }
            }).then((res) => {setStatus({
                message: res?.data?.message,
                error: false
            });setAllergicFlag(allergicFlag ? false : true)})
            .catch((error) => {
                setStatus({
                    message: error?.data?.message,
                    error: true
                })
            });
        }
        setTimeout(() => {
            setStatus({
                 message : ''
            })
      },2000)
    }

    const onClose = () => {
        let a = document.getElementById("AllergicModal");
        a.classList.add("hidden");
    }


    return (
        <div
            id="AllergicModal"
            tabindex="-1"
            aria-hidden="true"
            class="backdrop-blur-sm hidden bg-gray/30  flex items-center justify-center h-screen fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div class="relative w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                        <span className="text-4xl mr-2">
                            <TbVaccine />
                        </span>{" "}
                        Add Allergic Drug
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
                        {status.message || status?.error ? <Message message={status?.message} error={status?.error} /> : null}
                        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-2">

                            <div className="relative">
                                <label htmlfor="role" class="block mb-2 text-sm  text-gray-400 dark:text-white">Select Drug type</label>
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

                            <div className="relative ">

                                <label htmlfor="role" class="block mb-2 text-sm  text-gray-400 dark:text-white">Select Drug name</label>
                                <select onChange={onChangeValue} name="DrugName" id="role" defaultValue={Drugs[0]} required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {
                                        Drugs.map((ele, key) => {
                                            return (
                                                <option value={ele} key={key}>{ele}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <button onClick={() => { AddDrug(Data?.DrugName) }} type="button" class="mt-6 ml-2 flex items-center justify-center text-white bg-eswasthyaprim  rounded-full w-10 h-10 focus:outline-none dark:focus:ring-blue-800">
                                <svg aria-hidden="true" class="w-8 h-8 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                <span class="sr-only">Open actions menu</span>
                            </button>

                        </div>
                        <div class="block mt-6 w-full p-6 bg-white border border-gray-200 rounded-lg shadow ">
                            <div className="grid grid-cols-3 gap-1">
                                {
                                    Main.length !== 0 ? (
                                        Main.map((ele, key) => {
                                            return (
                                                <div className="item">
                                                    <div id="alert-1" class="flex p-4 mb-4 text-white bg-[#42ADF0] rounded-lg " role="alert">
                                                        <div class="ml-3 text-sm font-medium ">
                                                            {ele}
                                                        </div>
                                                        <button onClick={() => { RemoveDrug(ele) }} type="button" class="ml-auto -mx-1.5 -my-1.5 text-white-500 rounded-lg focus:ring-2  p-1.5  inline-flex h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
                                                            <span class="sr-only">Close</span>
                                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })) : <div class="pl-1 text-base mt-2 text-center font-semibold">No Allergic Drug data</div>
                                }
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
                            Save
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

export default Allergic;
