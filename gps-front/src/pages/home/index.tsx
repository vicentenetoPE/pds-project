import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../components/breadcrumbs";
import { ProjectCard } from "./components/projectCard";
import { ProjectWrapper } from "./styles";
import { projects } from "../../hooks/useApi/projects";
import { Project } from "../../models/models/Project";
import { Filters } from "./components/filters";
import { toast } from "react-toastify";
import ProjectList from "./components/projectList";
import Paginator from "./components/paginator/Index";
import { Container, Grid, Stack } from "@mui/material";

export const Home = () => {
  const [myprojects, setMyProjects] = useState<Project[]>([]);
  const breadcrumbs = [
    { name: "Home", path: "/projetos" },
    { name: "Projetos", path: "/tarefas" },
  ];


  const fetchProjects = async () => {
    const response = await projects.getAll();
    response && setMyProjects(response.data);
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Stack spacing={2} sx={{display:'flex', flexDirection:'column', flex:1 }}>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <Filters projects={myprojects} setProjects={setMyProjects} onCreateProject={fetchProjects} />
      <ProjectWrapper>
      <ProjectList projectList={myprojects}  />
      </ProjectWrapper>
      <Paginator/>
    </Stack>
  );
};
