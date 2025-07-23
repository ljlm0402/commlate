// npm install node-fetch
import fetch from 'node-fetch';

export async function translate(text: string, from: string, to: string): Promise<string> {
  // (참고: 구글 비공식 API, 일일 제한/변동 가능)
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  const json = await res.json();
  // 구조: [[[번역,원문,기타정보]],...]
  return json[0].map((t: any) => t[0]).join('');
}
