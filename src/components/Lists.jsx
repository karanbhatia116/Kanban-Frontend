import React, {useState, useEffect} from 'react'
import '../styles/List.css';
import {DragDropContext} from 'react-beautiful-dnd';
import List from './List';
import AddNewList from './AddNewList';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import {NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Lists( {hasLoggedIn} ) {
    const [lists, setLists] = useState({});
    const [render, setRender] = useState(false);

    const params = window.location.pathname.split('/');
    const boardId = params[2];
    useEffect(() => {
        axios.get(`https://kanban-backend-server.herokuapp.com/lists/${boardId}`).then(res => {
            setLists(res.data.data);
        });
    }, [boardId])
    const handleBoardSave = ()=>{
        axios.post(`https://kanban-backend-server.herokuapp.com/updatelists/${params[2]}`, lists).then(res => {
            console.log(res.data);
            if (res.data.success){
                NotificationManager.success('Board saved successfully', 'Success', 3000);
            }
            else{
                NotificationManager.error('Some error occured!', 'Error', 3000);
            }
    });
        // NotificationManager.success("Board state saved successfully!", "Notification");
    }
    


    const handleOnDragEnd = (result)=>{
        if(!result.destination) return;
        const {source, destination} = result;
        if(source.droppableId !== destination.droppableId)
        {
            const sourceList = lists[source.droppableId];
            const destList = lists[destination.droppableId];
            const sourceItems = [...sourceList.items];
            const destItems = [...destList.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setLists({
                ...lists, 
                [source.droppableId]:{
                    ...sourceList, 
                    items: sourceItems
                },
                [destination.droppableId]:{
                    ...destList, 
                    items: destItems
                }
            });
        }
        else{
            const list = lists[source.droppableId];
            const copiedItems = [...list.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setLists({
                ...lists, 
                [source.droppableId]:{
                    ...list, 
                    items: copiedItems
                }
            });
        }
        
    }

    //------------BUGGY---------------------//
    // const handleDeleteList = async (list)=>{
    //     var listIndex;
    //     for(var prop in lists){
    //         if(lists.hasOwnProperty(prop))
    //         {
    //                 if(lists[prop] === list)
    //                 listIndex = prop;
    //         }
    //     }
    //     var l = lists;
    //     console.log("before delete:", lists);
    //     delete l[listIndex];
    //     // setRender(!render);
    //     await setLists(()=>{
    //     return l;
    //     });
    //     await setRender((r)=>{
    //         return {r: !render};
    //     });
    //     console.log("after delete:",lists);
    // }

    return (
        <>
        {hasLoggedIn ? 
        <>
        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <Button className = 'save__button' variant='outline-primary' onClick={handleBoardSave}>Save Board</Button>
            </div>

            <div className = 'main__container'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
            {Object.entries(lists).map(([id, list])=>
                <List id = {id} list = {list} lists = {lists} setLists = {setLists} render = {render} setRender = {setRender}></List>
            )}
            <AddNewList lists = {lists} setLists = {setLists}></AddNewList>
            </DragDropContext>
            </div></> : <Navigate to = '/' ></Navigate>}
 
        </>
    )
}

export default Lists



