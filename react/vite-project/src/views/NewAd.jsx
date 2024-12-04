import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const POST_URL = "http://localhost:3000/ads/createAd"
const NewAd = () => {
    const [formData, setFormData] = useState({ title: "", text: "" });
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        try {
            await axios.post(POST_URL, formData ,{ withCredentials: true })
            setMessage("Ad has been added successfully")
        } catch (error) {
            setMessage(error.response.data)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-96"
            >

                <h1 className="text-2xl font-bold mb-4 text-center">New Ad</h1>

                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="text"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Text
                    </label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">Submit</button>
                {message ? <p className="text-xl mt-2">{message}</p> : null}
                <div className="flex justify-end mt-2">
                    <NavLink className={"text-blue-400 hover:text-blue-500 underline"} to={"/login"}>Login</NavLink>
                </div>
            </form>
        </div>
    );
};

export default NewAd;