"use client";
import "./styles/Work.css";
import { config } from "@/config-v3";
import { FaGithub } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-content section-container">
        <h2>My <span>Projects</span></h2>
        
        <div className="carousel-container">
          {config.projects.map((project) => (
            <div key={project.id} className="project-card">
              <div 
                className="project-image" 
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="project-category-badge">{project.category}</div>
              </div>
              
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-tech">{project.technologies}</p>
                <p className="project-desc">{project.description}</p>
                
                <div className="project-links">
                  {project.repoLink && (
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-btn">
                      <FaGithub /> Repo
                    </a>
                  )}
                  {(project as any).liveLink && (
                    <a href={(project as any).liveLink} target="_blank" rel="noopener noreferrer" className="project-btn">
                      <MdOutlineArrowOutward /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
