'use client'

import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uNoiseStrength;
uniform float uNoiseFrequency;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

// Simplex noise implementation (Ashima Arts)
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, D.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vNormal = normal;
  
  // Sample noise at multiple frequencies for organic feel
  float noise1 = snoise(position * uNoiseFrequency + uTime * 0.12);
  float noise2 = snoise(position * uNoiseFrequency * 2.5 + uTime * 0.08) * 0.5;
  float noise3 = snoise(position * uNoiseFrequency * 6.0 + uTime * 0.18) * 0.15;
  
  float totalNoise = noise1 + noise2 + noise3;
  
  // Mouse influence on displacement
  float mouseInfluence = length(uMouse) * 0.15;
  
  float displacement = totalNoise * (uNoiseStrength + mouseInfluence);
  vDisplacement = displacement;
  
  vec3 newPosition = position + normal * displacement;
  vPosition = newPosition;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec3 uBaseColor;
uniform vec3 uAccentColor1;
uniform vec3 uAccentColor2;
uniform vec3 uLightPos;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  // Fresnel — iridescent rim effect
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
  
  // Shift between warm tones based on normal angle + time
  float shift = sin(vNormal.y * 3.0 + uTime * 0.15) * 0.5 + 0.5;
  vec3 iridescent = mix(uAccentColor1, uAccentColor2, shift);
  
  // Blend base with iridescent on rim
  vec3 color = mix(uBaseColor, iridescent, fresnel * 0.85);
  
  // Soft specular highlight
  vec3 lightDir = normalize(uLightPos - vPosition);
  float spec = pow(max(dot(reflect(-lightDir, vNormal), viewDir), 0.0), 32.0);
  color += vec3(1.0, 0.98, 0.92) * spec * 0.3;
  
  // Displacement-based darkening in crevices
  color *= 1.0 - max(-vDisplacement * 0.6, 0.0);
  
  gl_FragColor = vec4(color, 1.0);
}
`

const BlobShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uNoiseStrength: 0.35,
    uNoiseFrequency: 0.6,
    uBaseColor: new THREE.Color(0.95, 0.90, 0.82),     // warm cream
    uAccentColor1: new THREE.Color(0.88, 0.72, 0.68),  // dusty rose
    uAccentColor2: new THREE.Color(0.95, 0.85, 0.60),  // pale gold
    uLightPos: new THREE.Vector3(2, 3, 4),
  },
  vertexShader,
  fragmentShader
)

try {
  extend({ BlobShaderMaterial })
} catch (e) {
  // Catch HMR redefinition warnings
}

export function BlobMaterial({ dark = false }: { dark?: boolean }) {
  const colors = dark
    ? {
        uBaseColor: new THREE.Color(0.08, 0.12, 0.22),
        uAccentColor1: new THREE.Color(0.15, 0.39, 0.92),
        uAccentColor2: new THREE.Color(0.39, 0.4, 0.95)
      }
    : {
        uBaseColor: new THREE.Color(0.95, 0.9, 0.82),
        uAccentColor1: new THREE.Color(0.88, 0.72, 0.68),
        uAccentColor2: new THREE.Color(0.95, 0.85, 0.6)
      };

  return (
    <blobShaderMaterial
      key={`${BlobShaderMaterial.key}-${dark ? "dark" : "light"}`}
      uBaseColor={colors.uBaseColor}
      uAccentColor1={colors.uAccentColor1}
      uAccentColor2={colors.uAccentColor2}
    />
  );
}

// TypeScript declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      blobShaderMaterial: any
    }
  }
}
