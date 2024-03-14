import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Project } from "../../../../models/models/Project";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  const api = useApi();

  const handleDeleteProject = async (id: number | string) => {
    const response = await api.projects.delete(id);
  };

  const handleEditProject = async (id: number | string, project: Project) => {
    const response = await api.projects.update(id, project);
  };

  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
      <CardContent>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {project.name}
          <Box display="flex">
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton>
              <Delete />
            </IconButton>
          </Box>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate("/projetos/" + project.id)} variant="contained" size="small">
          Ver detalhes
        </Button>
      </CardActions>
    </Card>
  );
};
