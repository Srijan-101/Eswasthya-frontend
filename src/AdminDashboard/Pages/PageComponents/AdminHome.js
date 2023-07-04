import { BsFillPersonVcardFill } from 'react-icons/bs';
import { RiMedicineBottleFill } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi'
import { GrMap } from 'react-icons/gr'
import { LiaStethoscopeSolid } from 'react-icons/lia'
import { BsFilterLeft } from 'react-icons/bs'



import Map from './Map';
import { useState, useContext } from 'react';
import { DashBoardContext } from './Context/Dashboard';

const AdminHome = () => {
    const [Name, setName] = useState('')
    const {
        Countstate,
        Namestate ,
        Total,
        Totalcount,
        ApplyClick, 
        SecontOptionValue, 
        ThirdOptionValue, 
        onOptionChange, 
        optionControl } = useContext(DashBoardContext)
    return (
        <>
            <div className="h-fit  overflow-hidden rounded-sm border-[2px] border-[#f8f8f8] bg-white shadow-xl ">
                <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                    <span className='text-2xl mr-2'><RiMedicineBottleFill /></span> General Information
                </div>
                <div className='grid lg:grid-cols-3 md:grid-cols-1 p-8 gap-2'>

                    <div class="w-full h-fit max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow">

                        <div className='grid grid-cols-3'>
                            <div class="flex flex-col col-span-2 pl-5 pb-5">
                                <h5 class="mb-1 text-xl align-left font-bold text-gray-900">Total Patients</h5>
                                <h5 class="mb-1 text-5xl align-left font-bold text-gray-900">{Total.totalPatients}</h5>
                            </div>
                            <h1 className='text-7xl'><FiUsers /></h1>
                        </div>
                    </div>
                    <div class="w-full h-fit max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow">

                        <div className='grid grid-cols-3 '>
                            <div class="flex col-span-2 flex-col pl-5 pb-5">

                                <h5 class="mb-1 text-xl align-left font-bold text-gray-900">Total Doctors</h5>
                                <h5 class="mb-1 text-5xl align-left font-bold text-gray-900">{Total.totalDoctors}</h5>

                            </div>

                            <h1 className='text-8xl text-gray-900'><LiaStethoscopeSolid /></h1>
                        </div>

                    </div>
                    <div class="w-full h-fit max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow">

                        <div className='grid grid-cols-3'>
                            <div class="flex  col-span-2 flex-col pl-5 pb-5">

                                <h5 class="mb-1 text-xl align-left font-bold text-gray-900">Total Districts</h5>
                                <h5 class="mb-1 text-5xl align-left font-bold text-gray-900">77</h5>

                            </div>

                            <h1 className='text-7xl'><GrMap /></h1>
                        </div>

                    </div>



                </div>
            </div>

            <div className="w-full h-screen bg-metal mx-auto grid lg:grid-cols-2 lg:grid-flow-col gap-2 md:grid-col-1">
                <div className="h-fit  overflow-hidden rounded-sm border-[2px] border-[#f8f8f8] bg-white shadow-xl ">
                    <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                        <span className='text-2xl mr-2'><RiMedicineBottleFill /></span> Demographic visualization
                    </div>
                    <div className="relative grid grid-cols-1  overflow-scroll">
                        <Map Name={Name} setName={setName} />
                    </div>
                </div>
                <div className="rounded-sm h-fit border-[2px] border-[#f8f8f8] bg-white shadow-xl">
                    <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                        <span className='text-2xl mr-2'><BsFillPersonVcardFill /></span> General information
                    </div>
                    <div class="p-6 m-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className='grid grid-cols-1'>
                            <div class="flex  col-span-2 flex-col pl-5 pb-5">
                                <h5 class="mb-1 text-xl align-left font-bold text-gray-900">Choosed Filtering</h5>
                                <br />
                                <nav class="flex" aria-label="Breadcrumb">
                                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                                        <li class="inline-flex items-center">
                                            <span class="inline-flex items-center text-sm font-medium text-gray-700  dark:text-gray-400 ">
                                                <span className='text-2xl mr-2'><BsFilterLeft /></span>
                                                {optionControl?.firstOp}
                                            </span>
                                        </li>
                                        {
                                            optionControl.firstOp && optionControl.SecondOp ? (
                                                <li>
                                                    <div class="flex items-center">
                                                        <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                                        <span  class="ml-1 text-sm font-medium text-gray-700  md:ml-2 dark:text-gray-400 ">{optionControl.SecondOp}</span>
                                                    </div>
                                                </li>
                                            ) : null
                                        }
                                        {
                                            optionControl.firstOp && optionControl.ThirdOp ? (
                                                <li aria-current="page">
                                                    <div class="flex items-center">
                                                        <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                                        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{optionControl.ThirdOp}</span>
                                                    </div>
                                                </li>
                                            ) : null
                                        }
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="relative m-3">
                        <div class=" p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Filters</h5>
                            <div className='grid grid-cols-3 gap-4 sm-grid-cols-2'>
                                <div className='relative'>
                                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                    <select onChange={onOptionChange} defaultValue="Drug use" name="firstOption" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                        <option value="Drug" selected>Drug use</option>
                                        <option value="Immunization">Immunization</option>
                                        <option value="Diseases">Diseases</option>
                                    </select>
                                </div>
                                <div className='relative'>
                                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                    <select id="countries" disabled={!optionControl?.firstOp} onChange={onOptionChange} name="SecondOption" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {
                                            SecontOptionValue?.map((ele, key) => {
                                                return (
                                                    <option value={ele} key={key}>{ele}</option>
                                                )
                                            })
                                        }


                                    </select>
                                </div>
                                <div className='relative'>
                                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                    <select id="countries" onChange={onOptionChange} name="ThirdOption" disabled={!optionControl?.SecondOp} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {
                                            ThirdOptionValue?.map((ele, key) => {
                                                return (
                                                    <option value={ele} key={key}>{ele}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <button onClick={ApplyClick} disabled={!optionControl.SecondOp} type="button" class=" h-[40px] mt-2 w-[100px] py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200">Apply</button>
                            </div>
                            <hr className='mt-5' />
                            <div className='grid grid-cols-2 gap-2 p-3'>
                                <div class="w-full h-fit max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow">

                                    <div className='grid grid-cols-1'>
                                        <div class="flex flex-col h-[105px] pl-5 pb-8">
                                            <h5 class="mb-1 text-lg align-left font-bold text-gray-600">District Name</h5>
                                            <h5 class="mb-1 text-2xl align-left font-bold text-gray-900">{ Namestate ? Namestate?.charAt(0).toUpperCase() + Namestate?.slice(1) : null}</h5>
                                        </div>
                                    </div>

                                </div>
                                <div class="w-full h-fit max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow">

                                    <div className='grid grid-cols-1'>
                                        <div class="flex h-[105px] col-span-2 flex-col pl-5 pb-5">

                                            <h5 class="mb-1 text-xl  align-left font-bold text-gray-900">Total Count</h5>
                                            <h5 class="mb-1 text-5xl align-left font-bold text-gray-900">{Countstate}</h5>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}


export default AdminHome;