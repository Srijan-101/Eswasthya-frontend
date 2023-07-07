import { useEffect, useState, useContext } from "react";
import { Accordion } from 'flowbite';
import axios from "axios";
import { AuthContext } from "../../../../Store/UserState";
import { PatientDetailsContext } from "../../PatientsDetailsState/PatientDetailContext";



const VaccinationDetail = () => {
    const { getStoredCookie } = useContext(AuthContext)
    const [vaccinationData, setVaccinationData] = useState([]);

    const {Flag} = useContext(PatientDetailsContext)

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}api/vaccination/view-by-patient/${localStorage.getItem("patientId")}`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
        }).then((res) => {
            setVaccinationData(res?.data?.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [Flag])






    return (
        <div className="w-fit">
            {
               vaccinationData.length !== 0 ? vaccinationData.map((ele, key) => {
                    return (
                    <>
                        <h2 id="accordion-example-heading-3">
                            <button type="button" class=" items-center justify-between  p-5 font-medium text-left text-gray-500" aria-expanded="false" aria-controls="accordion-example-body-3">
                                <span className="text-gray-900">{ele.vaccineName}</span><br/>
                                <span className="text-sm">{ele.vaccinationDate}</span>
                            </button>
                          
                        </h2>
                        <hr/>
                    </>
                    )
                }) : <div class="pl-10 text-base mt-4 text-left font-semibold">No vaccination Data</div>
            }
        </div>
    )
}

export default VaccinationDetail;