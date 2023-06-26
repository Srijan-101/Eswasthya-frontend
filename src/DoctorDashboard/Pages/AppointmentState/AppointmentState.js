import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Store/UserState";
import axios from "axios";

export const AppointmentContext = createContext();


const AppointmentContextProvider = (props) => {

    const [modalState, setStateModal] = useState();
    const [patchData, setPatchData] = useState();
    const { getStoredCookie } = useContext(AuthContext)

    useEffect(() => {
        setStateModal(document.getElementById("confirmModal"))
    }, [])

    const Reject = (appointmentId, doctorId, patientId, patientName) => {
        setPatchData({ appointmentId, doctorId, patientId, patientName });
        modalState.getElementsByTagName('h3')[0].innerText = `Are you sure you want to reject an appointment for patient's name : ${patientName}?`
        modalState.classList.remove("hidden");
    }

    const closeModal = () => {
        modalState.classList.add("hidden")
        setPatchData({});
    }

    const RejectAPIcall = () => {
        console.log(patchData);
        axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API}api/appointment/update-appointment-approval`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
            data: {
                appointmentId: patchData.appointmentId,
                doctorId: patchData.doctorId,
                patientId: patchData.patientId,
                status: "REJECTED"
            }
          })
            .then((res) => {
                console.log(res);
                modalState.classList.add("hidden")
            }).catch((error) => console.log(error))
    }

    return (
        <AppointmentContext.Provider
            value={{ Reject, closeModal, RejectAPIcall }}
        >
            {props.children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentContextProvider