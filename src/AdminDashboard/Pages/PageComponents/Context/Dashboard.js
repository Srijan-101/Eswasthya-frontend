import { createContext, useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../Store/UserState";
import axios from "axios";

export const DashBoardContext = createContext();

const DashBoardContextProvider = (props) => {
    const { getStoredCookie } = useContext(AuthContext)
    const [DiseasesType, SetDiseaseType] = useState();

    const [ThirdOptionValue, setThirdOptionvalue] = useState();
    const [SecontOptionValue, setSecondOptionvalue] = useState();
    const [DistrictData, setDistrictData] = useState();

    const [Totalcount, SetTotalcount] = useState();

    const [Countstate,setCount] = useState();
    const [Namestate,setName] = useState();

    const [optionControl, SetoptionControl] = useState({
        firstOp: '',
        SecondOp: '',
        ThirdOp: ''
    })


    const ApplyClick = () => {

        if (optionControl.firstOp === "Drug" && optionControl.ThirdOp === null) {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/dashboard/admin/get-medicine-count-per-district-by-medicine-type?medicineType=${optionControl.SecondOp}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) setDistrictData(res.data.data)
            }).catch((error) => console.log(error));
        }

        if (optionControl.firstOp === "Drug" && optionControl.ThirdOp !== null) {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/dashboard/admin/get-medicine-count-per-district-by-medicine-name?medicineName=${optionControl.ThirdOp}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) setDistrictData(res.data.data)
            }).catch((error) => console.log(error));
        }

        if (optionControl.firstOp === "Diseases" && optionControl.ThirdOp === null) {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/dashboard/admin/get-disease-count-per-district-by-disease-type?diseaseType=${optionControl.SecondOp}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) setDistrictData(res.data.data)
            }).catch((error) => console.log(error));
        }

        if (optionControl.firstOp === "Diseases" && optionControl.ThirdOp !== null) {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/dashboard/admin/get-disease-count-per-district-by-disease-name?diseaseName=${optionControl.ThirdOp}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) setDistrictData(res.data.data)
            }).catch((error) => console.log(error));
        }

        if (optionControl.firstOp === "Immunization" && optionControl.SecondOp !== null) {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/dashboard/admin/get-vaccination-count-per-district?vaccineName=${optionControl.SecondOp}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) {setDistrictData(res.data.data);}
            }).catch((error) => console.log(error));
        }

    }

    useEffect(() => {
        let a = document.getElementsByClassName("mkhover");
        for(let i = 0 ; i < a.length;i++){
            a[i].style.fill="#3567aa";
         }
        if (DistrictData) {
            for (let i = 0; i < a.length; i++) {
                DistrictData?.map((ele) => {
                    if (ele?.districtName?.toUpperCase() === a[i]?.id?.toUpperCase()) {
                        if (ele?.count > 0) {
                            a[i].style.fill = "#bd465d"
                            a[i].setAttribute('count',`${ele?.count}`)
                        }
                    }
                })
            }
        }
    }, [DistrictData])


    const fetchSecondOption = (e) => {
        if (e.target.value === "Drug") {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/prescription/list-medicine-type`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) {
                    setSecondOptionvalue(res.data.data)
                    setThirdOptionvalue();
                }
            }).catch((error) => console.log(error));
        } else if (e.target.value === "Diseases") {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/diagnosis/list-disease-type`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) {
                    setSecondOptionvalue(res.data.data)
                    setThirdOptionvalue();
                }
            }).catch((error) => console.log(error));
        }else if (e.target.value === "Immunization"){
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/vaccination/get-vaccine-name-list`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) 
                {
                    setSecondOptionvalue(res.data.data)
                    setThirdOptionvalue();
                }
            }).catch((error) => console.log(error));
        }
    }

    const fetchThirdOption = (e) => {
        if (optionControl.firstOp === "Drug") {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/prescription/list-medicine-name-by-type?medicineType=${e.target.value}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) setThirdOptionvalue(res.data.data);
            }).catch((error) => console.log(error));
        }
        else if (optionControl.firstOp === "Diseases") {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/diagnosis/list-disease-name-by-type?diseaseType=${e.target.value}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) setThirdOptionvalue(res.data.data)
            }).catch((error) => console.log(error));
        }
    }


    const onOptionChange = (e) => {
        let a = document.getElementsByClassName("mkhover");
        for(let i = 0 ; i < a.length;i++){
            if(a[i].style.fill !== "rgb(53, 103, 170)"){
                a[i].style.fill="#3567aa";
            }
        }
        if (e.target.name === "firstOption") {
            SetoptionControl({

                firstOp: e.target.value,
                SecondOp: '',
                ThirdOp: ''
            });
            fetchSecondOption(e);
        } else if (e.target.name === "SecondOption") {
            SetoptionControl(prevState => ({
                ...prevState,
                ThirdOp: null,
                SecondOp: e.target.value
            }));
            fetchThirdOption(e);
        } else if (e.target.name === "ThirdOption") {
            SetoptionControl(prevState => ({
                ...prevState,
                ThirdOp: e.target.value
            }));
        }
    }



    const [Total, setTotal] = useState({
        totalDoctors: 0,
        totalPatients: 0
    });

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}api/dashboard/admin/get-patient-doctor-count`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
        }).then((res) => {
            if (res.data.data) setTotal(res.data.data)
        }).catch((error) => console.log(error))
    }, [])


    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}api/diagnosis/list-disease-type`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
        }).then((res) => {
            if (res.data.data) setThirdOptionvalue(res.data.data);
        }).catch((error) => console.log(error));
    }, [])






    return (
        <DashBoardContext.Provider value={{setCount,setName,Countstate,Namestate ,Totalcount, ApplyClick, SecontOptionValue, ThirdOptionValue, Total, DiseasesType, onOptionChange, optionControl }}>
            {props.children}
        </DashBoardContext.Provider>
    )
}

export default DashBoardContextProvider;