import { BsFillPersonVcardFill } from 'react-icons/bs'
import { RiMedicineBottleFill } from 'react-icons/ri'
import { MdVaccines } from 'react-icons/md'
import Chart from './chart/Chart'
import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { DoctorContext } from '../../DoctorGlobalState'


const PatientsInfo = () => {

    const { DoctorInformation, PatientsData } = useContext(DoctorContext);
    let HospitalList = DoctorInformation?.hospitalNames?.split(",");
    return (
        <div className="w-full h-max bg-metal mx-auto grid lg:grid-rows-2 lg:grid-flow-col gap-2 md:grid-col-1">
            <div className="lg:row-span-2 lg:w-[450px] rounded-sm  border-[2px] border-[#f8f8f8] bg-white shadow-xl">
                <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                    <span className='text-2xl mr-2'><BsFillPersonVcardFill /></span> General information
                </div>

                <div className="grid grid-cols-2 pl-5 pr-5 mt-2 grid-flow-col ">
                    <div className="info p-1 pb-3 row-span-2">
                        <img class="md:w-36 md:h-36  w-20 h-20  rounded-full shadow-lg" src={DoctorInformation?.imagePath} alt={DoctorInformation?.firstName}/>
                    </div>
                    <div className="info p-1">
                        <span class="block">Dr.{DoctorInformation.firstName} {DoctorInformation.lastName}</span>
                        <span class="block">{DoctorInformation.email}</span>
                    </div>
                    <div className="info p-1">
                        <h1 class="text-gray-500" >Gender</h1>
                        <button disabled class="rounded-md h-10 mt-1 px-5 text-lg bg-slate-200 text-eswasthya-blue">{DoctorInformation.gender}</button>
                    </div>

                </div>

                <div className="grid grid-cols-2 pl-5 pr-5  pb-3">
                    <div className="info p-1">
                        <span class="text-gray-500 block">Qualification</span>
                        <button disabled class="rounded-md h-10 mt-1 px-5 text-lg bg-slate-200 text-eswasthya-blue">{DoctorInformation.gender}</button>
                    </div>
                    <div className="info p-1">
                        <span class="block">Speciality</span>
                        <button disabled class="rounded-md h-10 mt-1 px-5 text-lg bg-slate-200 text-eswasthya-blue">{DoctorInformation.specialization}</button>
                    </div>

                </div>
                <div className="grid grid-cols-2 pl-5 pr-5  pb-3">

                    <div className="info p-1">
                        <h1 class="text-gray-500" >Experience</h1>
                        <span class="text-gray-900">{DoctorInformation.experience} years</span>
                    </div>
                    <div className="info p-1">
                        <h1 class="text-gray-500" >NMC no </h1>
                        <span class="text-gray-900">{DoctorInformation.nmcLicenseNumber}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 pl-5 pr-5  pb-3">
                    <div className="info p-1">
                        <span class="block">Tele no</span>
                        <span class="text-gray-900">+977-{DoctorInformation.phoneNumber}</span>
                    </div>
                    <div className="info p-1">
                        <h1 class="text-gray-500" >Location</h1>
                        <span class="text-gray-900">Manbhawan,lalitpur</span>
                    </div>
                </div>
                <div className="info mt-3 flex items-center bg-eswasthyaprim text-white p-3">
                    <span className='text-2xl mr-2'><BsFillPersonVcardFill /></span> Associated Hospital
                </div>

                <div class="relative m-4 p-2">
                    <div className='grid grid-cols-3 gap-3'>

                        {
                            HospitalList?.map((ele, key) => {
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        disabled="true"
                                        className="px-2 py-2 text-sm rounded-md text-white bg-[#42ADF0]"
                                    >
                                        {ele}
                                    </button>
                                )
                            })
                        }


                    </div>
                </div>

            </div>
            <div className="lg:col-span-12 rounded-sm border-[2px] border-[#f8f8f8] bg-white shadow-xl">
                <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                    <span className='text-2xl mr-2'><MdVaccines /></span>Patients flow
                </div>
                <Chart />
            </div>
            <div className="lg:col-span-12 rounded-sm border-[2px] border-[#f8f8f8] bg-white shadow-xl ">

                <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                    <span className='text-2xl mr-2'><RiMedicineBottleFill /></span> Appointments
                </div>
                <div className="grid grid-cols-1 pl-7 pr-5 overflow-scroll">
                    <table className="mt-4">
                        <thead>
                            <tr className='text-left'>
                                <th>Patients Name</th>
                                <th>Time</th>
                                <th>Hospital</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>

                            {PatientsData.length === 0 ? <div class="pl-10 text-base mt-4 text-center font-semibold">No patient data</div> :
                      
                                (
                                    PatientsData.slice(0,4).map((ele, key) => {
                                         if(key !==4) 
                                        return (
                                            <tr key={key} class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className='py-3'>
                                                    <div class="flex items-center space-x-4">
                                                        <img class="w-10 h-10 rounded-full" src={ele?.imagePath} alt={ele?.patientName} />
                                                        <div class="font-medium dark:text-white">
                                                            <div>{ele.patientName}</div>
                                                            <div class="text-sm text-gray-500 dark:text-gray-400">{ele.age} years, {ele.gender}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-3 py-2">
                                                    <button
                                                        type="button"
                                                        disabled="true"
                                                        className="px-2 py-2 w-max text-sm rounded-md text-white bg-[#42ADF0]"
                                                    >
                                                        {ele.appointmentTime}
                                                    </button>
                                                </td>
                                                <td class="px-3 py-2">
                                                    {ele.hospitalName}
                                                </td>
                                                <td className="px-3 py-4">
                                                    <Link to={`../patientsInfo/${ele.appointmentId}`}>
                                                        <button
                                                            type="button"
                                                            className="mr-2 px-3 py-2 text-sm rounded-md text-white bg-[#42ADF0]"
                                                        >
                                                            View more
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}


                        </tbody>
                        <div className='flex mt-5'>
                            <svg data-accordion-icon class="w-12 h-12 text-eswasthyaprim " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </div>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default PatientsInfo;