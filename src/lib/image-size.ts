import fs from 'node:fs';
import path from 'node:path';

/**
 * public/ 配下の JPEG / PNG の縦横サイズを読み取る（ビルド時・サーバー側のみ）。
 * ニュースのアイキャッチが縦長ポスターかどうかを判定し、切り取らずに表示するために使う。
 * SVG や読み取れない形式は undefined を返す。
 */
export const readImageSize = (
  publicPath: string,
): { width: number; height: number } | undefined => {
  const file = path.join(process.cwd(), 'public', publicPath);
  if (!fs.existsSync(file)) return undefined;
  const buf = fs.readFileSync(file);

  // PNG: IHDR チャンクに幅・高さ
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: SOF マーカーを探す
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      const isSof =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc;
      if (isSof) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }

  return undefined;
};
