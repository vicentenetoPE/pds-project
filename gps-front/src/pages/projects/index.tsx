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
    fetchProjectDetails();
  }, [id])
  

  return (
    <div>{projectDetails?.id}{projectDetails.name}</div>
  )
}
