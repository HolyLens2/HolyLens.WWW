from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "holylens"
NAMES = [
    "miniscope-pro",
    "starscope-1",
    "turgoscope-1",
    "minivision-1",
    "hearscope-1",
    "pressscope-1",
    "glucoscope-1",
    "cardioscope-1",
    "oxyscope-1",
]


for name in NAMES:
    source = ROOT / f"feature-{name}-alpha.png"
    target = ROOT / f"feature-{name}-transparent.png"
    image = Image.open(source).convert("RGBA")
    alpha = image.getchannel("A")
    bounds = alpha.point(lambda value: 255 if value > 8 else 0).getbbox()
    if not bounds:
        raise RuntimeError(f"No foreground detected for {name}")

    padding = 18
    left = max(0, bounds[0] - padding)
    top = max(0, bounds[1] - padding)
    right = min(image.width, bounds[2] + padding)
    bottom = min(image.height, bounds[3] + padding)
    image = image.crop((left, top, right, bottom))
    image.putalpha(image.getchannel("A").point(lambda value: 0 if value < 4 else value))
    image.save(target, optimize=True, compress_level=9)
    print(name, image.size, target.stat().st_size)


sheet = Image.new("RGB", (1500, 1000), "#eaf1fa")
for index, name in enumerate(NAMES):
    image = Image.open(ROOT / f"feature-{name}-transparent.png").convert("RGBA")
    image.thumbnail((260, 360), Image.Resampling.LANCZOS)
    column = index % 5
    row = index // 5
    x = column * 300 + (300 - image.width) // 2
    y = row * 500 + 48 + (360 - image.height) // 2
    sheet.paste(image, (x, y), image)
    sheet.paste(Image.new("RGB", (220, 2), "#2d9ed4"), (column * 300 + 40, row * 500 + 440))

qa_path = ROOT.parents[2] / "design-audit-current" / "product-transparent-contact-sheet.png"
qa_path.parent.mkdir(parents=True, exist_ok=True)
sheet.save(qa_path, optimize=True)
print("contact-sheet", qa_path)
