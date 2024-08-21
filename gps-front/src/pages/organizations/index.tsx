import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../components/breadcrumbs";
import { toast } from "react-toastify";
import { Stack, CircularProgress, Button } from "@mui/material";
import styled from "styled-components";
import { BasicModal } from "../../components/modal";
import { Organization } from "../../models/models/Organization";
import OrganizationList from "./organizationList";
import Paginator from "../home/components/paginator/Index";
import { useApi } from "../../hooks/useApi";
import { NewOrganizationModal } from "./newOrganizationModal";
import { Filters } from "./filters";

export const ManageOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [organizationsPerPage] = useState<number>(5);
  const [open, setOpen] = useState(false);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Organizações", path: "/organizacoes" },
  ];

  const api = useApi();

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const response = await api.organizations.getAll();
      response && setOrganizations(response.data);
    } catch (error) {
      toast.error("Erro ao carregar organizações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const onCreateOrganization = async () => {
    await fetchOrganizations(); // Atualiza a lista de organizações
  };

  const indexOfLastOrganization = currentPage * organizationsPerPage;
  const indexOfFirstOrganization = indexOfLastOrganization - organizationsPerPage;
  const currentOrganizations = organizations.slice(indexOfFirstOrganization, indexOfLastOrganization);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <Filters organizations={organizations} setOrganizations={setOrganizations} onCreateOrganization={onCreateOrganization} />
      {/* <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Adicionar Organização
      </Button> */}
      <BasicModal open={open} setOpen={setOpen}>
        <NewOrganizationModal setOpen={setOpen} onCreateOrganization={onCreateOrganization} />
      </BasicModal>
      {loading ? (
        <CircularProgress sx={{ alignSelf: 'center' }} />
      ) : (
        <OrganizationWrapper>
          <OrganizationList organizationList={currentOrganizations} onCreateOrganization={fetchOrganizations}/>
          <Paginator
            totalItems={organizations.length}
            itemsPerPage={organizationsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </OrganizationWrapper>
      )}
    </Stack>
  );
};

const OrganizationWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 25px;
  flex: 1;
`;
