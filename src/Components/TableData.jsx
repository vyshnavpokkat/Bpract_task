import React, { useDebugValue } from 'react'
import './tab.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function () {
    const [getData, setGetData] = useState([])
    const [postData, setPostData] = useState({})
    const [imgState,setImgState]=useState()
    const [mData,setmData]=useState(false)


    useEffect(() => {
        axios.get('https://machine-test.cloudmlmdemo.com/api/admin/tool-documents')
            .then(gdata => {
                console.log(gdata.data.data.data)
                setGetData(gdata.data.data.data)
            })
    }, [mData])

    
    const FormChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log(event.target.name)
        

        setPostData({
            ...postData,
            [name]: value
        })
    }
   
    const AddData=(e)=>{
        console.log("postData====>",postData)
        console.log("imgState=====>",imgState)
        e.preventDefault()
        console.log(postData);
        if(imgState){
            const data=new FormData()
            data.append("title",postData.title)
            data.append("sort_order",postData.sort_order)
            data.append("document_url",imgState)
            // console.log(data)
            axios.post('https://machine-test.cloudmlmdemo.com/api/admin/tool-documents',data)
            .then(res=>{
                console.log("postres===>",res);
                setmData(!mData)
            })
        }
        // console.log(postData)
       
    }
    const DelFunc=(id)=>{
        console.log(id);
        axios.delete(`https://machine-test.cloudmlmdemo.com/api/admin/tool-documents/${id}`)
            .then(delres=>{
                console.log("postres===>",delres);
                setmData(!mData) 
            })

    }

    return (
        <>
            <table>
                <tr>
                    <th>No</th>
                    <th>File Title</th>
                    <th>Sort Order</th>
                    <th>Download</th>
                    <th>Created</th>
                </tr>
                {getData.map((geData,index)=>
                    <>
                <tr>
                    
                    <td>{geData.id}</td>
                    <td>{geData.title}</td>
                    <td>{geData.sort_order}</td>
                    <td>{getData.updated_at}</td>
                    <td>{geData.created_at}</td>
                    <td><button onClick={()=>DelFunc(geData.id)}>Delete</button></td>
                    
                </tr>
                </>
                 )} 
            </table>
            <form >
                <input type="text" name='title' placeholder='Doc Title' required onChange={FormChange} />
                <input type="text" name='sort_order' placeholder='Sort Order' required onChange={FormChange} />
                <input type="file"  placeholder='Doc Title' name='document_url' required onChange={e=>{setImgState(e.target.files[0]);setPostData({...postData,document_url:e.target.files[0].name})}}/>
                <button onClick={AddData}>Submit</button>
                <button>Close</button>
            </form>
        </>
    )
}
