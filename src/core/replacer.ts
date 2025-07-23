import { CommentBlock } from './types';

export function replaceComments(
  code: string,
  comments: CommentBlock[],
  translated: string[]
): string {
  let offset = 0;
  let result = code;
  comments.forEach((comment, idx) => {
    const before = result.slice(0, comment.start + offset);
    const after = result.slice(comment.end + offset);
    let commentStr = '';
    if (comment.type === 'line') commentStr = `// ${translated[idx]}`;
    else if (comment.type === 'block') commentStr = `/* ${translated[idx]} */`;
    else commentStr = `/** ${translated[idx]} */`;
    result = before + commentStr + after;
    // 업데이트된 코드 길이에 따라 offset 조정
    offset += commentStr.length - (comment.end - comment.start);
  });
  return result;
}
