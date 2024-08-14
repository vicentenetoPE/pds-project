import { Button, FormLabel, Input, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Project } from '../../../../models/models/Project'
import { useApi } from '../../../../hooks/useApi'
import { toast } from 'react-toastify'

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCreateTask: () => Promise<void>

}

export const NewTaskModal = ({setOpen, onCreateTask}:Props) => {
    const [task, setTask] = useState<Partial<Project>|null>(null);
    const api = useApi();

    const handleSuccess = ()=>{
        toast.success("Tarefa criada com sucesso");
        onCreateTask();
        setOpen(false);
    }

    const createProject  = async()=>{
        const response = await api.tasks.create(task);
        response.status == 201 && handleSuccess();
    }

  return (
    <Container>
        <Title>Novo da Tarefa</Title>
        <Input placeholder='nome' type='text' onChange={(e)=>setTask(prevState=>{
            return {...prevState, name:e.target.value}
        })}></Input>
        <Input placeholder='status' type='text' onChange={(e)=>setTask(prevState=>{
            return {...prevState, status:e.target.value}
        })}></Input>

            
        <Button variant="contained" onClick={createProject}>Criar</Button>
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    gap:25px;
    align-items:center;
    button{
        align-self:stretch;
    }
`

const Title = styled.h2`
    margin-bottom:0;

`