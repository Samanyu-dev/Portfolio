"use client";
import "./styles/Blog.css";
import { config } from "@/config-v3";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const [activeBlog, setActiveBlog] = useState<number | null>(null);

  useEffect(() => {
    const blogTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".blog-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    blogTimeline.fromTo(
      ".blog-section h2",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    blogTimeline.fromTo(
      ".blog-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      blogTimeline.kill();
    };
  }, []);

  return (
    <div className="blog-section section-container" id="blog">
      <h2>My <span>Notes</span></h2>
      <div className="blog-grid">
        {config.blogs.map((blog) => (
          <div 
            className={`blog-card ${activeBlog === blog.id ? "active" : ""}`} 
            key={blog.id}
            onClick={() => setActiveBlog(activeBlog === blog.id ? null : blog.id)}
            data-cursor="pointer"
          >
            <div className="blog-card-header">
              <span className="blog-date">{blog.date}</span>
              <h3>{blog.title}</h3>
            </div>
            <p className="blog-summary">{blog.summary}</p>
            
            <div className="blog-content-wrapper" style={{ height: activeBlog === blog.id ? "auto" : 0, opacity: activeBlog === blog.id ? 1 : 0, overflow: "hidden" }}>
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
