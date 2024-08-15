import { Add } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, Grid, IconButton, Input } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useRef, useState } from "react";
import { BasicModal } from "../../../../components/modal";
import { Project } from "../../../../models/models/Project";
import { NewProjectModal } from "../NewProjectModal";

type Props = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onCreateProject: () => Promise<void>;
};

export const Filters = ({ projects, setProjects, onCreateProject }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const originalProjects = useRef<Project[]>(projects);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredProjects = originalProjects.current.filter(project =>
      project.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProjects(filteredProjects);
  };

  return (
    <Grid container spacing={2}>
      <BasicModal open={open} setOpen={setOpen}>
        <NewProjectModal setOpen={setOpen} onCreateProject={onCreateProject} />
      </BasicModal>
      <Grid item xs={10}>
        <Input
          placeholder="Título do projeto"
          type="text"
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="filtrar projetos" edge="end">
                <FilterAltIcon />
              </IconButton>
            </InputAdornment>
          }
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Add />}>
          Adicionar Projeto
        </Button>
      </Grid>
    </Grid>
  );
};
