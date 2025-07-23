import { CommentBlock } from './types';

export function parseComments(code: string): CommentBlock[] {
  const comments: CommentBlock[] = [];
  const lineRegex = /\/\/(.*)/g;
  const blockRegex = /\/\*([\s\S]*?)\*\//g;
  let match;

  // Line comments
  while ((match = lineRegex.exec(code)) !== null) {
    comments.push({
      value: match[1].trim(),
      type: 'line',
      start: match.index,
      end: match.index + match[0].length
    });
  }
  // Block (includes JSDoc)
  while ((match = blockRegex.exec(code)) !== null) {
    const isJsDoc = match[0].startsWith('/**');
    comments.push({
      value: match[1].trim(),
      type: isJsDoc ? 'jsdoc' : 'block',
      start: match.index,
      end: match.index + match[0].length
    });
  }
  return comments;
}
