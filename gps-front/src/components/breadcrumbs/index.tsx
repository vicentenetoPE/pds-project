import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { PageTitle } from "./styles";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.log("You clicked a breadcrumb.");
}

const getPageName = (breadcrumbs) => {
  if (breadcrumbs && breadcrumbs.length > 0) return breadcrumbs[breadcrumbs.length - 1];
  return "Projetos";
};

type Props = {
  breadcrumbs: any[] | null;
};

export default function BreadCrumbs({ breadcrumbs }: Props) {
  const pageName = getPageName(breadcrumbs);

  return (
    <Stack spacing={2}>
      <PageTitle>{pageName}</PageTitle>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          MUI
        </Link>
        <Link underline="hover" key="2" color="inherit" href="/material-ui/getting-started/installation/" onClick={handleClick}>
          Core
        </Link>
        <Typography key="3" color="text.primary">
          Breadcrumb
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
}
