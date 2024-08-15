import { Button, Input, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useApi } from '../../../hooks/useApi';
import { Project } from '../../../models/models/Project';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateProject: () => Promise<void>;
};

export const NewProjectModal = ({ setOpen, onCreateProject }: Props) => {
  const [project, setProject] = useState<Partial<Project> | null>({
    name: '',
    shortDescription: '',
    startDate: '',
    endDate: '',
    status: '',
    budget: '',
  });

  const api = useApi();

  const handleSuccess = () => {
    toast.success("Projeto criado com sucesso");
    onCreateProject();
    setOpen(false);
  };

  const createProject = async () => {
    const response = await api.projects.create(project);
    if (response.status === 201) {
      handleSuccess();
    }
  };

  return (
    <Container >
      <Title>Novo Projeto</Title>
      <Input
        placeholder="Nome"
        sx={{ width: "100%" }}
        type="text"
        value={project?.name || ''}
        onChange={(e) => setProject(prevState => ({
          ...prevState,
          name: e.target.value,
        }))}
      />

      <TextField
        placeholder="Breve descrição do projeto"
        multiline
        rows={2}
        value={project?.shortDescription || ''}
        onChange={(e) => setProject(prevState => ({
          ...prevState,
          shortDescription: e.target.value,
        }))}
        sx={{ width: "100%" }}
      />

      <Input
        placeholder="Data de Início"
        type="date"
        value={project?.startDate || ''}
        onChange={(e) => setProject(prevState => ({
          ...prevState,
          startDate: e.target.value,
        }))}
        fullWidth
      />

      <Input
        placeholder="Data de Término"
        type="date"
        value={project?.endDate || ''}
        onChange={(e) => setProject(prevState => ({
          ...prevState,
          endDate: e.target.value,
        }))}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={project?.status || ''}
          onChange={(e) => setProject(prevState => ({
            ...prevState,
            status: e.target.value as string,
          }))}
        >
          <MenuItem value="planejado">Planejado</MenuItem>
          <MenuItem value="em progresso">Em Progresso</MenuItem>
          <MenuItem value="concluído">Concluído</MenuItem>
        </Select>
      </FormControl>

      <Input
        placeholder="Orçamento"
        type="number"
        value={project?.budget || ''}
        onChange={(e) => setProject(prevState => ({
          ...prevState,
          budget: e.target.value,
        }))}
        fullWidth
      />

      <Button variant="contained" onClick={createProject}>Criar</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  width:400px;
  button {
    align-self: stretch;
  }
`;

const Title = styled.h2`
  margin-bottom: 0;
`;
