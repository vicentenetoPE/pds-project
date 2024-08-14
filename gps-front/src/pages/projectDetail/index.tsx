import { Card, CircularProgress, CircularProgressProps, Box, Typography, Grid } from "@mui/material";
import EnhancedTable from "./components/tasksTable";
import { Filters } from "./components/filters";
import { useEffect, useState } from "react";
import { Task } from "../../models/models/Task";
import { useApi } from "../../hooks/useApi";
import { Container } from "./styles";

export const ProjectDetail = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const tasksApi = useApi().tasks;
  const fetchTasks = async () => {
    const response = await tasksApi.getAll();
    response && setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if(!tasks) return <CircularProgressWithLabel value={2}/>

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card sx={{ padding: "15px" }}>
            <CircularProgressWithLabel value={50} />
            Progresso
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ padding: "15px" }}>
            <CircularProgressWithLabel value={50} />
            Orçamento
          </Card>
        </Grid>
        <Grid item xs={3}>
          {" "}
          <Card sx={{ padding: "15px" }}>
            <CircularProgressWithLabel value={50} />
            Tarefas atrasadas
          </Card>
        </Grid>
        <Grid item xs={3}>
          {" "}
          <Card sx={{ padding: "15px" }}>
            <CircularProgressWithLabel value={50} />
            <span>Colaboradores</span>
          </Card>
        </Grid>
        <Grid></Grid>
      </Grid>
      <Filters task={tasks} setTasks={setTasks} onCreateTask={fetchTasks} />
      <EnhancedTable dataSource={tasks}/>
    </Container>
  );
};

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
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
        <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
