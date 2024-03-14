import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Project } from '../../models/models/Project';
import { useApi } from '../../hooks/useApi';

export const Projects = () => {
  const {id} =   useParams();
  const [projectDetails, setProjectDetails]= useState<Project|null>(null);
  const api = useApi();
  useEffect(() => {
    const fetchProjectDetails = async()=>{
        const response = await api.projects.getOne(id);
        setProjectDetails(response.data)
    }
    id && fetchProjectDetails();
  }, [id])
  
  return (
    <div><h1>ID:{projectDetails?.id}</h1><h1>Título:{projectDetails?.name}</h1></div>
  )
}
