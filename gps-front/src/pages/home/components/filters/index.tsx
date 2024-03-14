import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Button, IconButton, Input } from "@mui/material";
import { Container } from "./style";
import InputAdornment from "@mui/material/InputAdornment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Add } from "@mui/icons-material";
import { BasicModal } from "../../../../components/modal";
import { NewProjectModal } from "./NewProjectModal";
import { Project } from "../../../../models/models/Project";

type Props = {
  projects:Project[]
  setProjects : any
}
export const Filters = ({projects, setProjects}:Props) => {
  //todo fazer useModal
  const [open, setOpen] = useState<boolean>(false);
  const originalProjects = useRef<Project[]>(projects);

  const handleChange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    originalProjects && setProjects(originalProjects.current.filter(project => project.name.includes(e.target.value)));
};

  return (
    <Container>
      <BasicModal open={open} setOpen={setOpen}>
        <NewProjectModal />
      </BasicModal>
      <Input
        placeholder="Título do projeto"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" edge="end">
              <FilterAltIcon />
            </IconButton>
          </InputAdornment>
        }
        onChange={handleChange}
      ></Input>
      <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Add />}>
        Adicionar Projeto
      </Button>
    </Container>
  );
};
