#!/usr/bin/env python3
"""Pack public/models/eternal-logo-3d.obj into the compact binary format
read by components/Logo3D.tsx (parseBin).

Layout (little-endian unless noted):
  "ELG1" magic (big-endian uint32 when read back)
  uint32 vertexCount V, uint32 indexCount I
  float32 posMin[3], float32 posScale[3]
  uint16 quantized positions [V*3]
  int8 normals [V*3]
  zero padding to a 4-byte boundary
  uint16 indices [I] when V <= 65535, else uint32

Run from the repo root:  python3 scripts/pack-logo.py
"""

import gzip
import struct

SRC = "public/models/eternal-logo-3d.obj"
DST = "public/models/eternal-logo-3d.bin"

vs, ns, faces = [], [], []
for line in open(SRC):
    if line.startswith("v "):
        p = line.split()
        vs.append((float(p[1]), float(p[2]), float(p[3])))
    elif line.startswith("vn "):
        p = line.split()
        ns.append((float(p[1]), float(p[2]), float(p[3])))
    elif line.startswith("f "):
        parsed = []
        for t in line.split()[1:]:
            parts = t.split("/")
            vi = int(parts[0]) - 1
            ni = int(parts[2]) - 1 if len(parts) > 2 and parts[2] else -1
            parsed.append((vi, ni))
        for i in range(1, len(parsed) - 1):
            faces.append((parsed[0], parsed[i], parsed[i + 1]))

vmap, verts, idx = {}, [], []
for tri in faces:
    for corner in tri:
        if corner not in vmap:
            vmap[corner] = len(verts)
            verts.append(corner)
        idx.append(vmap[corner])

V, I = len(verts), len(idx)
mins = [min(vs[vi][k] for vi, _ in verts) for k in range(3)]
maxs = [max(vs[vi][k] for vi, _ in verts) for k in range(3)]
scale = [(maxs[k] - mins[k]) or 1.0 for k in range(3)]

buf = bytearray()
buf += b"ELG1"
buf += struct.pack("<II", V, I)
buf += struct.pack("<6f", *mins, *scale)
for vi, _ in verts:
    buf += struct.pack(
        "<3H", *[round((vs[vi][k] - mins[k]) / scale[k] * 65535) for k in range(3)]
    )
for _, ni in verts:
    n = ns[ni] if ni >= 0 else (0.0, 0.0, 1.0)
    buf += struct.pack("<3b", *[max(-127, min(127, round(c * 127))) for c in n])
while len(buf) % 4:
    buf += b"\0"
fmt = "<H" if V <= 65535 else "<I"
for i in idx:
    buf += struct.pack(fmt, i)

open(DST, "wb").write(bytes(buf))
print(f"verts {V}, tris {len(faces)}, raw {len(buf)}B, "
      f"gzip {len(gzip.compress(bytes(buf), 9))}B")
