import React, {useEffect, useState} from 'react'
import BoardCard from './BoardCard'
import '../styles/Home.css'
import { Button } from 'react-bootstrap'
import {Navigate} from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import axios from 'axios';

function Home({hasLoggedIn}) {

    const [boards, setBoards] = useState([]);
    const createBoard = () => {
        const id = uuid();
        setBoards([...boards, {id: id, title: 'New Board'}]);

        axios.post('https://kanban-backend-server.herokuapp.com/addboard', {id: id, title: 'New Board'}).then(res => {
            console.log(res);
        }
        ).catch(err => {
            console.log(err);
        }
        );
    }


    useEffect(() => {
        axios.get('https://kanban-backend-server.herokuapp.com/boards')
        .then(res => {
            setBoards(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    
    return (
    <div data-testid = 'home'>
        {hasLoggedIn ? <> <div className = 'create__button' data-testid = 'home-button'>
        <Button variant = 'outlined' onClick = {createBoard}> Create New Board</Button>
        </div>

        <div className = 'home__container' data-testid = 'home-container'>
            {boards.map((board, index) => {
                return <BoardCard key = {index} board = {board} boards = {boards} setBoards = {setBoards} data-testid = {`board-${index}`}></BoardCard>
            })}
        </div> </> : <Navigate to = '/' ></Navigate>}
    </div>
    )
}

export default Home
