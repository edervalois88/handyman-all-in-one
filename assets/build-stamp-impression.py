"""Author the rubber-stamp impression mask.

A real rubber stamp never prints a uniform outline: ink density varies with
pressure, the border nibbles and drops out where the rubber is worn, and a
faint doubling shows where the hand rocked. This generates that impression as a
greyscale alpha mask, which the stylesheet applies with `mask-image` over a
bordered box — so the stamp keeps its exact geometry and type colour while its
border carries genuine uneven ink instead of a clean vector outline.

Deterministic: fixed seed, so the asset is reproducible.
"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np, os

OUT = r"C:\Users\EderV\handyman\handyman-site\public\brand"
os.makedirs(OUT, exist_ok=True)

W, H = 512, 224
BW = 7          # border weight in px at this resolution
R = 14          # corner radius
SEED = 8081

rng = np.random.default_rng(SEED)

# ---- 1. base geometry: a rounded-rect ring, drawn solid -------------------
base = Image.new("L", (W, H), 0)
d = ImageDraw.Draw(base)
d.rounded_rectangle([BW // 2, BW // 2, W - 1 - BW // 2, H - 1 - BW // 2],
                    radius=R, outline=255, width=BW)
ring = np.asarray(base).astype(np.float32) / 255.0

# ---- 2. ink density: broad low-frequency blotches + fine grain -----------
def value_noise(shape, cells, seed):
    """Smooth noise via bilinear upsampling of a small random lattice."""
    h, w = shape
    g = np.random.default_rng(seed)
    small = g.random((max(2, cells), max(2, cells))).astype(np.float32)
    im = Image.fromarray((small * 255).astype(np.uint8), "L")
    im = im.resize((w, h), Image.BICUBIC)
    return np.asarray(im).astype(np.float32) / 255.0

blotch = value_noise((H, W), 9, SEED + 1)
grain = value_noise((H, W), 90, SEED + 2)

# pressure map: ink density swings widely across the border, the way real
# rubber prints — heavy where the hand pressed, thin where it barely touched
density = 0.40 + 0.42 * blotch + 0.20 * grain
density = np.clip(density, 0.0, 1.0)

# worn patches where the rubber has flattened out and stops printing at all
worn = value_noise((H, W), 6, SEED + 3)
dropout = np.clip((worn - 0.50) / 0.38, 0.0, 1.0) * 0.95

# ---- 3. the first impression ---------------------------------------------
ink = ring * density * (1.0 - dropout)

# ---- 4. the second impression, offset: the hand rocked -------------------
def shift(a, dx, dy):
    out = np.zeros_like(a)
    ys0, ys1 = max(0, dy), min(H, H + dy)
    xs0, xs1 = max(0, dx), min(W, W + dx)
    out[ys0:ys1, xs0:xs1] = a[ys0 - dy:ys1 - dy, xs0 - dx:xs1 - dx]
    return out

# the rock only ever adds ink where the first pass was thin, never fills a dropout
rock = shift(ink, 3, 2)
double = np.maximum(ink, rock * 0.55) * (1.0 - dropout)

# ---- 5. map to alpha: airy, never a solid fill --------------------------
alpha = np.clip((double - 0.16) / 0.34, 0.0, 1.0)
alpha = np.asarray(
    Image.fromarray((alpha * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(0.6))
).astype(np.float32) / 255.0
# keep ink from ever reaching full opacity, so the border stays visibly printed
alpha = np.clip((alpha - 0.30) / 0.62, 0.0, 0.94) * (1.0 - dropout)

# speckle: dust and paper tooth catching the ink
speck = rng.random((H, W)).astype(np.float32)
alpha = np.where((ring > 0.5) & (speck > 0.94) & (alpha < 0.5), 0.28, alpha)

cov = float((alpha > 0.5).sum()) / max(1, int((ring > 0.5).sum()))
print(f"impression mask {W}x{H}  ring coverage = {cov:.3f}  (1.0 would be a clean outline)")

rgba = np.zeros((H, W, 4), dtype=np.uint8)
rgba[..., 0] = rgba[..., 1] = rgba[..., 2] = 255
rgba[..., 3] = (alpha * 255).astype(np.uint8)
Image.fromarray(rgba, "RGBA").save(os.path.join(OUT, "stamp-impression.png"))
print("  -> public/brand/stamp-impression.png")

# a quick visual: the mask over the brand red, which is how the page uses it
prev = Image.new("RGB", (W, H), (0xF4, 0xED, 0xDA))
prev.paste(Image.new("RGB", (W, H), (0xC7, 0x47, 0x32)), (0, 0),
           Image.fromarray((alpha * 255).astype(np.uint8), "L"))
prev.save(r"C:\Users\EderV\handyman\.impeccable\review\stamp-impression-preview.png")
print("  -> preview written")
