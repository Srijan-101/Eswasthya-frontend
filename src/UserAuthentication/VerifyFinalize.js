import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Message from "./Helper/Message";
import axios from "axios";
import { AuthContext } from '../Store/UserState';


const VerifyFinalize = () => {
    const { userId, Link } = useParams();
    const {onLogout} = useContext(AuthContext)
    const navigate = useNavigate();
    const [Error, setError] = useState({
        message: ''
    })

    useEffect(() => {
        onLogout();
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}api/user/verify-account/${userId}/${Link}`,
        }).then(() => {
            navigate("/verified")
        }).catch((error) => {
            setTimeout(() => {
                navigate("/")
            }, 3000)
            setError({ message: error?.response?.data?.message })
        })
    }, [])

    return (
        <>
            {Error?.message.length !== 0 ? <Message error={true} message={Error.message} /> : null}
        </>
    )
}


export default VerifyFinalize;