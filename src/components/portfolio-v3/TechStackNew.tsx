/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import "./styles/TechStackNew.css";

const rows = [
  // Row 1 - 3 items
  [
    { name: "Machine Learning", icon: "https://img.icons8.com/color/48/artificial-intelligence.png", url: "#" },
    { name: "Deep Learning", icon: "https://img.icons8.com/color/48/brain.png", url: "#" },
    { name: "Reinforced Learning", icon: "https://img.icons8.com/fluency/48/robot-3.png", url: "#" },
  ],
  // Row 2 - 4 items
  [
    { name: "Hugging Face", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", url: "https://huggingface.co" },
    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", url: "https://pytorch.org" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", url: "https://tensorflow.org" },
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", url: "https://jupyter.org" }
  ],
  // Row 3 - 5 items
  [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", url: "https://python.org" },
    { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", url: "https://fastapi.tiangolo.com" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", url: "https://isocpp.org/" },
    { name: "Rust", icon: "https://skillicons.dev/icons?i=rust", url: "https://www.rust-lang.org/" },
    { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", url: "https://dart.dev/" },
  ],
  // Row 4 - 6 items
  [
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", url: "https://flutter.dev" },
    { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://reactnative.dev" },
    { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", url: "https://developer.apple.com/swift/" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", url: "https://kotlinlang.org" },
    { name: "Expo", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg", url: "https://expo.dev" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", url: "https://developer.mozilla.org/en-US/docs/Glossary/HTML5" }
  ],
  // Row 5 - 7 items
  [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://reactjs.org" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", url: "https://nextjs.org" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", url: "https://typescriptlang.org" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", url: "https://mongodb.com" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", url: "https://firebase.google.com" },
  ],
  // Row 6 - 6 items
  [
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", url: "https://docker.com" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "https://git-scm.com" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", url: "https://aws.amazon.com" },
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", url: "https://vercel.com" },
    { name: "Render", icon: "https://skillicons.dev/icons?i=render", url: "https://render.com/" },
    { name: "Railway", icon: "https://railway.app/brand/logo-light.png", url: "https://railway.app/" }
  ]
];

const TechStackNew = () => {
  return (
    <div className="techstack-new">
      <div className="techstack-video-container">
        <div className="techstack-glow-bg"></div>
      </div>

      <div className="techstack-content section-container">
        <h2 className="techstack-title">
          TECH <span>STACK</span>
        </h2>

        <div className="hexagon-pyramid">
          {rows.map((row, rowIndex) => (
            <div className="hex-row" key={rowIndex}>
              {row.map((tech, colIndex) => (
                <a
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hex-wrapper"
                  key={colIndex}
                >
                  <div className="hex">
                    <img src={tech.icon} alt={tech.name} />
                    <span className="hex-name">{tech.name}</span>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackNew;
