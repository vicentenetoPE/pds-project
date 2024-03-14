import { Button, FormLabel, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Project } from '../../../../models/models/Project'
import { useApi } from '../../../../hooks/useApi'
import { toast } from 'react-toastify'

export const NewProjectModal = () => {
    const [project, setProject] = useState<Partial<Project>|null>(null);
    const api = useApi();


    const createProject  = async()=>{
        const response = await api.projects.create(project);
        console.log(response.status)
        response.status == 201 && toast.success("Projeto criado com sucesso");
    }

  return (
    <Container>
        <Title>Novo Projeto</Title>
        <Input placeholder='nome' type='text' onChange={(e)=>setProject(prevState=>{
            return {...prevState, name:e.target.value}
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