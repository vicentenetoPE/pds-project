import { Button, Input, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Organization } from '../../models/models/Organization';
import { useApi } from '../../hooks/useApi';


type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateOrganization: () => Promise<void>;
  initialData?: Partial<Organization>;
};

export const NewOrganizationModal = ({ setOpen, onCreateOrganization, initialData }: Props) => {
  const [organization, setOrganization] = useState<Partial<Organization>>({
    name: '',
    description: '',
  });

  const api = useApi();

  useEffect(() => {
    if (initialData) {
      setOrganization(initialData); // Se os dados iniciais forem passados, preenche o formulário com esses dados
    }
  }, [initialData]);

  const handleSuccess = (message: string) => {
    toast.success(message);
    onCreateOrganization();
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (initialData && initialData.id) {
      const response = await api.organizations.update(initialData.id, organization);
      if (response.status === 200) {
        handleSuccess("Organização atualizada com sucesso");
      }
    } else {
      const response = await api.organizations.create(organization);
      if (response.status === 201) {
        handleSuccess("Organização criada com sucesso");
      }
    }
  };

  return (
    <Container>
      <Title>{initialData ? 'Editar Organização' : 'Nova Organização'}</Title>
      <Input
        placeholder="Nome"
        sx={{ width: "100%" }}
        type="text"
        value={organization.name || ''}
        onChange={(e) => setOrganization(prevState => ({
          ...prevState,
          name: e.target.value,
        }))}
      />

      <TextField
        placeholder="Descrição da organização"
        multiline
        rows={4}
        value={organization.description || ''}
        onChange={(e) => setOrganization(prevState => ({
          ...prevState,
          description: e.target.value,
        }))}
        sx={{ width: "100%" }}
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
  width: 400px;
  button {
    align-self: stretch;
  }
`;

const Title = styled.h2`
  margin-bottom: 0;
`;
