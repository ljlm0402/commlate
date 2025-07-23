#!/usr/bin/env node
import { readFile, writeFile } from '../utils/file';
import { parseComments } from '../core/parser';
import { translate } from '../core/translator';
import { replaceComments } from '../core/replacer';

const [, , inputFile, from = 'ko', to = 'en'] = process.argv;

async function main() {
  if (!inputFile) {
    console.log('Usage: commlate <file> [from=ko] [to=en]');
    process.exit(1);
  }
  const code = await readFile(inputFile);
  const comments = parseComments(code);
  if (comments.length === 0) {
    console.log('No comments found.');
    process.exit(0);
  }
  const translated: string[] = [];
  for (const comment of comments) {
    if (comment.value.trim()) {
      const trans = await translate(comment.value, from, to);
      translated.push(trans);
    } else {
      translated.push('');
    }
  }
  const result = replaceComments(code, comments, translated);
  const outFile = inputFile.replace(/(\.\w+)?$/, '.translated$1');
  await writeFile(outFile, result);
  console.log(`Done! Output: ${outFile}`);
}

main();
