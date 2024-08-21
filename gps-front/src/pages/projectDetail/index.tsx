import { Card, CircularProgress, CircularProgressProps, Box, Typography, Grid, Chip } from "@mui/material";
import EnhancedTable from "./components/tasksTable";
import { Filters } from "./components/filters";
import { useEffect, useState } from "react";
import { Task } from "../../models/models/Task";
import { useApi } from "../../hooks/useApi";
import styled from "styled-components";
import { Router, useParams } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
`;

export const ProjectDetail = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [project, setProject] = useState(null);

  const tasksApi = useApi().tasks;
  const projectApi = useApi().projects;
  const { id } = useParams();

  const fetchTasks = async () => {
    const response = await tasksApi.getAll(id);
    response && setTasks(response.data);
  };

  const fetchProject = async () => {
    const response = await projectApi.getOne(id);
    response && setProject(response.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchProject();
  }, []);

  if (!project || !tasks)
    return (
      <Container style={{height:"100%", width:"100%", display:"flex", justifyContent: "center", margin:"auto", alignItems:'center'}}>
        <CircularProgress />
        <Typography variant="body1">Carregando...</Typography>
      </Container>
    );

  return (
    <Container>
      {/* Resumo do Projeto */}
      <Card sx={{ padding: "20px", marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography variant="h4" gutterBottom>
            {project.name}
            <Chip label={project.status} sx={{ marginLeft: "15px" }} color="primary" size="small" />
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {project.shortDescription}
          </Typography>
        </div>
        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <div>
            <Typography variant="body2" color="text.secondary">
              Data de Início:
            </Typography>
            <Typography variant="body1">{new Date(project.startDate).toLocaleDateString()}</Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              Data de Término:
            </Typography>
            <Typography variant="body1">{new Date(project.endDate).toLocaleDateString()}</Typography>
          </div>
        </div>
      </Card>

      {/* Cards de Métricas do Projeto */}
      {/* <Grid container spacing={2} pb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: "15px", textAlign: "center", height: "100%" }}>
            <CircularProgressWithLabel value={60} label="Progresso" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: "15px", textAlign: "center", height: "100%" }}>
            <CircularProgressWithLabel value={75} label="Orçamento Utilizado" />
            <Typography variant="body2" color="text.secondary">
              Total: R$ {project.budget}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: "15px", textAlign: "center", height: "100%" }}>
            <CircularProgressWithLabel value={20} label="Tarefas Atrasadas" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: "15px", textAlign: "center", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Colaboradores
            </Typography>
            <Typography variant="h4">{5}</Typography>
          </Card>
        </Grid>
      </Grid> */}

      {/* Filtros e Tabela de Tarefas */}
      <Filters task={tasks} setTasks={setTasks} onCreateTask={fetchTasks} projectId={project.id} />
      <EnhancedTable dataSource={tasks} />
    </Container>
  );
};

function CircularProgressWithLabel(props: CircularProgressProps & { value: number; label: string }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ marginTop: "10px" }} align="center">
        {props.label}
      </Typography>
    </Box>
  );
}
