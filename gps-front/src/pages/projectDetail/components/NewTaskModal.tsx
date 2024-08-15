import { Button, Input, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Task } from '../../../models/models/Task';
import { User } from '../../../models/user';
import { Release } from '../../../models/models/Release';
import { Sprint } from '../../../models/models/Sprint';
import { useApi } from '../../../hooks/useApi';
import { toast } from 'react-toastify';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateTask: () => Promise<void>;
  projectId: number;
};

export const NewTaskModal = ({ setOpen, onCreateTask, projectId }: Props) => {
  const [task, setTask] = useState<Partial<Task>>({
    name: '',
    description: '',
    status: 'to do',
    priority: 1,
    estimatedTime: 0,
    loggedTime: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [releases, setReleases] = useState<Release[]>([]);
  const api = useApi();

  const handleSuccess = () => {
    toast.success("Tarefa criada com sucesso");
    onCreateTask();
    setOpen(false);
  };

  const createTask = async () => {
    const response = await api.tasks.create({ ...task, project: { id: projectId } });
    response.status === 201 && handleSuccess();
  };

  const fetchUsers = async () => {
    const response = await api.users.getAll();
    response && setUsers(response.data);
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Title>Nova Tarefa</Title>
      <Input
        placeholder="Nome"
        type="text"
        value={task.name}
        onChange={(e) =>
          setTask((prevState) => ({
            ...prevState,
            name: e.target.value,
          }))
        }
      />

      <TextField
        placeholder="Descrição"
        multiline
        rows={2}
        value={task.description}
        onChange={(e) =>
          setTask((prevState) => ({
            ...prevState,
            description: e.target.value,
          }))
        }
        sx={{ width: "100%" }}
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={task.status}
          onChange={(e) =>
            setTask((prevState) => ({
              ...prevState,
              status: e.target.value as string,
            }))
          }
        >
          <MenuItem value="to do">To Do</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </FormControl>

      <Input
        placeholder="Prioridade"
        type="number"
        value={task.priority || 0}
        onChange={(e) =>
          setTask((prevState) => ({
            ...prevState,
            priority: parseInt(e.target.value),
          }))
        }
      />

      <Input
        placeholder="Tempo Estimado"
        type="number"
        value={task.estimatedTime || 0}
        onChange={(e) =>
          setTask((prevState) => ({
            ...prevState,
            estimatedTime: parseFloat(e.target.value),
          }))
        }
      />

      <Input
        placeholder="Tempo Registrado"
        type="number"
        value={task.loggedTime || 0}
        onChange={(e) =>
          setTask((prevState) => ({
            ...prevState,
            loggedTime: parseFloat(e.target.value),
          }))
        }
      />

      <Button variant="contained" onClick={createTask}>
        Criar
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
