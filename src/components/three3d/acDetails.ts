import * as THREE from 'three';

/**
 * Extra, detailed parts for the 3D AC: remaining indoor-unit components, the complete outdoor unit,
 * the electrical wiring harness, refrigerant pipes and drain hose.
 * Every part is registered with a base position and an "explode" offset, so the single `exp`
 * value (0..1) used by the main scene moves all of them. Wires are tubes rebuilt while moving,
 * so they stay attached to the parts they connect.
 */

export const OUTDOOR_X = 9;

export interface DetailRefs {
  frontCover: THREE.Object3D;
  pcb: THREE.Object3D;
  evaporator: THREE.Object3D;
  louver: THREE.Object3D;
  materials: {
    copper: THREE.Material;
    aluminum: THREE.Material;
    chip: THREE.Material;
    pcbSubstrate: THREE.Material;
    goldPin: THREE.Material;
    dark: THREE.Material;
  };
}

export interface ACDetails {
  /** key -> object whose screen position is used for the floating label */
  labelAnchors: Record<string, THREE.Object3D>;
  update: (exp: number, delta: number, fanSpeed: number) => void;
  setWiresVisible: (visible: boolean) => void;
  dispose: () => void;
}

interface Ref {
  obj: THREE.Object3D;
  local: THREE.Vector3;
}

interface Wire {
  mesh: THREE.Mesh;
  a: Ref;
  b: Ref;
  radius: number;
  sag: number;
  bow: number;
  anchor?: THREE.Object3D;
}

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

