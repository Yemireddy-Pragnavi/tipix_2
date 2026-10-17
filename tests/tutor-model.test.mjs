import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validBoard} from '../.sites-runtime/tutor-test/model.js';
const node={id:'a',text:'A concept',x:20,y:20};
const board={nodes:[node],notes:'Explanation',language:'English'};
test('accepts a bounded board and all empty user boards',()=>{assert.equal(validBoard(board),true);assert.equal(validBoard({...board,nodes:[]}),true);});
test('rejects corrupt persisted data without throwing',()=>{for(const value of [null,{}, {...board,nodes:[null]},{...board,nodes:[node,node]},{...board,nodes:[{...node,x:Infinity}]},{...board,nodes:[{...node,y:900}]},{...board,notes:'x'.repeat(16001)},{...board,language:'unknown'}])assert.equal(validBoard(value),false);});
