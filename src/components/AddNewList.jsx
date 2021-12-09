import React, {useState} from 'react'
import '../styles/AddNewList.css'
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from 'axios';
function AddNewList({lists, setLists}) {

    function ObjectLength( object ) {
        var length = 0;
        for( var key in object ) {
            if( object.hasOwnProperty(key) ) {
                ++length;
            }
        }
        return length;
    }; 


    const params = window.location.pathname.split('/');
    const boardId = params[2];
    const handleAddNewList = async ()=>{

        const response = await axios.post(`https://kanban-backend-server.herokuapp.com/addlist/${boardId}`, {
            name: '',
            items: []
        });
        setLists({
                ...lists,
                [ObjectLength(lists)]:{
                    "name": '',
                    "items": [],
                    "_id": response.data.column_id
                }
            });
        console.log("column_id: ", response.data.column_id);
        console.log(typeof(response.data.column_id));
        console.log("Lists before adding");
        console.log(lists);
        console.log(ObjectLength(lists));
        
    }
    const [hover, setHover] = useState(false);
    return (
        <div className = "lists__add__newlist" onClick = {handleAddNewList} onMouseEnter={()=>setHover(true)} onMouseLeave = {()=> setHover(false)}>
           <h3 className = 'lists__add__text'>Add New Column</h3> 
           <AddBoxIcon className = "plus__icon" style = {{height: 50, width: 50, fill: hover? "white" : "gray"}}></AddBoxIcon>
        </div>
    )
}

export default AddNewList
