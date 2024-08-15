import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../components/breadcrumbs";
import { projects } from "../../hooks/useApi/projects";
import { Project } from "../../models/models/Project";
import { Filters } from "./components/filters";
import { toast } from "react-toastify";
import ProjectList from "./components/projectList";
import Paginator from "./components/paginator/Index";
import { Stack, CircularProgress } from "@mui/material";
import styled from "styled-components";

export const Home = () => {
  const [myprojects, setMyProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [projectsPerPage] = useState<number>(5);

  const breadcrumbs = [
    { name: "Home", path: "/projetos" },
    { name: "Projetos", path: "/tarefas" },
  ];

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await projects.getAll();
      response && setMyProjects(response.data);
    } catch (error) {
      toast.error("Erro ao carregar projetos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = myprojects.slice(indexOfFirstProject, indexOfLastProject);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <Filters projects={myprojects} setProjects={setMyProjects} onCreateProject={fetchProjects} />
      {loading ? (
        <CircularProgress sx={{ alignSelf: 'center' }} />
      ) : (
        <ProjectWrapper>
          <ProjectList projectList={currentProjects} />
          <Paginator
            totalItems={myprojects.length}
            itemsPerPage={projectsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </ProjectWrapper>
      )}
    </Stack>
  );
};

const ProjectWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 25px;
  flex: 1;
`;
