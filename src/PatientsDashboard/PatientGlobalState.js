import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../Store/UserState";
import axios from "axios";

export const PatientContext = createContext();

const PatientContextProvider = (props) => {
    const [PatientInformation, SetPatientInformation] = useState([]);
    const [AllergicDrug, setAllergicDrug] = useState([]);
    const [loading ,setLoading] = useState(true);


    const [Medication , setMedication] = useState([]);


    const [Diagonsis,setDiagonsis] = useState([]);


    const { getStoredCookie, isAuth } = useContext(AuthContext);


    useEffect(() => {
        setDiagonsis([]);
        setMedication([]);
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}api/patient/view-by-user-id/${isAuth().userId}`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
        })
            .then((res) => {
                SetPatientInformation(res.data.data);
                localStorage.setItem("patientId", res?.data?.data?.patientId)
            }).then(() => {
                setAllergicDrug([])
                axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API}api/allergic-medicine/list?patientId=${localStorage.getItem('patientId')}`,
                    headers: {
                        'Authorization': `Bearer ${getStoredCookie("token")}`,
                    },
                })
                    .then((res) => {
                        res?.data?.data.map((ele) => {
                            setAllergicDrug((prevState) => {
                                return [...prevState, ele?.allergicMedicineName]
                            })
                        })
                    })
                    .catch((error) => console.log(error))

                    axios({
                        method: "GET",
                        url: `${process.env.REACT_APP_API}api/prescription/list?patientId=${localStorage.getItem("patientId")}`,
                        headers: {
                            'Authorization': `Bearer ${getStoredCookie("token")}`,
                        },
                    })
                    .then((res) => {
                          let resData = res?.data?.data;
                          let updateData = {...Medication,resData}
                          setMedication(updateData);
                    })
                    .catch((error) => console.log(error))

                    axios({
                        method: "GET",
                        url: `${process.env.REACT_APP_API}api/diagnosis/list-by-patient/${localStorage.getItem("patientId")}`,
                        headers: {
                            'Authorization': `Bearer ${getStoredCookie("token")}`,
                        },
                    })
                    .then((res) => {
                          let resData = res?.data?.data;
                          let updateData = {...Diagonsis,resData}
                          setDiagonsis(updateData);
                    })
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
    }, [])




    // useEffect(() => { 
      
    //     if(Diagonsis.length !== 0){ 
    //          setLoading(true);
    //         let final = [];
    //         Promise.all(
    //             Diagonsis.resData.map((Ele) => {
    //                return axios({
    //                    method: "GET",
    //                    url: `${process.env.REACT_APP_API}api/diagnosis/get-diagnosis-test-prescription/${Ele.appointmentId}`,
    //                    headers: {
    //                        'Authorization': `Bearer ${getStoredCookie("token")}`,
    //                    },
    //                })
    //             })
    //         ).then((final) => {
    //                final.map((ele) => {
    //                    let medication = ele?.data?.data?.prescriptionList
    //                    final.push(medication);   
    //                })
    //           }).then(() => setMedication(final))
    //        }
          
    // },[Diagonsis])

    // console.log(Medication)
    


    const getProperty = (propertyName) => {
        return PatientInformation[propertyName]
    }
    const getPatientId = () => {
        return localStorage.getItem("patientId");
    }


    return (

        <PatientContext.Provider
            value={{ userInformation: PatientInformation,Diagonsis,loading,Medication,getProperty, getPatientId , AllergicDrug}}
        >
            {props.children}
        </PatientContext.Provider>
    )
}

export default PatientContextProvider;