export function buildACDetails(root: THREE.Group, refs: DetailRefs): ACDetails {
  const detailsRoot = new THREE.Group();
  root.add(detailsRoot);
  const wireGroup = new THREE.Group();
  detailsRoot.add(wireGroup);

  const labelAnchors: Record<string, THREE.Object3D> = {};
  const parts: Array<{ group: THREE.Object3D; base: THREE.Vector3; offset: THREE.Vector3 }> = [];
  const wires: Wire[] = [];
  const m = refs.materials;

  const std = (color: number, metalness = 0.3, roughness = 0.5, extra: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra });

  const addPart = (key: string, group: THREE.Object3D, base: THREE.Vector3, offset: THREE.Vector3) => {
    group.position.copy(base);
    detailsRoot.add(group);
    parts.push({ group, base, offset });
    labelAnchors[key] = group;
    return group;
  };

  // ---------- INDOOR UNIT: remaining parts ----------

  // Air filters (two mesh panels, sit behind the front panel)
  const filters = new THREE.Group();
  const filterMat = std(0x67e8f9, 0.1, 0.6, { transparent: true, opacity: 0.55 });
  [-1.0, 1.0].forEach((x) => {
    const f = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.8, 0.03), filterMat);
    f.position.set(x, 0, 0);
    filters.add(f);
    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.9, 0.8, 0.03)),
      new THREE.LineBasicMaterial({ color: 0x0e7490 })
    );
    frame.position.set(x, 0, 0);
    filters.add(frame);
  });
  addPart('filters', filters, v(0, 0.3, 0.43), v(0, 2.6, 2.0));

  // Drain pan (collects condensate under the coil)
  const drainPan = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.05, 0.5), std(0xe2e8f0, 0.1, 0.5));
  addPart('drainPan', drainPan, v(0, -0.82, 0.05), v(0.4, -3.0, 0.4));

  // Indoor blower (fan) motor with copper winding
  const fanMotor = new THREE.Group();
  const motorBody = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.4, 20), std(0x334155, 0.7, 0.35));
  motorBody.rotation.z = Math.PI / 2;
  fanMotor.add(motorBody);
  const winding = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 20), m.copper);
  winding.rotation.z = Math.PI / 2;
  fanMotor.add(winding);
  addPart('fanMotor', fanMotor, v(1.95, -0.35, -0.05), v(3.4, -2.0, 0.9));

  // Louver swing (stepper) motor
  const swingMotor = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), std(0x0ea5e9, 0.5, 0.35));
  addPart('swingMotor', swingMotor, v(2.12, -0.55, 0.35), v(3.2, -2.4, 2.2));

  // Temperature sensors (thermistors on the coil)
  const sensors = new THREE.Group();
  [0, 0.28].forEach((dx) => {
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), std(0x111827, 0.4, 0.4));
    bead.position.set(dx, 0, 0);
    sensors.add(bead);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.22, 8), m.aluminum);
    stem.position.set(dx, -0.12, 0);
    sensors.add(stem);
  });
  addPart('sensors', sensors, v(-1.4, 0.35, 0.25), v(-2.6, 1.6, 1.4));

  // Terminal block (power & inter-unit cable connection)
  const terminal = new THREE.Group();
  terminal.add(new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.12, 0.2), std(0xf8fafc, 0.1, 0.5)));
  for (let i = 0; i < 4; i++) {
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.05, 10), m.goldPin);
    screw.position.set(-0.2 + i * 0.13, 0.08, 0);
    terminal.add(screw);
  }
  addPart('terminal', terminal, v(1.45, 0.55, -0.1), v(2.4, 2.6, -1.0));

  // ---------- OUTDOOR UNIT ----------
  const OX = OUTDOOR_X;

  // Outer casing (x-ray style: transparent with cyan edges)
  const casing = new THREE.Group();
  casing.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(2.7, 2.1, 1.5),
      std(0x94a3b8, 0.4, 0.4, { transparent: true, opacity: 0.12, depthWrite: false })
    )
  );
  casing.add(
    new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.7, 2.1, 1.5)),
      new THREE.LineBasicMaterial({ color: 0x22d3ee })
    )
  );
  addPart('odCasing', casing, v(OX, 0, 0), v(0, 3.4, -1.6));

  // Condenser coil: aluminium fins + copper tube rows
  const condenser = new THREE.Group();
  condenser.add(new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.7, 0.16), m.aluminum));
  for (let i = 0; i < 8; i++) {
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.35, 10), m.copper);
    tube.rotation.z = Math.PI / 2;
    tube.position.set(0, -0.75 + i * 0.215, 0.1);
    condenser.add(tube);
  }
  addPart('odCondenser', condenser, v(OX, 0, -0.55), v(0, 0.3, -2.6));

  // Outdoor fan (spins) inside a shroud ring
  const odFan = new THREE.Group();
  const fanPivot = new THREE.Group();
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16), m.dark);
  hub.rotation.x = Math.PI / 2;
  fanPivot.add(hub);
  for (let i = 0; i < 5; i++) {
    const pivot = new THREE.Object3D();
    pivot.rotation.z = (i / 5) * Math.PI * 2;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.015), m.dark);
    blade.position.x = 0.33;
    blade.rotation.x = 0.55;
    pivot.add(blade);
    fanPivot.add(pivot);
  }
  odFan.add(fanPivot);
  odFan.add(new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.035, 8, 40), m.aluminum));
  addPart('odFan', odFan, v(OX, 0.05, 0.55), v(0, 0.2, 3.2));

  // Outdoor fan motor
  const odFanMotor = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.35, 20), std(0x334155, 0.7, 0.35));
  odFanMotor.rotation.x = Math.PI / 2;
  const odFanMotorGroup = new THREE.Group();
  odFanMotorGroup.add(odFanMotor);
  addPart('odFanMotor', odFanMotorGroup, v(OX, 0.05, 0.2), v(1.4, 1.5, 1.8));

  // Compressor (dark vertical cylinder with terminal cap)
  const compressor = new THREE.Group();
  const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.85, 28), std(0x0f3d3e, 0.75, 0.3));
  compressor.add(shell);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.12, 16), std(0x111827, 0.5, 0.4));
  cap.position.y = 0.48;
  compressor.add(cap);
  addPart('compressor', compressor, v(OX - 0.45, -0.55, -0.1), v(-1.5, -1.7, 1.3));

  // Outdoor control board
  const odBoard = new THREE.Group();
  odBoard.add(new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.7, 0.04), m.pcbSubstrate));
  const odChip = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.07), m.chip);
  odChip.position.set(-0.1, 0.05, 0.05);
  odBoard.add(odChip);
  const odSink = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.12), m.aluminum);
  odSink.position.set(0.25, 0.18, 0.07);
  odBoard.add(odSink);
  addPart('odBoard', odBoard, v(OX + 0.85, 0.55, 0.05), v(2.7, 1.7, -0.2));

  // Run capacitor
  const capacitor = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.32, 18), std(0x1e3a8a, 0.7, 0.3));
  addPart('capacitor', capacitor, v(OX + 0.9, -0.4, 0.15), v(3.0, -0.3, 0.9));

  // Service valves (gas = larger, liquid = smaller)
  const valves = new THREE.Group();
  const brass = std(0xb8860b, 0.9, 0.25);
  const gasValve = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.3, 14), brass);
  gasValve.rotation.z = Math.PI / 2;
  gasValve.position.set(0, 0, 0);
  valves.add(gasValve);
  const liquidValve = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.3, 14), brass);
  liquidValve.rotation.z = Math.PI / 2;
  liquidValve.position.set(0, -0.2, 0);
  valves.add(liquidValve);
  addPart('valves', valves, v(OX - 1.0, -0.85, 0.35), v(-2.4, -1.6, 1.0));

  // Fixed end point for the drain hose (outside, never explodes)
  const drainEnd = new THREE.Object3D();
  drainEnd.position.set(5.4, -2.4, 1.0);
  detailsRoot.add(drainEnd);

  // ---------- WIRES, PIPES, HOSE ----------
  const wireMat = (color: number) => std(color, 0.2, 0.5);
  const addWire = (
    color: number,
    radius: number,
    a: Ref,
    b: Ref,
    opts: { sag?: number; bow?: number; labelKey?: string; material?: THREE.Material } = {}
  ) => {
    const mesh = new THREE.Mesh(new THREE.BufferGeometry(), opts.material || wireMat(color));
    mesh.castShadow = false;
    wireGroup.add(mesh);
    const wire: Wire = { mesh, a, b, radius, sag: opts.sag ?? 0.35, bow: opts.bow ?? 0.15 };
    if (opts.labelKey) {
      const anchor = new THREE.Object3D();
      detailsRoot.add(anchor);
      wire.anchor = anchor;
      labelAnchors[opts.labelKey] = anchor;
    }
    wires.push(wire);
    return wire;
  };
  const R = (obj: THREE.Object3D, x = 0, y = 0, z = 0): Ref => ({ obj, local: v(x, y, z) });

  // Indoor harness (from the indoor PCB)
  addWire(0x2563eb, 0.022, R(refs.pcb, 0.06, -0.15, 0), R(fanMotor, 0, 0, 0), { labelKey: 'harness', sag: 0.5 });
  addWire(0xfacc15, 0.02, R(refs.pcb, 0.06, -0.05, 0.1), R(swingMotor, 0, 0, 0), { sag: 0.45 });
  addWire(0x22c55e, 0.018, R(refs.pcb, 0.06, 0.1, -0.1), R(sensors, 0, 0, 0), { sag: 0.6, bow: 0.3 });
  addWire(0xf8fafc, 0.018, R(refs.pcb, 0.06, 0.25, 0.1), R(refs.frontCover, 1.2, 0.15, 0.46), { sag: 0.4 });
  addWire(0xef4444, 0.026, R(terminal, 0, 0.08, 0), R(refs.pcb, 0.06, 0.3, 0), { sag: 0.25 });

  // Inter-unit cable (3 strands: live, signal, earth)
  const interconnect: Array<[number, number]> = [
    [0xef4444, 0],
    [0x3b82f6, 0.05],
    [0x84cc16, 0.1],
  ];
  interconnect.forEach(([color, dy], i) => {
    addWire(color, 0.026, R(terminal, -0.2 + i * 0.13, 0.08, 0.02), R(odBoard, -0.3 + i * 0.12, -0.3 - dy, 0.04), {
      sag: 1.6,
      bow: 0.4,
      labelKey: i === 1 ? 'interconnect' : undefined,
    });
  });

  // Outdoor wiring
  const compColors = [0xef4444, 0xfacc15, 0x3b82f6];
  compColors.forEach((color, i) => {
    addWire(color, 0.03, R(odBoard, -0.35 + i * 0.1, -0.3, 0.04), R(compressor, -0.06 + i * 0.06, 0.52, 0), {
      sag: 0.3,
      labelKey: i === 1 ? 'compWires' : undefined,
    });
  });
  addWire(0xf8fafc, 0.02, R(odBoard, 0.3, -0.1, 0.04), R(odFanMotorGroup, 0, 0, 0), { sag: 0.4 });
  addWire(0xf97316, 0.02, R(capacitor, 0, 0.17, 0), R(odFanMotorGroup, 0.1, 0, 0), { sag: 0.35 });

  // Refrigerant pipes: gas (insulated, thick) and liquid (bare copper, thin)
  const foam = std(0x1f2937, 0.1, 0.9);
  addWire(0, 0.085, R(refs.evaporator, 1.82, -0.18, 0), R(valves, 0.15, 0, 0), {
    material: foam,
    sag: 1.4,
    bow: -0.25,
    labelKey: 'pipes',
  });
  addWire(0, 0.04, R(refs.evaporator, 1.82, -0.28, 0), R(valves, 0.15, -0.2, 0), {
    material: m.copper,
    sag: 1.7,
    bow: -0.15,
  });
  addWire(0, 0.035, R(valves, -0.15, 0, 0), R(compressor, 0, 0.45, 0.1), { material: m.copper, sag: 0.2 });
  addWire(0, 0.035, R(compressor, 0.1, 0.4, 0.1), R(condenser, 0.9, 0.5, 0.1), { material: m.copper, sag: 0.25 });
  addWire(0, 0.03, R(condenser, -0.9, -0.6, 0.1), R(valves, -0.15, -0.2, 0), { material: m.copper, sag: 0.3 });

  // Drain hose (light blue, from the drain pan to outside)
  addWire(0, 0.06, R(drainPan, 1.8, 0, 0.1), R(drainEnd), {
    material: std(0x7dd3fc, 0.1, 0.4, { transparent: true, opacity: 0.85 }),
    sag: 0.5,
    bow: 0.3,
    labelKey: 'drain',
  });

  // ---------- Update logic ----------
  const A = new THREE.Vector3();
  const B = new THREE.Vector3();
  const ctrl = new THREE.Vector3();
  let lastExp = -1;

  const resolve = (ref: Ref, out: THREE.Vector3) => {
    out.copy(ref.local);
    ref.obj.localToWorld(out);
    root.worldToLocal(out);
    return out;
  };

  const rebuildWires = () => {
    wires.forEach((w) => {
      resolve(w.a, A);
      resolve(w.b, B);
      ctrl.copy(A).add(B).multiplyScalar(0.5);
      ctrl.y -= w.sag;
      ctrl.z += w.bow;
      const curve = new THREE.QuadraticBezierCurve3(A.clone(), ctrl.clone(), B.clone());
      w.mesh.geometry.dispose();
      w.mesh.geometry = new THREE.TubeGeometry(curve, 28, w.radius, 6, false);
      if (w.anchor) curve.getPoint(0.5, w.anchor.position);
    });
  };

  return {
    labelAnchors,
    update(exp, delta, fanSpeed) {
      parts.forEach((p) => {
        p.group.position.set(
          p.base.x + p.offset.x * exp,
          p.base.y + p.offset.y * exp,
          p.base.z + p.offset.z * exp
        );
      });
      fanPivot.rotation.z -= fanSpeed * 0.8 * delta;
      if (lastExp < 0 || Math.abs(exp - lastExp) > 0.0015) {
        lastExp = exp;
        rebuildWires();
      }
    },
    setWiresVisible(visible) {
      wireGroup.visible = visible;
    },
    dispose() {
      detailsRoot.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else if (mat) mat.dispose();
      });
      root.remove(detailsRoot);
    },
  };
}
