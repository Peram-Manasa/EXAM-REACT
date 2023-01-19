import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {DetailsList,IColumn,DetailsListLayoutMode, PrimaryButton} from '@fluentui/react'
import {Link, useNavigate, useNavigation} from 'react-router-dom'
import {MdEdit,MdDelete  } from 'react-icons/md'
import { GrFormView } from "react-icons/gr";
import './View.scss'
import { create } from 'domain'




const View =() =>
{
    const [data,setData] = useState<any>();
    const navigation = useNavigate()
    const getData = async() =>
    {
        try{
            const url = 'http://localhost:5000/data'
            const result : any = await axios.get(url);
            setData(result.data)
            console.log(result.data);
        }
        catch(err)
        {
            console.log(err);
        }
    };

    
    const deleteoption = async(item:any) =>
    {
        try{
            const url = `http://localhost:5000/data/${item}`
            const result : any = await axios.delete(url);
            setData(result.data)
        }
        catch(err)
        {
            console.log(err);
        }
    };

    useEffect(() =>
    {
        getData();

    }, [])

    useEffect(() =>
    {
        getData();

    }, [data])

    


    const columns: IColumn[] = [
        {
            key: 'column1',
            name:'name',
            minWidth:50,
            maxWidth:60,
            fieldName: 'name',
        },
        {
            key: 'column2',
            name:'RollNumber',
            minWidth:50,
            maxWidth:80,
            fieldName: 'RollNumber',
        },
        {
            key: 'column3',
            name:'English',
            minWidth:50,
            maxWidth:60,
            fieldName: 'English',
        },
        {
            key: 'column4',
            name:'Telugu',
            minWidth:50,
            maxWidth:60,
            fieldName: 'Telugu',
        },
        {
            key: 'column5',
            name:'Hindi',
            minWidth:50,
            maxWidth:60,
            fieldName: 'Hindi',
        },
        {
            key: 'column6',
            name:'Science',
            minWidth:50,
            maxWidth:60,
            fieldName: 'Science',
        },
        {
            key: 'column7',
            name:'Social',
            minWidth:50,
            maxWidth:60,
            fieldName: 'Social',
        },
        {
            key: 'column8',
            name:'Activities',
            minWidth:50,
            maxWidth:60,
            fieldName: 'Activities',
        },
        {
            key: 'column9',
            name:'TotalMarks',
            minWidth:80,
            maxWidth:100,
            fieldName: 'TotalMarks',

        },
        {
            key: 'column10',
            name:'',
            minWidth:50,
            maxWidth:60,
            fieldName: 'id',

            onRender: (item: any) =>
            (
                item.id && 

        <>
        <div className="Header_viewing">
        <Link className= 'btn' to ={`/ViewPage/${item.id}`}><GrFormView size={20}/> </Link>
           <Link className='btn' to={`/update/${item.id}`}><MdEdit size={20} /></Link>
        <Link  className= 'btn' onClick = {()=> deleteoption(item.id)} to =''><MdDelete  size={20}/></Link>
        </div>
        </>
        )
    },
    ];
    return (
        <div className="Header">
            <div className="Header_one">
            <img src="https://zelarsoft.com/wp-content/uploads/2021/10/logo.png"/>
            </div>
            <div className="Header_add">
                
                <PrimaryButton type="submit" onClick={()=>navigation('/create')} text='Add'/>
            </div>
            <div className='Header__table'>
            {
                data && 
                <DetailsList
                items= {data}
                columns ={columns}
                setKey= "set"
                layoutMode={DetailsListLayoutMode.justified}
            />}
            </div>
        </div>
    )
            }

export default View;