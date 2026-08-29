from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "public" / "images" / "holylens"
NAMES = [
    "product-miniscope-1",
    "product-miniscope-pro",
    "product-starscope-1",
    "product-turgoscope-1",
    "product-minivision-1",
]
SOLID_NAMES = [f"{name}-solid" for name in NAMES]
CANVAS = (1800, 660)


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    scale = max(size[0] / image.width, size[1] / image.height)
    resized = image.resize(
        (round(image.width * scale), round(image.height * scale)),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - size[0]) // 2
    top = (resized.height - size[1]) // 2
    return resized.crop((left, top, left + size[0], top + size[1]))


def prepare(source: Path, destination: Path, solid: bool = False) -> None:
    image = Image.open(source).convert("RGB")

    if solid:
        background = Image.new("RGB", CANVAS, (242, 245, 249))
    else:
        background = cover(image, CANVAS).filter(ImageFilter.GaussianBlur(55))
        background = ImageEnhance.Contrast(background).enhance(0.35)
        white = Image.new("RGB", CANVAS, (244, 248, 253))
        background = Image.blend(background, white, 0.72)

    height = CANVAS[1]
    width = round(image.width * height / image.height)
    foreground = image.resize((width, height), Image.Resampling.LANCZOS)
    mask = Image.new("L", (width, height), 255)
    fade = 110
    pixels = mask.load()
    for x in range(fade):
        alpha = round(255 * x / fade)
        for y in range(height):
            pixels[x, y] = alpha
            pixels[width - 1 - x, y] = alpha

    left = (CANVAS[0] - width) // 2
    background.paste(foreground, (left, 0), mask)
    background.save(destination, optimize=True)


for name in NAMES:
    prepare(IMAGE_DIR / f"{name}.png", IMAGE_DIR / f"{name}-wide.png")

for name in SOLID_NAMES:
    prepare(IMAGE_DIR / f"{name}.png", IMAGE_DIR / f"{name}-wide.png", solid=True)
