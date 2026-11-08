"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const TechSquare3D = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x06b6d4, 3.5, 30);
    keyLight.position.set(-5, 4, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xa855f7, 4.0, 30);
    rimLight.position.set(5, -4, 5);
    scene.add(rimLight);

    const topFill = new THREE.DirectionalLight(0xffffff, 1.2);
    topFill.position.set(0, 8, 4);
    scene.add(topFill);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Primary TechSquare Core (Obisidian & Chrome chamfered box)
    const cubeGeo = new THREE.BoxGeometry(2.3, 2.3, 2.3, 3, 3, 3);
    const cubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.15,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
      ior: 1.5,
    });
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    rootGroup.add(cube);

    // 2. Wireframe Precision Edge Cage
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
      linewidth: 2,
    });
    const edgeLines = new THREE.LineSegments(edgesGeo, edgesMat);
    cube.add(edgeLines);

    // 3. Inner Glowing Quantum Core
    const innerGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x6366f1,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.6,
      wireframe: false,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    cube.add(innerCore);

    // 4. Horizontal Orbit Rings
    const ring1Geo = new THREE.TorusGeometry(3.3, 0.035, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.2;
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.6, 0.025, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    rootGroup.add(ring2);

    // 5. Four Agency Satellites (Representing 4 Core Practices)
    // 0: Web Development (Cyan), 1: AI Automation (Purple), 2: Video (Amber), 3: AI Ads (Emerald)
    const practiceColors = [0x06b6d4, 0x8b5cf6, 0xf97316, 0x10b981];
    const satellites: THREE.Mesh[] = [];

    practiceColors.forEach((color, i) => {
      const satGeo = new THREE.SphereGeometry(0.24, 24, 24);
      const satMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.1,
        roughness: 0.1,
        metalness: 0.8,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      rootGroup.add(sat);
      satellites.push(sat);
    });

    // Interaction State
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationX = 0.25;
    let targetRotationY = -0.4;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      const isTouch = e.pointerType === "touch";
      // On mobile touch: only engage rotation when touching inside the 3D container
      // On laptop/desktop: allow clicking and dragging from anywhere as before
      if (isTouch && container && !container.contains(e.target as Node)) {
        return;
      }

      isDragging = true;
      setIsInteracting(true);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      rotationVelocityX = 0;
      rotationVelocityY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const isTouch = e.pointerType === "touch";
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      if (isTouch) {
        // Mobile touch: Horizontal thumb swipe rotates the cube smoothly
        // Vertical touch is left free for the browser to scroll the page (touch-pan-y)
        rotationVelocityY = deltaX * 0.01;
        targetRotationY += rotationVelocityY;
      } else {
        // Laptop / Desktop: Exact original full X & Y 360 degree drag
        rotationVelocityY = deltaX * 0.008;
        rotationVelocityX = deltaY * 0.008;

        targetRotationY += rotationVelocityY;
        targetRotationX += rotationVelocityX;
      }

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Idle auto-rotation when user is not actively dragging
      if (!isDragging) {
        targetRotationY += 0.004;
        rotationVelocityX *= 0.94;
        rotationVelocityY *= 0.94;
        targetRotationX += rotationVelocityX;
        targetRotationY += rotationVelocityY;
      }

      // Smooth interpolation (damping)
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.08;
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.08;

      // Gentle floating breathing movement
      rootGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Inner core reverse spin
      innerCore.rotation.x = -elapsedTime * 0.5;
      innerCore.rotation.y = -elapsedTime * 0.7;

      // Rotate Orbit Rings
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.z = -elapsedTime * 0.2;

      // Orbit the 4 practice satellites in 3D
      satellites.forEach((sat, i) => {
        const angle = elapsedTime * 0.7 + (i * Math.PI) / 2;
        const radius = 3.35;
        sat.position.x = Math.cos(angle) * radius;
        sat.position.z = Math.sin(angle) * radius * Math.cos(0.5);
        sat.position.y = Math.sin(angle) * 0.8 + Math.cos(elapsedTime + i) * 0.2;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      resizeObserver.disconnect();
      renderer.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-pan-y",
        className
      )}
    >
      <canvas ref={canvasRef} className="w-full h-full block touch-pan-y" />

      {/* Subtle Ambient Radial Backlight */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-purple-500/15 blur-3xl" />
      </div>
    </div>
  );
};

export default TechSquare3D;

