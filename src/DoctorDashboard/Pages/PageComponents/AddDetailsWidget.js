import { useEffect } from "react";
import { Dial } from "flowbite";
import { BsJournalMedical } from 'react-icons/bs'
import { Link ,useNavigate} from "react-router-dom";
import {GoFileSymlinkFile} from 'react-icons/go'
import {MdVaccines} from 'react-icons/md'
import {MdOutlineMedicalInformation} from 'react-icons/md'
import {GiMedicines} from 'react-icons/gi'


const AddDetailsWidget = ({ patientsInformation }) => {

    useEffect(() => {
        const $parentEl = document.getElementById('dialParent')
        const $triggerEl = document.getElementById('dialButton');
        const $targetEl = document.getElementById('dialContent');

        // options with default values
        const options = {
            triggerType: 'click'
        };
        const dial = new Dial($parentEl, $triggerEl, $targetEl, options);
    }, [])

  const onClick = () => {
     let a = document.getElementById("speed-dial-menu-dropdown-alternative");
     a.classList.remove("hidden");
  }
  const onMouseoutside = () => {
    let a = document.getElementById("speed-dial-menu-dropdown-alternative");
    a.classList.add("hidden");
 }

 const openVaccine = () => {
     let a = document.getElementById("vaccineModal");
     a.classList.remove("hidden");
 }


 const openUpdate = () => {
    let a = document.getElementById("UpdateModal");
    a.classList.remove("hidden");
}


const openAllergic = () => {
    let a = document.getElementById("AllergicModal");
    a.classList.remove("hidden");
}


 const navigate = useNavigate()

 const AddMedicalHistory = () => {
      navigate(`/AddMedicalHistory/${patientsInformation?.AppointmentId}`)
 }

    return (
<>
<div  onMouseLeave={onMouseoutside} data-dial-init class="z-10 fixed right-6 bottom-6 group">
    <div  id="speed-dial-menu-dropdown-alternative" class="flex flex-col justify-end hidden py-1 mb-4 space-y-2 bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
        <ul class="text-sm text-gray-500 dark:text-gray-300">
            <li>
                <span onClick={() => {AddMedicalHistory()}} class="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
                     <span className="mr-1 text-lg"><GoFileSymlinkFile/></span>
                    <span class="text-sm font-medium">Add Medical History</span>
                </span>
            </li>
            <li>
                <span onClick={() => {openAllergic()}}  class="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
                    <span className="mr-1 text-xl"><GiMedicines/></span>
                    <span class="text-sm font-medium">Add Allgeric Drug</span>
                </span>
            </li>
            <li>
                <span onClick={() => {openVaccine()}} class="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
                    <span className="mr-1 text-xl"><MdVaccines/></span>
                    <span class="text-sm font-medium">Add Immunization</span>
                </span>
            </li>
            <li>
                <span onClick={() => {openUpdate()}} class="flex items-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
                     <span className="mr-1 text-xl"><MdOutlineMedicalInformation/></span>
                    <span class="text-sm font-medium">Update Info</span>
                </span>
            </li>
        </ul>
    </div>
    <button onClick={onClick} type="button" data-dial-toggle="speed-dial-menu-dropdown-alternative" aria-controls="speed-dial-menu-dropdown-alternative" aria-expanded="false" class="flex items-center justify-center ml-auto text-white bg-eswasthyaprim  rounded-full w-14 h-14 focus:outline-none dark:focus:ring-blue-800">
        <svg aria-hidden="true" class="w-8 h-8 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        <span class="sr-only">Open actions menu</span>
    </button>
   
</div>

</>










    )
}

export default AddDetailsWidget;