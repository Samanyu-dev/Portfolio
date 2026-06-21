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
      ".blog-timeline",
      { maxHeight: "0%" },
      { maxHeight: "100%", duration: 1.5, ease: "power3.out" },
      "-=0.4"
    );

    blogTimeline.fromTo(
      ".blog-info-box",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=1.0"
    );

    blogTimeline.fromTo(
      ".blog-dot",
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      "-=1.5"
    );

    return () => {
      blogTimeline.kill();
    };
  }, []);

  return (
    <div className="blog-section section-container" id="blog">
      <div className="blog-container">
        <h2>My <span>blogs</span></h2>

        <div className="blog-info">
          <div className="blog-timeline">
            <div className="blog-dot"></div>
          </div>

          {config.blogs.map((blog) => (
            <div
              className={`blog-info-box ${activeBlog === blog.id ? "active" : ""}`}
              key={blog.id}
              onClick={() => setActiveBlog(activeBlog === blog.id ? null : blog.id)}
              data-cursor="pointer"
            >
              <div className="blog-info-in">
                <div className="blog-role">
                  <h4>{blog.title}</h4>
                  <h5>{blog.date}</h5>
                </div>
              </div>

              <div className="blog-content-side">
                <p>{blog.summary}</p>
                <div className="blog-content-wrapper" style={{ height: activeBlog === blog.id ? "auto" : 0, opacity: activeBlog === blog.id ? 1 : 0, overflow: "hidden" }}>
                  <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
