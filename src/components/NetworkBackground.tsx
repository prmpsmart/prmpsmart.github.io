import { useEffect, useRef } from 'react';

// A 3D constellation: 90 wobbling points in a flattened sphere, linked when
// close, with three faint orbit rings. The whole group turns toward the
// pointer, slowly spins over time, and tilts/recedes as the page scrolls.
// Rendered with a hand-rolled perspective projection on a 2D canvas.

const COUNT = 90;
const LINK_DIST_SQ = 2.35 * 2.35;
const MAX_LINKS = 420;
const CAMERA = { y: 0.2, z: 6.2, fov: 50 };
const RINGS = [
  {
    radius: 2.4,
    rotation: [Math.PI / 2.2, 0.2, 0],
    position: [0, -0.2, 0],
    color: '105, 132, 116',
    opacity: 0.35,
  },
  {
    radius: 3.1,
    rotation: [Math.PI / 2.5, -0.3, 0.4],
    position: [0, 0.3, -0.4],
    color: '182, 199, 170',
    opacity: 0.22,
  },
  {
    radius: 1.7,
    rotation: [1.1, 0.5, -0.2],
    position: [0.4, 0, 0.2],
    color: '210, 227, 200',
    opacity: 0.14,
  },
];

type Vec3 = [number, number, number];

/** Euler rotation in XYZ order (applies Z, then Y, then X), like three.js. */
function rotate([x, y, z]: Vec3, rx: number, ry: number, rz: number): Vec3 {
  const cz = Math.cos(rz),
    sz = Math.sin(rz);
  [x, y] = [x * cz - y * sz, x * sz + y * cz];
  const cy = Math.cos(ry),
    sy = Math.sin(ry);
  [x, z] = [x * cy + z * sy, -x * sy + z * cy];
  const cx = Math.cos(rx),
    sx = Math.sin(rx);
  [y, z] = [y * cx - z * sx, y * sx + z * cx];
  return [x, y, z];
}

function createNodes() {
  const base = new Float32Array(COUNT * 3);
  const colors: string[] = [];
  for (let i = 0; i < COUNT; i++) {
    const r = 1.2 + 3.2 * Math.random();
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    base[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
    base[i * 3 + 2] = r * Math.cos(phi);
    const c = Math.random();
    colors.push(
      `${Math.round((0.55 + 0.18 * c) * 255)}, ${Math.round((0.65 + 0.14 * c) * 255)}, ${Math.round((0.52 + 0.12 * c) * 255)}`,
    );
  }
  return { base, colors };
}

/** Points along each ring in the ring's own space, pre-transformed into group space. */
function createRings() {
  return RINGS.map((ring) => {
    const segments = 96;
    const points: Vec3[] = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const [x, y, z] = rotate(
        [ring.radius * Math.cos(a), ring.radius * Math.sin(a), 0],
        ring.rotation[0],
        ring.rotation[1],
        ring.rotation[2],
      );
      points.push([
        x + ring.position[0],
        y + ring.position[1],
        z + ring.position[2],
      ]);
    }
    return { ...ring, points };
  });
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const { base, colors } = createNodes();
    const rings = createRings();
    const positions = new Float32Array(COUNT * 3);
    const pointer = { x: 0, y: 0 };
    let scrollY = window.scrollY;
    let width = 0;
    let height = 0;
    let frame = 0;
    let dpr = 1;
    const start = performance.now();
    const tanHalfFov = Math.tan(((CAMERA.fov / 2) * Math.PI) / 180);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const t = (performance.now() - start) / 1000;
      const mx = pointer.x;
      const my = pointer.y;
      const scroll = 0.001 * scrollY;

      // Group transform: follow the pointer, spin slowly, tilt and recede on scroll.
      const groupRy = 0.35 * mx + 0.05 * t;
      const groupRx = -0.22 * my + 0.4 * scroll;
      const groupZ = -0.9 * scroll;

      const project = (v: Vec3) => {
        const [x, y, z] = rotate(v, groupRx, groupRy, 0);
        const depth = CAMERA.z - (z + groupZ);
        const scale = height / 2 / (depth * tanHalfFov);
        // three.js attenuates point size by height / 2 / depth (no FOV term).
        const pointScale = height / 2 / depth;
        return {
          x: width / 2 + x * scale,
          y: height / 2 - (y - CAMERA.y) * scale,
          pointScale,
          visible: depth > 0.1,
        };
      };

      // Each point wobbles around its base position and shifts with the pointer.
      for (let i = 0; i < COUNT; i++) {
        const k = i * 3;
        const bx = base[k],
          by = base[k + 1],
          bz = base[k + 2];
        const breathe = 1 + 0.04 * Math.sin(0.8 * t + i);
        positions[k] =
          (bx + 0.12 * Math.sin(0.55 * t + by) + 0.35 * mx) * breathe;
        positions[k + 1] =
          (by + 0.12 * Math.cos(0.45 * t + bx) + 0.28 * my) * breathe;
        positions[k + 2] = bz + 0.1 * Math.sin(0.35 * t + bx + by);
      }
      const projected = Array.from({ length: COUNT }, (_, i) =>
        project([positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]),
      );

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1 / dpr;

      for (const ring of rings) {
        ctx.strokeStyle = `rgba(${ring.color}, ${ring.opacity})`;
        ctx.beginPath();
        ring.points.forEach((p, i) => {
          const s = project(p);
          if (i === 0) ctx.moveTo(s.x, s.y);
          else ctx.lineTo(s.x, s.y);
        });
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(182, 199, 170, 0.4)';
      ctx.beginPath();
      let links = 0;
      outer: for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          if (links >= MAX_LINKS) break outer;
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < LINK_DIST_SQ) {
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            links++;
          }
        }
      }
      ctx.stroke();

      // Square points with distance attenuation, plus a faint larger halo.
      for (let i = 0; i < COUNT; i++) {
        const p = projected[i];
        if (!p.visible) continue;
        const halo = 0.18 * p.pointScale;
        ctx.fillStyle = 'rgba(182, 199, 170, 0.16)';
        ctx.fillRect(p.x - halo / 2, p.y - halo / 2, halo, halo);
        const size = 0.08 * p.pointScale;
        ctx.fillStyle = `rgba(${colors[i]}, 0.78)`;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }

      frame = requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => (scrollY = window.scrollY);

    resize();
    frame = requestAnimationFrame(render);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
