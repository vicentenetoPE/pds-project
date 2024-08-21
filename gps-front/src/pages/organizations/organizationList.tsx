import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useApi } from "../../hooks/useApi";
import { Organization } from "../../models/models/Organization";
import { NewOrganizationModal } from "./newOrganizationModal";
import { BasicModal } from "../../components/modal";
import { toast } from "react-toastify";

type Props = {
  organizationList: Organization[];
  onCreateOrganization: () => Promise<void>; // Função para atualizar a lista de organizações
};

export default function OrganizationList({ organizationList, onCreateOrganization }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedOrganization, setSelectedOrganization] = React.useState<Partial<Organization> | null>(null);
  const api = useApi();

  const handleEdit = (e: React.MouseEvent, organization: Organization) => {
    e.stopPropagation();
    setSelectedOrganization(organization); // Define a organização a ser editada
    setOpen(true); // Abre o modal para edição
  };

  const handleDelete = async (e: React.MouseEvent, organization: Organization) => {
    e.stopPropagation();
    if (window.confirm(`Tem certeza que deseja deletar a organização ${organization.name}?`)) {
      const response = await api.organizations.delete(organization.id);
      if (response.status === 200) {
        toast.success("Organização deletada com sucesso!");
        onCreateOrganization(); // Atualiza a lista de organizações após a deleção
      } else {
        toast.error("Erro ao deletar a organização.");
      }
    }
  };

  if (organizationList.length === 0) {
    return (
      <Typography variant="h6" color="textSecondary" sx={{ width: "100%", textAlign: "center" }}>
        Não há organizações disponíveis.
      </Typography>
    );
  }

  return (
    <List sx={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
      <BasicModal open={open} setOpen={setOpen}>
        <NewOrganizationModal
          setOpen={setOpen}
          onCreateOrganization={onCreateOrganization}
          initialData={selectedOrganization} // Passa a organização selecionada para o modal
        />
      </BasicModal>
      {organizationList.map((organization) => (
        <ListItem
          key={organization.id}
          onClick={() => navigate(`/organizacoes/${organization.id}`)}
          sx={{
            marginBottom: "20px",
            width: "48%",
            bgcolor: "background.paper",
            padding: "16px",
            borderRadius: "8px",
            ":hover": { cursor: "pointer", bgcolor: grey[300] },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <ListItemText
              primary={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{organization.name}</Typography>
                  <Box>
                    <IconButton onClick={(e) => handleEdit(e, organization)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={(e) => handleDelete(e, organization)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Membros: {organization.memberCount}
                  </Typography>
                </Box>
              }
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
