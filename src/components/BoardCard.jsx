import React, {useState} from 'react'
import '../styles/BoardCard.css'
import {Navigate} from 'react-router-dom'
import Trash from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import axios  from 'axios'

function BoardCard({board, boards, setBoards}) {
    const [navigate, setNavigate] = useState(false);
    const [title, setTitle] = useState(board.title);
    const handleUpdateCard = (e) => {
        e.stopPropagation();
        let b = boards;
        b[boards.indexOf(board)].title = title;
        setBoards(b);
        axios.put('https://kanban-backend-server.herokuapp.com/updateBoard', {id: board.id, title: title}).then(res => {
            console.log(res);
        });
    }

    const handleDeleteCard = (e) => {
        e.stopPropagation();
        let arr = boards;
        arr = arr.filter(item => item.id !== board.id);
        setBoards(arr);
        axios.delete('https://kanban-backend-server.herokuapp.com/deleteBoard', {data: {id: board.id}});
    }
    return (
        <>
            { navigate && <Navigate to={`/lists/${board.id}`} push = {true}></Navigate>}
            <div className = 'board__card' onClick= {(e) => {
                setNavigate(true);
            }}>
                <div className = 'board__card__title' onClick={(e) => e.stopPropagation()}>
                    <Input value = {title} disableUnderline = {true} className = 'board__input' fullWidth={true} onChange = {(e) => setTitle(e.target.value)}></Input>
                    <IconButton onClick  = {handleDeleteCard} style = {{backgroundColor: 'transparent', padding: '0.1em', margin: '0.2em'}}>
                        <Trash style ={{fill: 'tomato'}} />
                    </IconButton>
                </div>
                <Button variant = {'contained'} color= {'primary'} onClick = {handleUpdateCard}> Update Card</Button>
            </div>
        </>
    )
}

export default BoardCard
