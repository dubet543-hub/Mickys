import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/*
  HeroScene3D — a lightweight WebGL depth layer that sits BEHIND the product
  carousel. Brand-gold "spice motes" drift upward through perspective + fog,
  giving the maroon hero real three-dimensional atmosphere. Reacts to the
  pointer with a gentle parallax. Fully guarded for reduced-motion + mobile.
*/

const WINE = '#6F0E13';

/* Warm, on-brand particle tints (no wine — it would vanish on the maroon bg) */
const PALETTE = ['#fcd34f', '#f1c53e', '#fff3d0', '#e0a92a', '#ffe39a'];

function Motes({ count, reduced }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 18,
        y: Math.random() * 14,                 // 0..14, wraps to give endless rise
        z: (Math.random() - 0.5) * 9 - 2.5,
        speed: 0.18 + Math.random() * 0.5,
        scale: 0.035 + Math.random() * 0.17,
        swayAmp: 0.25 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        color: new THREE.Color(PALETTE[i % PALETTE.length]),
      });
    }
    return arr;
  }, [count]);

  /* Per-instance colour once on mount */
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    particles.forEach((p, i) => mesh.setColorAt(i, p.color));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [particles]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = reduced ? 0 : state.clock.getElapsedTime();
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const y = ((p.y + t * p.speed) % 14) - 7;          // wrap into -7..7
      const x = p.x + Math.sin(t * 0.4 + p.phase) * p.swayAmp;
      dummy.position.set(x, y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial transparent opacity={0.7} toneMapped={false} />
    </instancedMesh>
  );
}

/* Pointer parallax — whole field tilts gently toward the cursor */
function ParallaxRig({ children, reduced }) {
  const ref = useRef();
  useFrame((state) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.18, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.12, 0.04);
  });
  return <group ref={ref}>{children}</group>;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

export default function HeroScene3D() {
  const reduced = usePrefersReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const count = isMobile ? 45 : 95;

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[1, isMobile ? 1.2 : 1.8]}
      gl={{ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      {/* Distant motes fade into the maroon backdrop for real depth */}
      <fog attach="fog" args={[WINE, 7, 20]} />
      <ParallaxRig reduced={reduced}>
        <Motes count={count} reduced={reduced} />
      </ParallaxRig>
    </Canvas>
  );
}
