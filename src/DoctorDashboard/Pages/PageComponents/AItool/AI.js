import { useState } from 'react';
import axios from 'axios';
import Message from '../../../../UserAuthentication/Helper/Message';

const AI = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [previewImage, setPreviewImage] = useState();
    const [loading, setLoading] = useState(false);
    const [Data,setData] = useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader(file);
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const axiosInstance = axios.create({
        validateStatus: function (status) {
            return status >= 200 && status < 300; // Treat 2xx status codes as successful
        },
    });

    const onSubmit = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", selectedFile);
        axiosInstance.post(`https://srijan-101-laughing-fishstick-w54qvqx5w99h5497-5000.preview.app.github.dev/predict`, formData)
            .then((res) => {
                setLoading(false);
                setData(res?.data)
            })
            .catch(error => {
                setLoading(false);
                console.log('Error response:', error.response);
                console.log('Error message:', error.message);
            })
    }


    return (
        <>  
          
           {Data ?<img width="280px" src={Data?.processed_image_url}/> : null} 

           {Data?.prediction === 1 ? (<p className="pl-3 pr-3 break-words tracking-tight text-gray-500 text-sm">Analyzing the X-ray, our AI has predicted that the patient may have pneumonia.</p>) : null}
              
           {Data?.prediction === 0 ? <p className="pl-3 pr-3 break-words tracking-tight text-gray-500 text-sm">Analyzing the X-ray, our AI has predicted that the patient may not have pneumonia.</p> : null}
           
           
            <div class="p-3 flex items-center justify-center w-full">
                
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                         
                        {
                            
                            setPreviewImage && selectedFile ? (
                                <img
                                    src={previewImage}
                                    value={selectedFile}
                                    alt="Selected Image"
                                    class="self-center h-[200px] w-fit"
                                />

                            ) : (
                                <>
                                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Upload Lungs X-ray</span> or drag and drop</p>
                                </>
                            )
                        }
                    </div>
                    <input onChange={handleFileChange} id="dropzone-file" type="file" class="hidden" />
                </label>
            </div>
            <button type='button' onClick={onSubmit} disabled={!selectedFile || loading} class="m-3 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#42ADF0] rounded-lg">{loading ? "Analyzing ...." : "Submit"}</button>
        </>
    )
}

export default AI;