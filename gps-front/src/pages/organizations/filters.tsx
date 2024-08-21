import React, { useState, useRef } from "react";
import { Grid, Input, Button, InputAdornment, IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Organization } from "../../models/models/Organization";
import { BasicModal } from "../../components/modal";
import { NewOrganizationModal } from "./newOrganizationModal";

type FiltersProps = {
  organizations: Organization[];
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  onCreateOrganization: () => Promise<void>;
};

export const Filters = ({ organizations, setOrganizations, onCreateOrganization }: FiltersProps) => {
  const [open, setOpen] = useState(false);
  const originalOrganizations = useRef(organizations);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const filterValue = e.target.value.toLowerCase();
    const filteredOrganizations = originalOrganizations.current.filter((org) =>
      org.name.toLowerCase().includes(filterValue)
    );
    setOrganizations(filteredOrganizations);
  };

  const resetFilter = () => {
    setOrganizations(originalOrganizations.current);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <Input
          placeholder="Filtrar por nome"
          type="text"
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="filter list" edge="end">
                <FilterAltIcon />
              </IconButton>
            </InputAdornment>
          }
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Adicionar Organização
        </Button>
        <BasicModal open={open} setOpen={setOpen}>
          <NewOrganizationModal setOpen={setOpen} onCreateOrganization={onCreateOrganization} />
        </BasicModal>
      </Grid>
      {/* <Grid item xs={12}>
        <Button variant="text" onClick={resetFilter}>
          Resetar Filtro
        </Button>
      </Grid> */}
    </Grid>
  );
};
