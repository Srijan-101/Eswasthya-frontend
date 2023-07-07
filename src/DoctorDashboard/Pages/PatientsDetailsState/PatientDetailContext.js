import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Store/UserState";

export const PatientDetailsContext = createContext();

const PatientDetailsContextProvider = (props) => {
    const { AppointmentId } = useParams();
    const [patientsInformation, setPatientsInformation] = useState();
    const { getStoredCookie } = useContext(AuthContext)
    
    const [Flag,setFlag] = useState(false)
    const [allergicFlag,setAllergicFlag] = useState(false);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}api/appointment/view/${AppointmentId}`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
           })
            .then((ress) => {
                console.log(ress);
                axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API}api/patient/view/${ress?.data?.data?.patientId}`,
                    headers: {
                        'Authorization': `Bearer ${getStoredCookie("token")}`,
                    },
                })
                .then((res) => {
                    setPatientsInformation(res?.data?.data);
                    let AppointmentDetails = ress?.data?.data;
                    setPatientsInformation((prevState) => {
                         return {...prevState ,AppointmentId,AppointmentDetails}
                    })
                    localStorage.setItem('patientId',AppointmentDetails?.patientId);
                 })
                .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
    }, [Flag])


    const [Main, setMain] = useState([]);

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
                    setMain((prevState) => {
                        return [...prevState, ele?.allergicMedicineName]
                    })
                })
            })
            .catch((error) => console.log(error))
    }, [allergicFlag])


    return (
        <PatientDetailsContext.Provider
            value={{patientsInformation,setFlag,Flag,Main,allergicFlag,setAllergicFlag}}
        >
            {props.children}
        </PatientDetailsContext.Provider>
    )
}

export default PatientDetailsContextProvider;