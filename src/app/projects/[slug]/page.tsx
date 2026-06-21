import React from 'react';
import { config } from '@/config-v3';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { MdOutlineArrowOutward, MdArrowBack } from 'react-icons/md';
import Link from 'next/link';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = config.projects.find(
    p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.slug || 
         p.title.toLowerCase() === params.slug.toLowerCase() || 
         p.id.toString() === params.slug
  );
  
  if (!project) return notFound();

  const initials = project.title.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0b080c] text-white p-8 md:p-24 selection:bg-[var(--primary)] selection:text-white">
      <Link href="/#work" className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--primary)] transition-colors mb-12">
        <MdArrowBack /> Back to Projects
      </Link>
      
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left Side: Visual */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="aspect-square flex items-center justify-center relative overflow-hidden rounded-3xl border border-white/5" style={{ background: 'linear-gradient(135deg, rgba(25,25,25,1) 0%, rgba(10,10,10,1) 100%)' }}>
            <div className="absolute inset-0 bg-[var(--primary)]/5" />
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--primary)]/20 blur-3xl" />
            <span className="text-8xl font-black tracking-tighter text-white/90">{initials}</span>
          </div>
          
          <div className="flex gap-4">
            {project.repoLink && (
              <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-white/5 hover:bg-[var(--primary)]/20 border border-white/10 hover:border-[var(--primary)]/50 rounded-2xl flex items-center justify-center gap-2 transition-all font-medium">
                <FaGithub /> Repository
              </a>
            )}
            {(project as any).liveLink && (
              <a href={(project as any).liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/30 border border-[var(--primary)]/30 hover:border-[var(--primary)] rounded-2xl flex items-center justify-center gap-2 transition-all font-medium text-[var(--primary)]">
                <MdOutlineArrowOutward /> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-mono uppercase tracking-widest border border-[var(--primary)]/20 mb-6 w-fit">
            {project.category}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 font-['Geist']">{project.title}</h1>
          <p className="text-[var(--primary)] font-mono tracking-wider mb-10">{project.technologies}</p>
          
          <div className="prose prose-invert prose-p:text-gray-400 prose-p:text-lg prose-p:leading-relaxed max-w-none">
            <p>{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
