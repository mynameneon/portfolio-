"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Box, Cuboid, Orbit, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import type * as ThreeNamespace from "three";
import { useLanguage } from "@/hooks/useLanguage";

type ThreeModule = typeof import("three");

const copy = {
  ru: {
    eyebrow: "Three.js / Spatial UI",
    title: "3D-сцена внутри портфолио, которую можно развивать в продукт.",
    body:
      "Здесь не просто декоративный фон: это база под интерактивные сцены, 3D-презентации, product demo, игровые меню, конфигураторы и визуальные лендинги. Сцена реагирует на курсор и остается легкой для сайта.",
    specs: ["WebGL scene", "Pointer parallax", "Product demo ready", "No heavy assets"],
    caption: "move cursor / scroll depth"
  },
  ua: {
    eyebrow: "Three.js / Spatial UI",
    title: "3D-сцена всередині портфоліо, яку можна розвивати в продукт.",
    body:
      "Тут не просто декоративний фон: це база під інтерактивні сцени, 3D-презентації, product demo, ігрові меню, конфігуратори та візуальні лендінги. Сцена реагує на курсор і лишається легкою для сайту.",
    specs: ["WebGL scene", "Pointer parallax", "Product demo ready", "No heavy assets"],
    caption: "move cursor / scroll depth"
  }
} as const;

function createRing(THREE: ThreeModule, radius: number, color: string) {
  const points: ThreeNamespace.Vector3[] = [];
  for (let index = 0; index <= 144; index += 1) {
    const angle = (index / 144) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.34
  });

  return new THREE.LineLoop(geometry, material);
}

function createPanel(THREE: ThreeModule, width: number, height: number, color: string, x: number, y: number, z: number) {
  const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.13,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.rotation.y = x > 0 ? -0.32 : 0.32;
  mesh.rotation.x = y > 0 ? 0.12 : -0.12;
  return mesh;
}

function disposeObject(THREE: ThreeModule, object: ThreeNamespace.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.Line) {
      const renderable = child as ThreeNamespace.Mesh | ThreeNamespace.Points | ThreeNamespace.Line;
      renderable.geometry.dispose();

      if (Array.isArray(renderable.material)) {
        renderable.material.forEach((material) => material.dispose());
      } else {
        renderable.material.dispose();
      }
    }
  });
}

