import { Button, Input, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useApi } from '../../../hooks/useApi';
import { Project } from '../../../models/models/Project';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateProject: () => Promise<void>;
  initialData?: Partial<Project>|Project  ;
};

export const NewProjectModal = ({ setOpen, onCreateProject, initialData }: Props) => {
  const [project, setProject] = useState<Partial<Project>>({
    name: '',
    shortDescription: '',
    startDate: '',
    endDate: '',
    status: '',
    budget: '',
  });

  const api = useApi();

  useEffect(() => {
    if (initialData) {
      setProject(initialData); // Se dados iniciais forem passados, configura o formulário com esses dados
    }
  }, [initialData]);

  const handleSuccess = (message: string) => {
    toast.success(message);
    onCreateProject();
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (initialData && initialData.id) {
      const response = await api.projects.update(initialData.id, project);
      if (response.status === 200) {
        handleSuccess("Projeto atualizado com sucesso");
      }
    } else {
      const response = await api.projects.create(project);
      if (response.status === 201) {
        handleSuccess("Projeto criado com sucesso");
      }
    }
  };

  return (
    <Container>
      <Title>{initialData ? 'Editar Projeto' : 'Novo Projeto'}</Title>
      <Input
        placeholder="Nome"
        sx={{ width: "100%" }}
        type="text"
        value={project.name || ''}
        onChange={(e) => setProject(prevState => ({
          ...prevState,
          name: e.target.value,
        }))}
      />

      <TextField
        placeholder="Breve descrição do projeto"
        multiline
        rows={2}
        value={project.shortDescription || ''}
        onChange={(e) => setProject(prevState => ({
          ...prevState,
          shortDescription: e.target.value,
        }))}
        sx={{ width: "100%" }}
      />

      <Input
        placeholder="Data de Início"
        type="date"
        value={project.startDate || ''}
        onChange={(e) => setProject(prevState => ({
          ...prevState,
          startDate: e.target.value,
        }))}
        fullWidth
      />

      <Input
        placeholder="Data de Término"
        type="date"
        value={project.endDate || ''}
        onChange={(e) => setProject(prevState => ({
          ...prevState,
          endDate: e.target.value,
        }))}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={project.status || ''}
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
        value={project.budget || ''}
        onChange={(e) => setProject(prevState => ({
          ...prevState,
          budget: e.target.value,
        }))}
        fullWidth
      />

      <Button variant="contained" onClick={handleSubmit}>
        {initialData ? 'Atualizar' : 'Criar'}
      </Button>
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
