import { useEffect, useRef } from "react";
import * as THREE from "three";

const Globe3D = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const globeRef = useRef(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isInitializedRef.current) return;

    isInitializedRef.current = true;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 3;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create globe with low-poly look
    const geometry = new THREE.IcosahedronGeometry(1.5, 3);

    // Create material with orange theme
    const material = new THREE.MeshPhongMaterial({
      color: 0xff8c42,
      emissive: 0xff6600,
      emissiveIntensity: 0.2,
      flatShading: true,
      transparent: true,
      opacity: 0.9,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Add wireframe overlay
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.52, 3);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Add inner glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.45, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8c42,
      transparent: true,
      opacity: 0.1,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xff8c42, 1);
    directionalLight1.position.set(5, 3, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xff6600, 0.5);
    directionalLight2.position.set(-5, -3, -5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xff8c42, 1, 100);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Add particles around globe
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: 0xff8c42,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    // Animation
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate globe
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.003;
        globeRef.current.rotation.x += 0.001;
      }

      // Rotate wireframe slightly different
      wireframe.rotation.y -= 0.002;
      wireframe.rotation.x -= 0.001;

      // Rotate particles
      particlesMesh.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Mouse interaction
    const handleMouseMove = (event) => {
      if (!containerRef.current || !globeRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      globeRef.current.rotation.y = x * 0.5;
      globeRef.current.rotation.x = y * 0.5;
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      isInitializedRef.current = false;
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (
        rendererRef.current &&
        container &&
        container.contains(rendererRef.current.domElement)
      ) {
        container.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (wireframeGeometry) wireframeGeometry.dispose();
      if (wireframeMaterial) wireframeMaterial.dispose();
      if (glowGeometry) glowGeometry.dispose();
      if (glowMaterial) glowMaterial.dispose();
      if (particlesGeometry) particlesGeometry.dispose();
      if (particlesMaterial) particlesMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
      style={{ cursor: "grab" }}
    />
  );
};

export default Globe3D;