function initThreeScene(THREE: ThreeModule, canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.45));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
  const blueLight = new THREE.PointLight(0x2997ff, 12, 18);
  blueLight.position.set(2.4, 2.8, 3.6);
  const softLight = new THREE.PointLight(0x66c7ff, 4.5, 16);
  softLight.position.set(-3.8, -2.2, 4.2);
  scene.add(ambientLight, blueLight, softLight);

  const group = new THREE.Group();
  scene.add(group);

  const coreGeometry = new THREE.IcosahedronGeometry(1.08, 1);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x0b1724,
    emissive: 0x113c66,
    emissiveIntensity: 0.52,
    metalness: 0.42,
    roughness: 0.28,
    wireframe: true
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(core);

  const glassGeometry = new THREE.TorusKnotGeometry(1.34, 0.018, 132, 8, 2, 3);
  const glassMaterial = new THREE.MeshBasicMaterial({
    color: 0x66c7ff,
    transparent: true,
    opacity: 0.46
  });
  const knot = new THREE.Mesh(glassGeometry, glassMaterial);
  group.add(knot);

  const ringA = createRing(THREE, 2.4, "#2997ff");
  const ringB = createRing(THREE, 3.25, "#66c7ff");
  const ringC = createRing(THREE, 4.1, "#ffffff");
  ringA.rotation.x = Math.PI / 2.7;
  ringB.rotation.y = Math.PI / 2.4;
  ringC.rotation.x = Math.PI / 2;
  ringC.rotation.z = 0.38;
  group.add(ringA, ringB, ringC);

  const panels = [
    createPanel(THREE, 1.45, 0.72, "#2997ff", -2.6, 1.2, -0.4),
    createPanel(THREE, 1.1, 0.54, "#ffffff", 2.3, 0.92, -0.7),
    createPanel(THREE, 1.7, 0.82, "#66c7ff", 2.7, -1.22, -0.9),
    createPanel(THREE, 1.25, 0.62, "#ffffff", -2.4, -1.35, -0.6)
  ];
  const panelBaseY = panels.map((panel) => panel.position.y);
  panels.forEach((panel) => group.add(panel));

  const isSmallScreen = window.matchMedia("(max-width: 760px)").matches;
  const particleCount = isSmallScreen ? 120 : 220;
  const positions = new Float32Array(particleCount * 3);
  for (let index = 0; index < particleCount; index += 1) {
    const radius = 1.8 + Math.random() * 3.8;
    const angle = index * 0.31;
    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 3.8;
    positions[index * 3 + 2] = Math.sin(angle) * radius - Math.random() * 1.8;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x66c7ff,
    size: 0.025,
    transparent: true,
    opacity: 0.72
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  group.add(particles);

  const mouse = { x: 0, y: 0 };
  let isVisible = true;
  let animationId = 0;
  const clock = new THREE.Clock();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
    mouse.y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
  };

  const resize = () => {
    const parent = canvas.parentElement;
    const width = parent?.clientWidth ?? canvas.clientWidth;
    const height = parent?.clientHeight ?? canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  };

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
    },
    { rootMargin: "180px" }
  );
  visibilityObserver.observe(canvas);

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove);
  resize();

  const animate = () => {
    animationId = window.requestAnimationFrame(animate);

    if (!isVisible || document.hidden) {
      return;
    }

    const time = clock.getElapsedTime();
    const movement = reducedMotion ? 0 : time;
    group.rotation.y += (mouse.x * 0.2 + movement * 0.08 - group.rotation.y) * 0.035;
    group.rotation.x += (-mouse.y * 0.12 + Math.sin(movement * 0.55) * 0.055 - group.rotation.x) * 0.045;
    core.rotation.y = movement * 0.32;
    core.rotation.x = movement * 0.18;
    knot.rotation.x = movement * 0.22;
    knot.rotation.y = movement * 0.36;
    ringA.rotation.z = movement * 0.12;
    ringB.rotation.x = Math.PI / 2.4 + Math.sin(movement * 0.34) * 0.12;
    ringC.rotation.z = 0.38 - movement * 0.08;
    particles.rotation.y = -movement * 0.025;
    panels.forEach((panel, index) => {
      panel.position.y = panelBaseY[index] + Math.sin(movement * 0.75 + index) * 0.08;
    });

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    window.cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    visibilityObserver.disconnect();
    disposeObject(THREE, group);
    renderer.dispose();
  };
}

export function ThreeLabSection() {
  const { lang } = useLanguage();
  const content = copy[lang];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headlineY = useTransform(scrollYProgress, [0, 1], [38, -38]);
  const specY = useTransform(scrollYProgress, [0, 1], [70, -50]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    let cleanupScene: (() => void) | undefined;
    let cancelled = false;

    const loadScene = async () => {
      const THREE = await import("three");
      if (cancelled || cleanupScene) {
        return;
      }

      cleanupScene = initThreeScene(THREE, canvas);
    };

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void loadScene();
          loadObserver.disconnect();
        }
      },
      { rootMargin: "420px" }
    );

    loadObserver.observe(canvas);

    return () => {
      cancelled = true;
      loadObserver.disconnect();
      cleanupScene?.();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[112svh] overflow-hidden border-t border-line py-20 sm:py-32" data-hint={content.caption}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-label="Three.js spatial portfolio scene" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_36%,rgba(41,151,255,0.12),transparent_28rem),linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.42)_48%,rgba(0,0,0,0.92))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[length:74px_74px] opacity-55" />

      <div className="shell relative z-10 grid min-h-[76svh] items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div style={{ y: headlineY }} className="max-w-[720px]">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-3 text-balance font-display text-[clamp(2.35rem,10.5vw,6.8rem)] font-semibold leading-[0.9] text-text-primary">{content.title}</h2>
          <p className="mt-7 max-w-[64ch] text-pretty text-[17px] leading-8 text-[var(--text-soft)]">{content.body}</p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-black/45 px-4 py-2 text-sm text-[var(--text-soft)] backdrop-blur-xl">
            <Orbit size={16} className="text-[#66c7ff]" />
            {content.caption}
          </div>
        </motion.div>

        <motion.div style={{ y: specY }} className="ml-auto grid w-full max-w-[430px] gap-3">
          {content.specs.map((spec, index) => (
            <motion.div
              key={spec}
              className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-black/36 px-4 py-4 text-[15px] text-text-primary shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[#2997ff]/25 bg-[#2997ff]/10 text-[#66c7ff]">
                {index % 2 === 0 ? <Cuboid size={18} /> : index === 1 ? <Box size={18} /> : <Sparkles size={18} />}
              </span>
              {spec}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
