import { describe, it, expect } from 'vitest';
import { countText, formatJson, textDiff, summarize, csvToJson } from './utils.js';

describe('utility functions',()=>{
 it('counts words, characters and lines',()=>expect(countText('hello world\nagain')).toEqual({characters:17,charactersNoSpaces:15,words:3,lines:2}));
 it('formats valid JSON and rejects invalid JSON',()=>{expect(formatJson('{"a":1}')).toBe('{\n  "a": 1\n}');expect(()=>formatJson('{')).toThrow()});
 it('compares lines',()=>expect(textDiff('a\nb','b\nc')).toEqual({removed:['a'],added:['c'],same:['b']}));
 it('keeps short text intact',()=>expect(summarize('One sentence. Two sentence.')).toBe('One sentence. Two sentence.'));
 it('converts simple CSV',()=>expect(csvToJson('name,age\nAda,20')).toEqual([{name:'Ada',age:'20'}]));
});
