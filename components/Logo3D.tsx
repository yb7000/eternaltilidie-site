"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Compact binary logo geometry (see scripts/pack-logo.py):
// "ELG1", uint32 vertCount, uint32 indexCount,
// float32 posMin[3] + posScale[3],
// uint16 quantized positions [V*3], int8 normals [V*3],
// zero-padding to 4 bytes, then uint16 (V<=65535) or uint32 indices.
function parseBin(buf: ArrayBuffer): THREE.BufferGeometry {
  const dv = new DataView(buf);
  if (dv.getUint32(0, false) !== 0x454c4731) throw new Error("bad logo binary");
  const V = dv.getUint32(4, true);
  const I = dv.getUint32(8, true);
  const min = [dv.getFloat32(12, true), dv.getFloat32(16, true), dv.getFloat32(20, true)];
  const scale = [dv.getFloat32(24, true), dv.getFloat32(28, true), dv.getFloat32(32, true)];
  let off = 36;
  const qpos = new Uint16Array(buf, off, V * 3);
  off += V * 6;
  const qnor = new Int8Array(buf, off, V * 3);
  off += V * 3;
  off = (off + 3) & ~3;
  const index =
    V <= 65535 ? new Uint16Array(buf, off, I) : new Uint32Array(buf, off, I);

  const pos = new Float32Array(V * 3);
  const nor = new Float32Array(V * 3);
  for (let i = 0; i < V * 3; i++) {
    const k = i % 3;
    pos[i] = min[k] + (qpos[i] / 65535) * scale[k];
    nor[i] = qnor[i] / 127;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
  geo.setIndex(new THREE.BufferAttribute(index.slice(), 1));
  return geo;
}

// Draggable, slowly spinning 3D render of the Eternal logo. `poster` is an
// image shown immediately and faded out once the model is rendering.
export default function Logo3D({
  src,
  className,
  poster,
}: {
  src: string;
  className?: string;
  poster?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

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
      .then((r) => r.arrayBuffer())
      .then((buf) => {
        if (disposed) return;
        const geo = parseBin(buf);
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
        setReady(true);
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

  return (
    <div ref={hostRef} className={className} style={{ position: "relative" }}>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            height: "76%",
            width: "auto",
            transform: "translate(-50%,-50%)",
            opacity: ready ? 0 : 1,
            transition: "opacity .5s ease",
            pointerEvents: "none",
          }}
        />
      ) : null}
    </div>
  );
}
