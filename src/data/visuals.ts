/**
 * イメージイラストの「見せたい位置」。
 *
 * public/images/visual/ と hero-main.jpg はすべて 1672×941（16:9）の横長です。
 * これを正方形や縦長の枠に入れると中央が切り取られ、人物が画面から外れてしまうため、
 * 画像ごとに object-position を指定します。
 *
 * 値は CSS の object-position と同じ書式（左からの割合 上からの割合）。
 * 新しいイラストを追加したら、人物が写っている位置をここに登録してください。
 */
const VISUAL_FOCUS: Record<string, string> = {
  '/images/hero/hero-main.jpg': '70% 50%',
  '/images/visual/counter-neon.jpg': '22% 45%',
  '/images/visual/interior-cafe.jpg': '20% 45%',
  '/images/visual/counter-day.jpg': '68% 40%',
  '/images/visual/bar-drink.jpg': '72% 40%',
  '/images/visual/food-tray.jpg': '76% 45%',
  '/images/visual/welcome.jpg': '66% 40%',
  '/images/visual/cast-group.jpg': '72% 45%',
  '/images/visual/duo.jpg': '70% 40%',
  '/images/visual/night-window.jpg': '72% 40%',
};

/** 画像のパスから object-position を取得（未登録なら中央） */
export const focusOf = (src: string): string => VISUAL_FOCUS[src] ?? 'center';

/** 16:9 のイメージイラストかどうか */
export const isWideVisual = (src: string): boolean =>
  src.startsWith('/images/visual/') || src === '/images/hero/hero-main.jpg';
