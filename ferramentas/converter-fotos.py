#!/usr/bin/env python3
"""
Converte fotos para o formato usado no site.

Aceita AVIF, HEIC/HEIF (fotos de iPhone), PNG, WEBP, TIFF e JPG, e gera
JPG otimizado, já redimensionado e com a orientação corrigida.

Uso:
    python3 ferramentas/converter-fotos.py <origem> [destino]

    <origem>   arquivo ou pasta com as fotos
    [destino]  pasta de saída (padrão: assets/img)

Exemplos:
    python3 ferramentas/converter-fotos.py assets/img
    python3 ferramentas/converter-fotos.py ~/fotos-chale assets/img

Se faltar suporte a HEIC, instale:  pip install pillow-heif
"""

import sys
import unicodedata
from pathlib import Path

from PIL import Image, ImageOps

try:  # fotos de iPhone
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:
    pass

ENTRADAS = {".avif", ".heic", ".heif", ".png", ".webp", ".tif", ".tiff", ".jpg", ".jpeg"}
LADO_MAIOR = 1600
QUALIDADE = 84


def nome_limpo(nome: str) -> str:
    """cha-lé Fachada.AVIF -> chale-fachada"""
    base = unicodedata.normalize("NFKD", Path(nome).stem)
    base = base.encode("ascii", "ignore").decode().lower()
    return "-".join("".join(c if c.isalnum() else " " for c in base).split())


def converter(origem: Path, destino: Path) -> bool:
    try:
        im = Image.open(origem)
    except Exception as erro:
        print(f"  ! {origem.name}: não consegui abrir ({erro})")
        return False

    # celulares gravam a orientação nos metadados em vez de girar o pixel
    im = ImageOps.exif_transpose(im)

    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")

    antes = im.size
    if max(im.size) > LADO_MAIOR:
        im.thumbnail((LADO_MAIOR, LADO_MAIOR), Image.LANCZOS)

    saida = destino / f"{nome_limpo(origem.name)}.jpg"
    im.save(saida, "JPEG", quality=QUALIDADE, optimize=True, progressive=True)

    kb = saida.stat().st_size / 1024
    print(f"  {origem.name}  ->  {saida.name}   {antes[0]}x{antes[1]} → {im.size[0]}x{im.size[1]}, {kb:.0f} KB")
    return True


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 1

    origem = Path(sys.argv[1])
    destino = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("assets/img")
    destino.mkdir(parents=True, exist_ok=True)

    if origem.is_file():
        arquivos = [origem]
    else:
        arquivos = sorted(p for p in origem.iterdir() if p.suffix.lower() in ENTRADAS)

    # um JPG já pequeno e já na pasta de destino não precisa ser reprocessado
    arquivos = [
        p for p in arquivos
        if not (p.suffix.lower() in {".jpg", ".jpeg"}
                and p.parent.resolve() == destino.resolve()
                and max(Image.open(p).size) <= LADO_MAIOR)
    ]

    if not arquivos:
        print("Nada para converter.")
        return 0

    print(f"Convertendo {len(arquivos)} arquivo(s) para {destino}/\n")
    convertidos = sum(converter(p, destino) for p in arquivos)
    print(f"\n{convertidos} de {len(arquivos)} convertido(s).")
    return 0 if convertidos == len(arquivos) else 1


if __name__ == "__main__":
    raise SystemExit(main())
