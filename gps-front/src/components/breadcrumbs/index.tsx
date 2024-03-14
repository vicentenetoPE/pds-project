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
//todo refactor
const getPageName = (breadcrumbs) => {
  return "Projetos";
};
type Breadcrumb ={
  name:string
  path: string
}

type Props = {
  breadcrumbs: Breadcrumb[] | null;
};

export default function BreadCrumbs({ breadcrumbs }: Props) {
  const pageName = getPageName(breadcrumbs);

  const links =()=> breadcrumbs.map((breadcrumb, i)=>{
    const islast = i === breadcrumbs.length - 1;


    if(islast){
      return(
      <Typography key={i} color="text.primary">
        {breadcrumb.name}
      </Typography>
      )
    }

    return(
    <Link underline="hover" key={i} color="inherit" href={breadcrumb.path} onClick={handleClick}>
      {breadcrumb.name}
    </Link>
    )
  })


  return (
    <Stack spacing={2}>
      <PageTitle>{pageName}</PageTitle>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {links()}
      </Breadcrumbs>
    </Stack>
  );
}
