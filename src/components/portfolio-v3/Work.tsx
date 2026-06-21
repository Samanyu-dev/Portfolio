"use client";
import "./styles/Work.css";
import { config } from "@/config-v3";
import { FaGithub } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-content section-container">
        <h2>My <span>Projects</span></h2>
        
        <div className="carousel-container">
          {config.projects.map((project) => (
            <div key={project.id} className="project-card group">
              <div 
                className="project-image flex items-center justify-center relative overflow-hidden" 
                style={{ background: 'linear-gradient(135deg, rgba(25,25,25,1) 0%, rgba(10,10,10,1) 100%)' }}
              >
                <div className="absolute inset-0 bg-[var(--primary)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--primary)]/10 blur-3xl" />
                <div className="z-10 flex flex-col items-center">
                  <span className="text-6xl font-black tracking-tighter text-white/90">
                    {project.title.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="project-category-badge z-20">{project.category}</div>
              </div>
              
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-tech">{project.technologies}</p>
                <p className="project-desc">{project.description}</p>
                
                <div className="project-links mt-auto pt-4 flex-wrap">
                  <Link 
                    href={`/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                    className="project-btn text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20 hover:bg-[var(--primary)]/20"
                  >
                    View Details
                  </Link>
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
