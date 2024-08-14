import { Button, FormLabel, Input, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Project } from '../../../../models/models/Project'
import { useApi } from '../../../../hooks/useApi'
import { toast } from 'react-toastify'

type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCreateProject: () => Promise<void>

}

export const NewProjectModal = ({setOpen, onCreateProject}:Props) => {
    const [project, setProject] = useState<Partial<Project>|null>(null);
    const api = useApi();

    const handleSuccess = ()=>{
        toast.success("Projeto criado com sucesso");
        onCreateProject();
        setOpen(false);
    }

    const createProject  = async()=>{
        const response = await api.projects.create(project);
        response.status == 201 && handleSuccess();
    }

  return (
    <Container>
        <Title>Novo Projeto</Title>
        <Input placeholder='nome' type='text' onChange={(e)=>setProject(prevState=>{
            return {...prevState, name:e.target.value}
        })}></Input>

        <TextField
          placeholder="Breve descrição do projeto"
          multiline
          rows={2}
          onChange={(e)=>setProject(prevState=>{
            return {...prevState, shortDescription:e.target.value}
        })}
          sx={{width:"100%"}}
   >
            
        </TextField>
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