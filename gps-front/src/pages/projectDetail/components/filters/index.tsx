import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Button, Grid, IconButton, Input } from "@mui/material";
import { Container } from "./style";
import InputAdornment from "@mui/material/InputAdornment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Add } from "@mui/icons-material";
import { BasicModal } from "../../../../components/modal";
import {  NewTaskModal } from "./NewTaskModal";
import { Task } from "../../../../models/models/Task";

type Props = {
  task:Task[]
  setTasks : any
  onCreateTask: () => Promise<void>
}
export const Filters = ({task, setTasks, onCreateTask}:Props) => {
  //todo fazer useModal
  const [open, setOpen] = useState<boolean>(false);
  const originalTasks = useRef<Task[]>(task);

  const handleChange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    originalTasks && setTasks(originalTasks.current.filter(task => task.name.includes(e.target.value)));
};

  return (
    <Grid container spacing={2}>
      <BasicModal open={open} setOpen={setOpen} >
        <NewTaskModal setOpen={setOpen} onCreateTask={onCreateTask}/>
      </BasicModal>
      <Grid item xs={10} >

      <Input
        placeholder="Nome da tarefa"
        type="text"
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" edge="end">
              <FilterAltIcon />
            </IconButton>
          </InputAdornment>
        }
        onChange={handleChange}
      ></Input>

      </Grid>
      <Grid item xs={2} sx={{display:'flex', justifyContent:'end'}}>
      <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Add />}>
        Adicionar Tarefa
      </Button>
      </Grid>
    </Grid>
  );
};
