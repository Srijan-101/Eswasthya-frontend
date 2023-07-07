

import { BsFillPersonVcardFill } from 'react-icons/bs';
import { RiMedicineBottleFill } from 'react-icons/ri';
import Provmap3 from "./Provmap"
import { useContext } from 'react';
import { BsFilterLeft } from 'react-icons/bs'


import { ProvinceContext } from '../ProvinceState/ProvinceState';
import Chartspie from '../../Chart/PieChart';


const Prov3 = () => {
    const { Municipality, Namestate, Countstate, ProvinceData, ApplyClick, onOptionChange, optionControl, SecontOptionValue, ThirdOptionValue } = useContext(ProvinceContext);
    return (
        <>
            <div className="h-fit  overflow-hidden rounded-sm border-[2px] border-[#f8f8f8] bg-white shadow-xl ">
                <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                    <span className='text-2xl mr-2'><RiMedicineBottleFill /></span> General Information
                </div>
                <nav class="m-3 flex" aria-label="Breadcrumb">
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
                                        <span class="ml-1 text-sm font-medium text-gray-700  md:ml-2 dark:text-gray-400 ">{optionControl.SecondOp}</span>
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

                <div className='grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1'>
                    <div class="relative m-3">
                        <div className='grid grid-cols-2 gap-4 sm-grid-cols-2'>
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
                            <button onClick={() => { ApplyClick(3) }} disabled={!optionControl.SecondOp} type="button" class=" h-[40px] mt-7 w-[100px] py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200">Apply</button>
                        </div>
                    </div>
                    <div className='lg:mt-[-5%] grid grid-cols-2 gap-2 p-3'>
                        <div class="w-full h-[150px] max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow">

                            <div className='grid grid-cols-1'>
                                <div class="flex col-span-2 flex-col pl-5 pb-5">
                                    <h5 class="mb-1 text-xl align-left font-bold text-gray-600">Province 3</h5>
                                    <h5 class="mb-1 lg:text-2xl sm:text-xl md:text-xl align-left font-bold text-gray-900">Bagmati pradesh</h5>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-fit max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow">

                            <div className='grid grid-cols-1'>
                                <div class="flex col-span-2 flex-col pl-5 pb-5">
                                    <h5 class="mb-1 text-xl align-left font-bold text-gray-900">Total Count</h5>
                                    <h5 class="mb-1 text-5xl align-left font-bold text-gray-900">{ProvinceData?.count}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full p-5 bg-white">
                        <div className='grid lg:grid-cols-2 sm:grid-cols-1'>
                            <div class="flex flex-col">
                                <h5 class="mb-1 text-lg align-left font-bold text-gray-600">District Name</h5>
                                <h5 class="mb-1 text-2xl align-left font-bold text-gray-900">{Namestate ? Namestate?.charAt(0).toUpperCase() + Namestate?.slice(1) : null}</h5>
                            </div>
                            <div class="flex flex-col">
                                <h5 class="mb-1 text-lg align-left font-bold text-gray-600">Distrist wise Count</h5>
                                <h5 class="mb-1 text-2xl align-left font-bold text-gray-900">{Countstate ? Countstate : null}</h5>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="w-full bg-metal mx-auto grid lg:grid-cols-2 lg:grid-flow-col gap-2 md:grid-col-1">

                <div className="h-[60%] overflow-hidden rounded-sm border-[2px] border-[#f8f8f8] bg-white shadow-xl ">
                    <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                        <span className='text-2xl mr-2'><RiMedicineBottleFill /></span> Demographic visualization
                    </div>
                    <div className=" overflow-hidden relative">
                        <Provmap3 />
                    </div>
                </div>

                <div className="rounded-sm mt-[-15%] border-[2px] border-[#f8f8f8] bg-white shadow-xl">
                    <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                        <span className='text-2xl mr-2'><BsFillPersonVcardFill /></span> Municipality Datalist
                    </div>
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Municipality List
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Count
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {

                                    Municipality?.length !== 0 ?
                                        (
                                            Municipality.map((ele, key) => {
                                                return (
                                                    <>
                                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {ele.municipalityName}
                                                            </th>
                                                            <td class="px-6 py-4">
                                                                {ele.count}
                                                            </td>
                                                        </tr>

                                                    </>
                                                )
                                            })
                                        ) : <div class="text-base mt-6 text-center font-semibold">No data</div>
                                }


                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6">
                            <div className="info flex items-center bg-eswasthyaprim text-white p-3">
                                <span className='text-2xl mr-2'><BsFillPersonVcardFill /></span> Graphical Visualization
                            </div>
                            <div className='grid justify-items-center '>
                                      <Chartspie  Municipality={Municipality}/>
                            </div>
                        </div>
                </div>
            </div>


        </>
    )
}


export default Prov3;