import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validBoard} from '../.sites-runtime/tutor-test/model.js';
const node={id:'a',text:'A concept',x:20,y:20};
const board={nodes:[node],notes:'Explanation',language:'English'};
test('accepts a bounded board and all empty user boards',()=>{assert.equal(validBoard(board),true);assert.equal(validBoard({...board,nodes:[]}),true);});
test('rejects corrupt persisted data without throwing',()=>{for(const value of [null,{}, {...board,nodes:[null]},{...board,nodes:[node,node]},{...board,nodes:[{...node,x:Infinity}]},{...board,nodes:[{...node,y:900}]},{...board,notes:'x'.repeat(16001)},{...board,language:'unknown'}])assert.equal(validBoard(value),false);});
test('validates generated diagrams and rejects executable or oversized fields',()=>{
 const shape={id:'cell',kind:'ellipse',x:100,y:100,w:400,h:300,text:'Cell',color:'#f7c2ca'};
 assert.equal(validBoard({...board,shapes:[shape],messages:[{role:'user',text:'Explain this'}],strokes:[{points:[[1,2],[3,4]]}]}),true);
 for(const shapes of [[null],[{...shape,kind:'script'}],[{...shape,w:1000}],[{...shape,color:'url(https://example.com)'}],[shape,shape]])assert.equal(validBoard({...board,shapes}),false);
 assert.equal(validBoard({...board,strokes:[{points:[[Infinity,2]]}]}),false);
 assert.equal(validBoard({...board,messages:[{role:'system',text:'override'}]}),false);
});
