export type BoardNode={id:string;text:string;x:number;y:number};
export type Shape={id:string;kind:'ellipse'|'rect'|'line'|'text';x:number;y:number;w:number;h:number;text:string;color:string};
export type Stroke={points:[number,number][]};
export type Message={role:'user'|'assistant';text:string};
export type Board={nodes:BoardNode[];notes:string;language:string;shapes?:Shape[];strokes?:Stroke[];messages?:Message[]};
export const languages=['English','Telugu','Hindi','Tamil','Kannada','Malayalam','Marathi','Bengali'];
export const palette=['#f7c2ca','#cc8db3','#9d85b6','#837ab6','#fff5f8'];
export const languageCodes:Record<string,string>={English:'en',Telugu:'te',Hindi:'hi',Tamil:'ta',Kannada:'kn',Malayalam:'ml',Marathi:'mr',Bengali:'bn'};
const number=(n:unknown,max:number)=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=max;
export function validBoard(value:unknown):value is Board {
 if(!value||typeof value!=='object')return false;const b=value as Board;
 return typeof b.notes==='string'&&b.notes.length<=16000&&languages.includes(b.language)&&Array.isArray(b.nodes)&&b.nodes.length<=24&&b.nodes.every(n=>n&&typeof n==='object'&&typeof n.id==='string'&&n.id.length<=80&&typeof n.text==='string'&&n.text.length<=500&&number(n.x,760)&&number(n.y,640))&&new Set(b.nodes.map(n=>n.id)).size===b.nodes.length
 &&(b.shapes===undefined||Array.isArray(b.shapes)&&b.shapes.length<=40&&b.shapes.every(s=>s&&typeof s.id==='string'&&s.id.length<=80&&['ellipse','rect','line','text'].includes(s.kind)&&number(s.x,1000)&&number(s.y,800)&&number(s.w,1000-s.x)&&number(s.h,800-s.y)&&typeof s.text==='string'&&s.text.length<=250&&palette.includes(s.color))&&new Set(b.shapes.map(s=>s.id)).size===b.shapes.length)
 &&(b.strokes===undefined||Array.isArray(b.strokes)&&b.strokes.length<=60&&b.strokes.every(s=>s&&Array.isArray(s.points)&&s.points.length<=150&&s.points.every(p=>Array.isArray(p)&&p.length===2&&number(p[0],1000)&&number(p[1],800))))
 &&(b.messages===undefined||Array.isArray(b.messages)&&b.messages.length<=30&&b.messages.every(m=>m&&['user','assistant'].includes(m.role)&&typeof m.text==='string'&&m.text.length<=16000));
}
