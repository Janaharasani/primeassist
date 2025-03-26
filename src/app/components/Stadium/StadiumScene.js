"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function StadiumScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    scene.background = new THREE.Color('#f9fafb');
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create stadium
    const createStadium = () => {
      // Field
      const fieldGeometry = new THREE.CircleGeometry(10, 32);
      const fieldMaterial = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });
      const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
      field.rotation.x = -Math.PI / 2;
      scene.add(field);

      // Stands
      const standGeometry = new THREE.RingGeometry(10, 15, 32, 1, 0, Math.PI * 2);
      const standMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e3f72,
        side: THREE.DoubleSide
      });
      const stands = new THREE.Mesh(standGeometry, standMaterial);
      stands.rotation.x = -Math.PI / 2;
      stands.position.y = 0.5;
      scene.add(stands);

      // Seats
      for (let i = 0; i < 32; i += 2) {
        const angle = (i / 32) * Math.PI * 2;
        const seat = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.2, 1),
          new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        seat.position.x = 12.5 * Math.cos(angle);
        seat.position.z = 12.5 * Math.sin(angle);
        seat.position.y = 0.6;
        seat.rotation.y = -angle;
        scene.add(seat);
      }

      // Lights
      const stadiumLights = new THREE.Group();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const light = new THREE.PointLight(0xffffff, 1, 20);
        light.position.set(18 * Math.cos(angle), 8, 18 * Math.sin(angle));
        stadiumLights.add(light);
        
        const lightHelper = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xffff00 })
        );
        lightHelper.position.copy(light.position);
        stadiumLights.add(lightHelper);
      }
      scene.add(stadiumLights);
    };

    createStadium();

    // Camera position
    camera.position.set(0, 15, 20);
    camera.lookAt(0, 0, 0);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
}