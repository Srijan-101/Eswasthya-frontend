import { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../../Store/UserState";
export const ProvinceContext = createContext();

const ProvinceContextProvider = (props) => {

    const { getStoredCookie } = useContext(AuthContext);

    const [DiseasesType, SetDiseaseType] = useState();

    const [ThirdOptionValue, setThirdOptionvalue] = useState();
    const [SecontOptionValue, setSecondOptionvalue] = useState();

    const [ProvinceData, setProvinceData] = useState();
    const [DistrictData, setDistrictData] = useState();

    const [Totalcount, SetTotalcount] = useState();

    const [Municipality,setMunicipality] = useState([]);

    const [Countstate, setCount] = useState();
    const [Namestate, setName] = useState();
    const [DistrictId, setDistrictId] = useState();

    const [optionControl, SetoptionControl] = useState({
        firstOp: '',
        SecondOp: '',
        ThirdOp: ''
    })

    const onDistrictClick = (e) => {
        setName(e.target.id);
        setCount(e.target.getAttribute("count"))
        setDistrictId(e.target.getAttribute("districtId"));
    }


    useEffect(() => {
        setMunicipality([]);
        if (optionControl.firstOp === "Drug" && optionControl.ThirdOp === null) {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/dashboard/admin/get-medicine-count-per-municipality-by-medicine-type?districtId=${DistrictId}&medicineType=${optionControl.SecondOp}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) setMunicipality(res?.data?.data?.municipalityList)
            }).catch((error) => console.log(error));
        }

        if (optionControl.firstOp === "Drug" && optionControl.ThirdOp !== null) {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/dashboard/admin/get-medicine-count-per-municipality-by-medicine-name?districtId=${DistrictId}&medicineName=${optionControl.ThirdOp}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) console.log(res.data.data)
            }).catch((error) => console.log(error));
        }
    },[DistrictId])



    const ApplyClick = (provinceId) => {
        if (optionControl.firstOp === "Drug" && optionControl.ThirdOp === null) {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/dashboard/admin/get-medicine-count-in-province-by-medicine-type?provinceId=${provinceId}&medicineType=${optionControl.SecondOp}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) setProvinceData(res.data.data)
            }).catch((error) => console.log(error));
        }

        if (optionControl.firstOp === "Drug" && optionControl.ThirdOp !== null) {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/dashboard/admin/get-medicine-count-in-province-by-medicine-name?provinceId=${provinceId}&medicineName=${optionControl.ThirdOp}`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) setProvinceData(res.data.data)
            }).catch((error) => console.log(error));
        }


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


        // if (optionControl.firstOp === "Diseases" && optionControl.ThirdOp === null) {
        //     axios({
        //         method: "GET",
        //         url: `${process.env.REACT_APP_API}api/dashboard/admin/get-disease-count-per-district-by-disease-type?diseaseType=${optionControl.SecondOp}`,
        //         headers: {
        //             'Authorization': `Bearer ${getStoredCookie("token")}`,
        //         },
        //     }).then((res) => {
        //         if (res.data.data) setDistrictData(res.data.data)
        //     }).catch((error) => console.log(error));
        // }

        // if (optionControl.firstOp === "Diseases" && optionControl.ThirdOp !== null) {
        //     axios({
        //         method: "GET",
        //         url: `${process.env.REACT_APP_API}api/dashboard/admin/get-disease-count-per-district-by-disease-name?diseaseName=${optionControl.ThirdOp}`,
        //         headers: {
        //             'Authorization': `Bearer ${getStoredCookie("token")}`,
        //         },
        //     }).then((res) => {
        //         if (res.data.data) setDistrictData(res.data.data)
        //     }).catch((error) => console.log(error));
        // }

    }

    useEffect(() => {
        let a = document.getElementsByClassName("mkhover");
        for (let i = 0; i < a.length; i++) {
            a[i].style.fill = "#3567aa";
        }
        if (DistrictData) {
            for (let i = 0; i < a.length; i++) {
                DistrictData?.map((ele) => {
                    if (ele?.districtName?.toUpperCase() === a[i]?.id?.toUpperCase()) {
                        if (ele?.count > 0) {
                            a[i].style.fill = "#bd465d"
                            a[i].setAttribute('count', `${ele?.count}`)
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
                if (res.data.data) setSecondOptionvalue(res.data.data)
            }).catch((error) => console.log(error));
        } else if (e.target.value === "Diseases") {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}api/diagnosis/list-disease-type`,
                headers: {
                    'Authorization': `Bearer ${getStoredCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.data) setSecondOptionvalue(res.data.data)
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
        
        if(Municipality.length !== 0){
            setMunicipality([]) 
            setName();
            setCount();
        }
     
        let a = document.getElementsByClassName("mkhover");
        for (let i = 0; i < a.length; i++) {
            if (a[i].style.fill !== "rgb(53, 103, 170)") {
                a[i].style.fill = "#3567aa";
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


    return (
        <ProvinceContext.Provider value={{ Municipality,Namestate, Countstate, onDistrictClick, ProvinceData, ApplyClick, onOptionChange, optionControl, SecontOptionValue, ThirdOptionValue }}>
            {props.children}
        </ProvinceContext.Provider>
    )
}

export default ProvinceContextProvider;