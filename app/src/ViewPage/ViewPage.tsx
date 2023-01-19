
import axios from 'axios'
import  {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

const ViewPage = () =>
{
    const  [data,setData] = useState<any>();
    const id= useParams();

    const getData = async() =>
    {
        try
        {
            const url = `http://localhost:5000/data/${id.id}`
            const r: any = await axios.get(url);
            setData(r.data);
            
        }
        catch(err)
        {
            console.log(err);
        }
    };

    useEffect(()=>{
        getData();
    },[])

    useEffect(()=>
    {
        getData();
    },[data])

    return (
        <div>
            {data &&
            <h1>{data.name}</h1>
            }
        </div>
    )
};
export default ViewPage