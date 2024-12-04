import axios from "axios"
import React, { useState } from "react"

const DELETE_URL = "http://localhost:3000/ads/deleteAd"
const PUT_URL = "http://localhost:3000/ads/updateAd"

const Ads = (props) => {
    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)
    const [newText, setNewText] = useState(props.text)

    const removeFunction = async () => {
        try {
            await axios.delete(DELETE_URL, { data: { _id: props.id }, withCredentials: true })
            window.location.reload()
        } catch (error) {
            alert(error.response.data)
        }
    }

    const updateFunction = async () => {
        try {
            const updatedData = {
                _id: props.id,
                title: newTitle,
                text: newText,
            }
            await axios.put(PUT_URL, updatedData, { withCredentials: true })
            alert("Ad updated successfully")
            window.location.reload()
        } catch (error) {
            alert(error.response.data)
        } finally {
            setEditing(false)
        }
    }

    return (
        <div className="flex flex-col items-center w-80 h-72 px-3 pt-3 pb-3 border border-black rounded-lg shadow-md relative">
            {editing ?
                <div className="w-full">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-2" />
                    <textarea
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                </div>
                :
                <>
                    <div className="w-full border-b border-black pb-2">
                        <h1 className="text-center font-semibold text-xl">{props.title??"Lorem, ipsum dolor."}</h1>
                    </div>
                    <div className="flex-grow p-4 text-center overflow-auto">
                        <p>{props.text??"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit consequatur eveniet repellat, modi neque sequi?"}</p>
                    </div>
                </>
            }

            <div className="flex justify-between w-full absolute bottom-3 left-0 px-3">
                {editing ? 
                    <>
                        <button
                            className="bg-green-500 text-white py-1 px-3 rounded"
                            onClick={updateFunction}>Save</button>
                        <button
                            className="bg-purple-500 text-white py-1 px-3 rounded"
                            onClick={()=>{setEditing(false)}}>Cancel</button>
                    </>
                 :
                    <button
                        className="bg-blue-500 text-white py-1 px-3 rounded"
                        onClick={() => setEditing(true)}>Edit</button>
                }
                <button
                    className="bg-red-500 text-white py-1 px-3 rounded"
                    onClick={removeFunction}>Remove</button>
            </div>
        </div>
    )
}

export default Ads
