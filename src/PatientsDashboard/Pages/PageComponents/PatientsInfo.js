import { BsFillPersonVcardFill } from 'react-icons/bs'
import { RiMedicineBottleFill } from 'react-icons/ri'
import { MdVaccines } from 'react-icons/md'
import { FaWeight } from 'react-icons/fa'

import { AuthContext } from '../../../Store/UserState'
import { useContext, useState, useEffect } from 'react'
import { PatientContext } from '../../PatientGlobalState'
import axios from 'axios';
import { Link } from 'react-router-dom'


const PatientsInfo = () => {
    const { userInformation,Diagonsis,loading, Medication, getProperty, AllergicDrug } = useContext(PatientContext);

    return (

        <div className="w-full h-max h-screen bg-metal mx-auto grid lg:grid-rows-2 lg:grid-flow-col gap-2 md:grid-col-1">
            <div className="lg:row-span-2 rounded-sm  border-[2px] border-[#f8f8f8] bg-white shadow-xl">
                <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                    <span className='text-2xl mr-2'><BsFillPersonVcardFill /></span> General information
                </div>

                <div className="grid grid-cols-2 pl-5 pr-5 mt-2 grid-flow-col ">
                    <div className="info p-1 pb-3 row-span-2">
                        <img class="lg:w-40 lg:h-40 w-15 h-15 rounded-full shadow-lg" src={userInformation.imagePath} alt={userInformation.firstName} />
                    </div>
                    <div className="info p-1">
                        <span class="block">{userInformation.firstName} {userInformation.lastName}</span>
                        <span class="block">{userInformation.email}</span>
                    </div>
                    <div className="info p-1">
                        <h1 class="text-gray-500" >Birth Date</h1>
                        <span class="text-gray-900">{userInformation.dateOfBirth} ({userInformation.age + " years"})</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 pl-5 pr-5  pb-3">
                    <div className="info p-1">
                        <span class="text-gray-500 block">Health ID</span>
                        <button class="rounded-md h-10 mt-1 px-5 text-lg bg-slate-200 text-eswasthya-blue">{userInformation.medicalRecordNumber}</button>
                    </div>
                    <div className="info p-1">
                        <h1 class="text-gray-500" >Gender</h1>
                        <button class="rounded-md h-10 mt-1 px-5 text-lg bg-slate-200 text-eswasthya-blue">{userInformation.gender}</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 pl-5 pr-5  pb-3">
                    <div className="info p-1">
                        <span class="block">Blood group</span>
                        <button class="rounded-md h-10 mt-1 px-5 text-lg bg-slate-200 text-eswasthya-blue">{userInformation.bloodGroup}</button>
                    </div>
                    <div className="info p-1">
                        <h1 class="text-gray-500" >Weight</h1>
                        <span class="text-gray-900">{userInformation.weight} kg</span>
                    </div>
                </div>
                <div className="grid grid-cols-2  pl-5 pr-5  pb-3">
                    <div className="info p-1">
                        <span class="block">Tele no</span>
                        <span class="text-gray-900">+977-{userInformation.phoneNumber}</span>
                    </div>
                    <div className="info p-1">
                        <h1 class="text-gray-500" >Height</h1>
                        <span class="text-gray-900">{userInformation.height} Ft</span>
                    </div>
                </div>
                <div className="info mt-3 flex items-center bg-eswasthyaprim text-white p-3">
                    <span className='text-2xl mr-2'><BsFillPersonVcardFill /></span> Allergic drugs
                </div>
                <div class="relative m-4 p-2">
                    <div className='grid grid-cols-3 gap-3'>

                        {
                            AllergicDrug.length !== 0 ? AllergicDrug.map((ele, key) => {
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        disabled="true"
                                        className="px-5 py-2 text-sm rounded-md text-white bg-[#42ADF0]"
                                    >
                                        {ele}
                                    </button>
                                )
                            }) : <div class="text-base mt-2 text-left font-semibold">No allergic drug data</div>
                        }
                    </div>
                </div>
            </div>
            <div className="lg:col-span-12 rounded-sm border-[2px] border-[#f8f8f8] bg-white shadow-xl ">
                <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                    <span className='text-2xl mr-2'><RiMedicineBottleFill /></span> Medication information
                </div>
                <div className="grid grid-cols-1 pl-7 pr-5 overflow-scroll">
                    <table className="mt-4">
                        <thead>
                            <tr className='text-left'>
                                <th>Medication Name</th>
                                <th>Strength</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            Medication.length !== 0 ? Medication?.resData.splice(0,5).map((ele, key) => {
                                    return (
                                        <tr>
                                            <td className='py-3'>{ele.medicationName}</td>
                                            <td>{ele.dosageInUnit} Mg</td>
                                            <td>{ele.durationInDays} Days</td>
                                            <td className='text-xs'>{ele.startDate} - {ele.endDate}</td>
                                            <td><button type="button" class=" py-2 text-sm w-[90px] font-medium text-center text-white bg-blue-400 rounded-lg  focus:outline-none">Active</button></td>
                                        </tr>
                                    )
                                })  : null
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="lg:col-span-12 rounded-sm border-[2px] border-[#f8f8f8] bg-white shadow-xl">
                <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                    <span className='text-2xl mr-2'><MdVaccines /></span>Recent Diagnosis
                </div>
                <table class="w-full text-sm text-left text-gray-500 ">
                    <thead class="text-sm text-gray-400 border-t">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-lg">
                                Diagnoses
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Diagonsis?.resData?.map((ele, key) => {
                                return (
                                    <tr class="bg-white " key={key}> 
                                        <td class="px-6 py-2 font-medium text-gray-900">
                                            <Link to={`../viewMedicalDetails/${ele.appointmentId}`}>{ele.diseaseName}</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PatientsInfo;