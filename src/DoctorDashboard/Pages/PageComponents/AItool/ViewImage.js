import { useContext } from "react";
import { AuthContext } from "../../../../Store/UserState";
import axios from "axios";

const ViewImage = ({Data}) => {

    const {getStoredCookie} = useContext(AuthContext)
    const onClose = () => {
         let a = document.getElementById("ViewImage");
         a.classList.add("hidden");
    }

    const onSave = () => {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}api/ai-diagnosed-disease/save`,
            headers: {
                'Authorization': `Bearer ${getStoredCookie("token")}`,
            },
            data : {
                name : "Lungs-AI",
                imagePath : Data?.processed_image_url,
                isDetected : Data?.prediction,
                appointmentId : localStorage.getItem("AppointmentId")
            }
           })
           .then((res) => {
            let a = document.getElementById("ViewImage");
            a.classList.add("hidden");
           })
           .catch((error) => console.log(error))
    }


    return (
        <div id="ViewImage" tabindex="-1" aria-hidden="true" class=" hidden backdrop-blur-sm  bg-gray/30  flex items-center justify-center h-screen fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            AI predicted result
                        </h3>
                        <button type="button" onClick={onClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div class="p-6 space-y-6">
                    {Data?.prediction === 1 ? (<p className="pl-3 pr-3 break-words tracking-tight text-gray-500 text-sm">Analyzing the X-ray, our AI has predicted that the patient may have pneumonia.</p>) : null}
              
              {Data?.prediction === 0 ? <p className="pl-3 pr-3 break-words tracking-tight text-gray-500 text-sm">Analyzing the X-ray, our AI has predicted that the patient may not have pneumonia.</p> : null}
                    </div>
                    <div className="m-4">
                       <img class="h-auto max-w-full" src={Data?.processed_image_url} alt="AI image"/>
                    </div>

                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button onClick={onSave} type='button'class="m-3 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#42ADF0] rounded-lg">Save result</button>
                        <button onClick={onClose} data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewImage;