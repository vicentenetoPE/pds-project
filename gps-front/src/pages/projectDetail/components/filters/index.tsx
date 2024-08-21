import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Button, Grid, IconButton, Input, Menu, MenuItem } from "@mui/material";
import { Container } from "./style";
import InputAdornment from "@mui/material/InputAdornment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Add, MoreVert } from "@mui/icons-material";
import { BasicModal } from "../../../../components/modal";
import { Task } from "../../../../models/models/Task";
import { NewTaskModal } from "../NewTaskModal";

type Props = {
  task: Task[];
  setTasks: any;
  onCreateTask: () => Promise<void>;
  projectId: number;
};

export const Filters = ({ task, setTasks, onCreateTask, projectId }: Props) => {
  //todo fazer useModal
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentModal, setCurrentModal] = useState<ReactNode | null>(null);
  const originalTasks = useRef<Task[]>(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    originalTasks && setTasks(originalTasks.current.filter((task) => task.name.includes(e.target.value)));
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleManageMembers = () => {
    // Lógica para gerenciar membros
    handleMenuClose();
  };

  useEffect(() => {
    currentModal ? setOpen(true) : setOpen(false);
  }
  , [currentModal]);

  const  taskModal=()=>  <NewTaskModal setOpen={setOpen} onCreateTask={onCreateTask} projectId={projectId} /> ;
  const manageMembersModal = () => <div>Gerenciar membros</div>;
  return (
    <Grid container spacing={2}>
      <BasicModal open={open} setOpen={setOpen}>
        {currentModal}
      </BasicModal>
      <Grid item xs={9}>
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
      <Grid item xs={3} sx={{ display: "flex", justifyContent: "end", gap: "15px" }}>
        <Button onClick={() => setCurrentModal(taskModal())} variant="contained" startIcon={<Add />}>
          Adicionar Tarefa
        </Button>
        <IconButton onClick={handleMenuClick}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleManageMembers}>Gerenciar membros</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};
