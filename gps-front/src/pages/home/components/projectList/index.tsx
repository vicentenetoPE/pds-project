import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Project } from "../../../../models/models/Project";
import { Typography, Box, IconButton, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  projectList: Project[];
};

export default function ProjectList({ projectList }: Props) {
  const navigate = useNavigate();

  if (projectList.length === 0) {
    return (
      <Typography variant="h6" color="textSecondary" sx={{ width: "100%", textAlign: "center" }}>
        Não há projetos disponíveis.
      </Typography>
    );
  }

  return (
    <List sx={{ width: "100%", display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {projectList.map((project) => (
        <ListItem
          key={project.id}
          onClick={() => navigate(`/projetos/${project.id}`)}
          sx={{
            marginBottom: '20px',
            width: '48%',
            bgcolor: "background.paper",
            padding: '16px',
            borderRadius: '8px',
            ":hover": { cursor: 'pointer', bgcolor: grey[300] },
          }}
        >
          <Box sx={{ width: '100%' }}>
            <ListItemText
              primary={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{project.name}</Typography>
                  <Box>
                    <IconButton onClick={(e) => { e.stopPropagation(); /* Implementar edição */ }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={(e) => { e.stopPropagation(); /* Implementar exclusão */ }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    {project.shortDescription}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" marginTop={1}>
                    <Typography variant="body2" color="textSecondary">
                      Início: {project.startDate ? new Date(project.startDate).toLocaleDateString() : "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Término: {project.endDate ? new Date(project.endDate).toLocaleDateString() : "N/A"}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" marginTop={1}>
                    <Typography variant="body2" color="textSecondary">
                      Status: <Chip label={project.status} color="primary" size="small" />
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Orçamento: {project.budget ? `R$ ${parseFloat(project.budget).toFixed(2)}` : "N/A"}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
