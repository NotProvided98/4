import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Ads from '../components/Ads'
import axios from 'axios'

const GET_URL = "http://localhost:3000/ads/all"
const GET_TOKEN = "http://localhost:3000/user/token"
const Home = () => {

    const [arrArr, setArr] = useState([])
    const [errorMessage, setMessage] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        const awaitFunction = async () => {
            try {
                const response = await axios.get(GET_URL)
                setArr(response.data)
                setMessage("")
            } catch (error) {
                setMessage(error.response.data)
            }
        }
        const checkToken = async () => {
            try {
                const response=await axios.get(GET_TOKEN,{withCredentials:true})
                setStatus(response.data)
                // setMessage("")
            } catch (error) {
                // setMessage(error.response.data)
                setStatus("Guest")
            }
        }
        awaitFunction()
        checkToken()
    }, [])
    const adsBuilder = () => {
        return arrArr.map((item, index) => { return <Ads title={item.title} text={item.text} id={item._id} key={index} /> })
        // return returnArr
    }
    return (
        <div>
            <h1 className='text-center mt-3 text-3xl font-bold'>Our local board</h1>
            <h3 className='text-center text-2xl font-semibold mt-6'>Status: {status}</h3>
            <NavLink to={"/add"} className={"text-3xl text-red-700 hover:text-black duration-[2000ms] ml-6"}><i className="fa-solid fa-rectangle-ad"></i></NavLink>
            <NavLink to={"/login"}> <i className="fa-solid fa-gear cursor-pointer text-3xl hover:text-4xl absolute right-3 hover:animate-spin-once"></i></NavLink>
            <div className='container flex flex-wrap gap-3 justify-between mx-auto mt-16'>
                <Ads />
                {adsBuilder()}
                <Ads /> <Ads /> <Ads /> <Ads /> <Ads /> <Ads /> <Ads /> <Ads /> <Ads />

            </div>
            {errorMessage ? <p className='text-center text-xl text-red-600 font-semibold'>{errorMessage}</p> : ""}
        </div>
    )
}

export default Home