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

# A corner that opens completely makes the stamp read as a broken box at 1x, so
# dropout is suppressed in a narrow band along the border's own edges: the
# interior of the stroke keeps its worn, uneven texture and the frame's corners
# always close. `band` is 1 inside and immediately around the ring, 0 deep in
# the open middle.
band = np.asarray(
    Image.fromarray((ring * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(3.0))
).astype(np.float32) / 255.0
band = np.clip(band * 1.6, 0.0, 1.0)

# ---- 3. the first impression ---------------------------------------------
# Two separate concerns a clean outline cannot express:
#   * edge integrity  — where the stroke is broken by worn rubber
#   * ink density     — how heavily the stroke prints where it does print
# At 1x a broken corner reads as a broken box, so edge breaks are suppressed in
# the narrow band along the frame and allowed only in the interior; the ink
# density still swings across the whole stroke, which is what carries the
# impression at small sizes.
density_field = 0.30 + 0.44 * blotch + 0.20 * grain
density_field = np.clip(density_field * (1.0 - dropout * 0.55), 0.0, 1.0)
# Along the frame's own run the printed edge is never allowed to fall below a
# floor, so no corner can open at 1x. The blotching above still varies the ink
# across that edge; only the collapse is forbidden.
density_field = np.maximum(density_field, band * 0.80)

ink = ring * density_field

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

# ---- 5. map to alpha -----------------------------------------------------
# A NOTE ON SCALE, measured rather than assumed. At the sizes this stamp ships
# (a 29px-tall element), one mask pixel is about a fifth of a device pixel, so a
# hole in the *frame* does not read as worn rubber — it reads as a broken box.
# Real stamps at that size show uneven ink DENSITY, not gaps. So the frame's run
# is kept closed and its ink is varied instead: opacity swings across the stroke
# between roughly 0.68 and 0.94, which is what prints as a hand-pressed
# impression at small sizes. The blotching, the rock's offset second pass and
# the speckle all still ride on top of it.
band_core = np.asarray(
    Image.fromarray((ring * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(4.0))
).astype(np.float32) / 255.0
band_core = np.clip(band_core * 2.2, 0.0, 1.0)

# ink weight along the stroke: heavy where the hand pressed, light where it lifted
ink_weight = 0.55 + 0.45 * np.clip(0.55 * blotch + 0.45 * grain, 0.0, 1.0)

alpha_open = np.clip((double - 0.16) / 0.34, 0.0, 1.0)
alpha_open = np.asarray(
    Image.fromarray((alpha_open * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(0.6))
).astype(np.float32) / 255.0
alpha_open = np.clip((alpha_open - 0.30) / 0.62, 0.0, 0.94)

# the frame's own run takes the guaranteed floor, carrying ink weight rather than gaps
alpha = np.maximum(alpha_open, band_core * ink_weight)
alpha = np.clip(alpha, 0.0, 0.94)

# speckle: dust and paper tooth catching the ink
speck = rng.random((H, W)).astype(np.float32)
alpha = np.where((ring > 0.5) & (speck > 0.94) & (alpha < 0.5), 0.28, alpha)

# the impression exists only on the ring; the blur above must not leak it inward
alpha = alpha * (ring > 0.5)

cov = float((alpha > 0.5).sum()) / max(1, int((ring > 0.5).sum()))
ink_lo = float(np.percentile(alpha[ring > 0.5], 2))
ink_hi = float(np.percentile(alpha[ring > 0.5], 98))
print(f"impression mask {W}x{H}")
print(f"  frame coverage      = {cov:.3f}   (1.0 would be a clean, unbroken outline)")
print(f"  ink density on frame = {ink_lo:.2f} .. {ink_hi:.2f}   (unevenness, not gaps)")

# verification: no window along the frame may lose more than a quarter of its run
worst = 1.0
for x0 in range(0, W - 24, 8):
    for y0, y1 in ((0, 14), (H - 14, H)):
        win, r = alpha[y0:y1, x0:x0 + 24], ring[y0:y1, x0:x0 + 24]
        if (r > 0.5).sum() > 40:
            worst = min(worst, float((win > 0.5).sum()) / float((r > 0.5).sum()))
for y0 in range(0, H - 24, 8):
    for x0, x1 in ((0, 14), (W - 14, W)):
        win, r = alpha[y0:y0 + 24, x0:x1], ring[y0:y0 + 24, x0:x1]
        if (r > 0.5).sum() > 40:
            worst = min(worst, float((win > 0.5).sum()) / float((r > 0.5).sum()))
print(f"  thinnest 24px window on frame = {worst:.2f}   (must be >= 0.75)")

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
