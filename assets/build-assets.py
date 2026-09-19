from PIL import Image, ImageFilter
import numpy as np, os

HI = r"C:\Users\EderV\handyman\_bb\hi"
PROJ = r"C:\Users\EderV\handyman\handyman-site"
PUB = os.path.join(PROJ, "public", "brand")
os.makedirs(PUB, exist_ok=True)

NAVY = (0x1D, 0x29, 0x45)
CREAM = (0xF4, 0xED, 0xDA)
RED = (0xC7, 0x47, 0x32)
GOLD = (0xD6, 0x9A, 0x3A)
SAGE = (0x8A, 0x9A, 0x83)


def mask_from(panel, ink_is_dark=True):
    """Return (alpha_float, rgb_ink) for a two-colour panel render."""
    a = np.asarray(Image.open(os.path.join(HI, panel + ".png")).convert("RGB")).astype(np.float32)
    lum = a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    # trim the outer 0.5% to avoid edge antialiasing from the PDF panel border
    h, w = lum.shape
    ty, tx = int(h * 0.004), int(w * 0.004)
    lum = lum[ty:h - ty, tx:w - tx]
    a = a[ty:h - ty, tx:w - tx]
    lo, hi = np.percentile(lum, 2), np.percentile(lum, 98)
    t = (lum - lo) / max(hi - lo, 1e-6)
    alpha = 1.0 - t if ink_is_dark else t
    alpha = np.clip((alpha - 0.5) * 1.6 + 0.5, 0, 1)  # harden the edge
    ink_lum = lum[alpha > 0.85]
    ink_rgb = a[alpha > 0.85].mean(axis=0) if ink_lum.size else np.array([0, 0, 0])
    return alpha, ink_rgb


def bbox_of(alpha, thr=0.25):
    ys, xs = np.where(alpha > thr)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def rows_profile(alpha, thr=0.25):
    return (alpha > thr).sum(axis=1)


def save_tinted(alpha, path, rgb, size=None):
    h, w = alpha.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[..., 0], rgba[..., 1], rgba[..., 2] = rgb
    rgba[..., 3] = (alpha * 255).round().astype(np.uint8)
    im = Image.fromarray(rgba, "RGBA")
    if size:
        im = im.resize(size, Image.LANCZOS)
    im.save(path)
    print("  ->", os.path.relpath(path, PROJ), im.size)


# ---------- 1. the walker MARK (navy on cream, full quality) ----------
alpha, ink_rgb = mask_from("cream_markonly", ink_is_dark=True)
print("mark ink rgb:", ink_rgb.round(1))
h, w = alpha.shape
prof = rows_profile(alpha)
rows = np.where(prof > 0)[0]
print("ink rows:", rows.min(), rows.max(), "of", h)

# Detect the gap between the figure and the wordmark below it (if present)
gaps, run = [], None
for y in range(rows.min(), rows.max() + 1):
    if prof[y] == 0:
        if run is None:
            run = y
    else:
        if run is not None:
            gaps.append((run, y - 1, y - run))
            run = None
print("horizontal gaps (start,end,len):", [g for g in gaps if g[2] > 8])

# Full panel = mark only (per colour analysis: 7.5% ink, no text row). Confirm width.
print("panel ink bbox:", bbox_of(alpha))

crop = alpha[rows.min():rows.max() + 1, :]
sub = bbox_of(crop)
mark = crop[:, sub[0]:sub[2]]
print("MARK bbox size:", mark.shape)

Image.fromarray((mark * 255).astype(np.uint8), "L").save(os.path.join(HI, "mask_mark.png"))
save_tinted(mark, os.path.join(PUB, "mark-navy.png"), NAVY)
save_tinted(mark, os.path.join(PUB, "mark-cream.png"), CREAM)
save_tinted(mark, os.path.join(PUB, "mark-red.png"), RED)
save_tinted(mark, os.path.join(PUB, "mark-gold.png"), GOLD)
save_tinted(mark, os.path.join(PUB, "mark-sage.png"), SAGE)

# ---------- 2. full LOCKUP from the sage panel (cream art on sage) ----------
al, ink2 = mask_from("sage_lockup", ink_is_dark=False)
print("lockup ink rgb:", ink2.round(1))
rows2 = np.where(rows_profile(al) > 0)[0]
sub2 = bbox_of(al)
lock = al[rows2.min():rows2.max() + 1, sub2[0]:sub2[2]]
print("LOCKUP size:", lock.shape)
Image.fromarray((lock * 255).astype(np.uint8), "L").save(os.path.join(HI, "mask_lockup.png"))

# Splitting the lockup: find the gap between figure and wordmark
prof2 = rows_profile(lock)
g2, run2 = [], None
for y in range(lock.shape[0]):
    if prof2[y] == 0:
        if run2 is None:
            run2 = y
    else:
        if run2 is not None:
            g2.append((run2, y - 1, y - run2))
            run2 = None
big_gaps = [g for g in g2 if g[2] > lock.shape[0] * 0.02]
print("lockup gaps:", big_gaps)

save_tinted(lock, os.path.join(PUB, "lockup-navy.png"), NAVY)
save_tinted(lock, os.path.join(PUB, "lockup-cream.png"), CREAM)
save_tinted(lock, os.path.join(PUB, "lockup-red.png"), RED)
save_tinted(lock, os.path.join(PUB, "lockup-gold.png"), GOLD)
save_tinted(lock, os.path.join(PUB, "lockup-sage.png"), SAGE)

# web-sized derivatives the header / favicon consume directly
save_tinted(mark, os.path.join(PUB, "mark-navy@160.png"), NAVY, size=(124, 160))
save_tinted(mark, os.path.join(PUB, "mark-cream@160.png"), CREAM, size=(124, 160))

# ---------- 3. small favicon / app icon: mark on navy tile ----------
for sz, nm in ((512, "icon-512.png"), (192, "icon-192.png"), (180, "apple-icon-180.png")):
    pad = int(sz * 0.16)
    tile = Image.new("RGBA", (sz, sz), NAVY + (255,))
    inner = sz - pad * 2
    mh, mw = mark.shape
    sc = min(inner / mw, inner / mh)
    mm = Image.fromarray((mark * 255).astype(np.uint8), "L").resize(
        (max(1, int(mw * sc)), max(1, int(mh * sc))), Image.LANCZOS)
    rgba = Image.new("RGBA", mm.size, CREAM + (0,))
    rgba.putalpha(mm)
    tile.alpha_composite(rgba, ((sz - mm.width) // 2, (sz - mm.height) // 2))
    tile.save(os.path.join(PUB, nm))
    print("  ->", nm, tile.size)

# ---------- 4. checkerboard tile (from the p3 mood board) ----------
CS = 24
chk = Image.new("RGB", (CS * 2, CS * 2), CREAM)
px = chk.load()
for y in range(CS * 2):
    for x in range(CS * 2):
        if (x // CS + y // CS) % 2 == 0:
            px[x, y] = NAVY
chk.save(os.path.join(PUB, "checker.png"))
print("  -> checker.png", chk.size)

print("\nDONE")
