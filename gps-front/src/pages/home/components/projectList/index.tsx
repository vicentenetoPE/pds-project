import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Project } from "../../../../models/models/Project";
import { grey } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


type Props = {
  projectList: Project[]
};

export default function ProjectList({ projectList }: Props) {
  if (projectList.length === 0) return <List sx={{ width: "100%", flex: 1}}>Não há projetos</List>;

  const navigate= useNavigate();

  return (
    <List sx={{ width: "100%", flex: 1, display:'flex', flexWrap:'wrap', justifyContent:'space-between' }}>
      {projectList.map((project) => (
        <React.Fragment key={project.id} >
          <ListItem onClick={()=>navigate(`/projetos/${project.id}`)} sx={{marginBottom:'20px',width:'48%',bgcolor: "background.paper", ":hover":{cursor:'pointer', bgcolor:grey[300], }}} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Project Avatar" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={project.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {project.name}
                  </Typography>
                  {" — " + project.shortDescription}
                </React.Fragment>
              }
            />
            <DeleteIcon/>
            <EditIcon/>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
}
