import React, { useState, useEffect } from 'react'
import BreadCrumbs from '../../components/breadcrumbs'
import { ProjectCard } from './components/projectCard'
import { ProjectWrapper } from './styles'
import { projects } from '../../hooks/useApi/projects'
import { Project } from '../../models/models/Project'
import { Filters } from './components/filters'

export const Home = () => {
  const [myprojects, setMyProjects]= useState<Project[]|null>(null);
  
  useEffect(() => {
    const fetchProjects = async()=>{
      const response = await projects.getAll();
      response && setMyProjects(response.data);
    }
    fetchProjects();

  }, [])
  


  return (
    <div>
      <BreadCrumbs breadcrumbs={null}/>
      <Filters/>
      <ProjectWrapper>
        {myprojects && myprojects.map(project=>{
          return <ProjectCard project={project}/>
        })}
      </ProjectWrapper>
    </div>
  )
}
