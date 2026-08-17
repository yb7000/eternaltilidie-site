"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function parseObj(text: string): THREE.BufferGeometry {
  const vs: number[] = [];
  const ns: number[] = [];
  const pos: number[] = [];
  const nor: number[] = [];
  for (const line of text.split("\n")) {
    if (line[0] === "v" && line[1] === " ") {
      const p = line.trim().split(/\s+/);
      vs.push(+p[1], +p[2], +p[3]);
    } else if (line.startsWith("vn ")) {
      const p = line.trim().split(/\s+/);
      ns.push(+p[1], +p[2], +p[3]);
    } else if (line.startsWith("f ")) {
      const p = line.trim().split(/\s+/).slice(1);
      for (let i = 1; i < p.length - 1; i++) {
        for (const tok of [p[0], p[i], p[i + 1]]) {
          const parts = tok.split("/");
          const vi = (parseInt(parts[0]) - 1) * 3;
          pos.push(vs[vi], vs[vi + 1], vs[vi + 2]);
          if (parts[2]) {
            const ni = (parseInt(parts[2]) - 1) * 3;
            nor.push(ns[ni], ns[ni + 1], ns[ni + 2]);
          }
        }
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  if (nor.length === pos.length && nor.length > 0) {
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  } else {
    geo.computeVertexNormals();
  }
  return geo;
}

// Draggable, slowly spinning 3D render of the Eternal logo.
export default function Logo3D({ src, className }: { src: string; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x30303a, 1.4));
    const dir = new THREE.DirectionalLight(0xffffff, 1.6);
    dir.position.set(3, 4, 5);
    scene.add(dir);
    const group = new THREE.Group();
    scene.add(group);

    let disposed = false;
    fetch(src)
      .then((r) => r.text())
      .then((txt) => {
        if (disposed) return;
        const geo = parseObj(txt);
        geo.computeBoundingBox();
        const box = geo.boundingBox!;
        const c = new THREE.Vector3();
        box.getCenter(c);
        const size = new THREE.Vector3();
        box.getSize(size);
        const s = 2.6 / Math.max(size.x, size.y, size.z);
        const mesh = new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45, metalness: 0.08 })
        );
        mesh.position.copy(c).multiplyScalar(-1);
        const inner = new THREE.Group();
        inner.add(mesh);
        inner.scale.setScalar(s);
        group.add(inner);
      })
      .catch((e) => console.warn("logo-3d load failed", e));

    const resize = () => {
      const w = host.clientWidth || 300;
      const h = host.clientHeight || 300;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      host.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      group.rotation.y += (e.clientX - lastX) * 0.01;
      group.rotation.x = Math.max(-1, Math.min(1, group.rotation.x + (e.clientY - lastY) * 0.008));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerup", onUp);

    let raf = 0;
    const tick = () => {
      if (!dragging) group.rotation.y += 0.007;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerup", onUp);
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [src]);

  return <div ref={hostRef} className={className} />;
}
