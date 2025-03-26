"use client"
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function StadiumScene() {
  const mountRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      return dimensions.width < 768;
    };
    setIsMobile(checkIfMobile());

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(dimensions.width, dimensions.height);
    mountRef.current.appendChild(renderer.domElement);
    scene.background = new THREE.Color('#f9fafb');

    // Calculate scale factor based on screen size
    const getScaleFactor = () => {
      if (dimensions.width < 768) return 0.6; // Mobile
      if (dimensions.width < 1024) return 0.8; // Tablet
      return 1; // Desktop
    };
    const scaleFactor = getScaleFactor();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create responsive stadium
    const createStadium = () => {
      // Field (scaled)
      const fieldGeometry = new THREE.CircleGeometry(10 * scaleFactor, 32);
      const fieldMaterial = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });
      const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
      field.rotation.x = -Math.PI / 2;
      scene.add(field);

      // Stands (scaled)
      const standGeometry = new THREE.RingGeometry(
        10 * scaleFactor, 
        15 * scaleFactor, 
        32, 1, 0, Math.PI * 2
      );
      const standMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e3f72,
        side: THREE.DoubleSide
      });
      const stands = new THREE.Mesh(standGeometry, standMaterial);
      stands.rotation.x = -Math.PI / 2;
      stands.position.y = 0.5 * scaleFactor;
      scene.add(stands);

      // Seats (scaled)
      for (let i = 0; i < 32; i += 2) {
        const angle = (i / 32) * Math.PI * 2;
        const seat = new THREE.Mesh(
          new THREE.BoxGeometry(0.5 * scaleFactor, 0.2 * scaleFactor, 1 * scaleFactor),
          new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        seat.position.x = 12.5 * scaleFactor * Math.cos(angle);
        seat.position.z = 12.5 * scaleFactor * Math.sin(angle);
        seat.position.y = 0.6 * scaleFactor;
        seat.rotation.y = -angle;
        scene.add(seat);
      }

      // Lights (position scaled)
      const stadiumLights = new THREE.Group();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const light = new THREE.PointLight(0xffffff, 1, 20 * scaleFactor);
        light.position.set(
          18 * scaleFactor * Math.cos(angle),
          8 * scaleFactor,
          18 * scaleFactor * Math.sin(angle)
        );
        stadiumLights.add(light);
        
        const lightHelper = new THREE.Mesh(
          new THREE.SphereGeometry(0.3 * scaleFactor, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xffff00 })
        );
        lightHelper.position.copy(light.position);
        stadiumLights.add(lightHelper);
      }
      scene.add(stadiumLights);
    };

    createStadium();

    // Responsive camera position
    const cameraDistance = 20 * scaleFactor;
    camera.position.set(0, 15 * scaleFactor, cameraDistance);
    camera.lookAt(0, 0, 0);

    // Adjust camera FOV based on screen size
    camera.fov = dimensions.width < 768 ? 80 : 75;
    camera.updateProjectionMatrix();

    // Controls - only enable for non-mobile devices
    let controls = null;
    if (!isMobile) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.enableRotate = true;
      controls.enablePan = true;
      controls.panSpeed = 0.5 * scaleFactor;
      controls.rotateSpeed = 0.5;
      controls.minDistance = 10 * scaleFactor;
      controls.maxDistance = 50 * scaleFactor;
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setDimensions({
        width: newWidth,
        height: newHeight
      });
      setIsMobile(newWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (controls) controls.dispose();
    };
  }, [dimensions, isMobile]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100vh',
        touchAction: isMobile ? 'auto' : 'none',
        overflow: isMobile ? 'auto' : 'hidden'
      }} 
    />
  );
}