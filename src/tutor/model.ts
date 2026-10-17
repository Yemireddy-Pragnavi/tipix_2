export type BoardNode={id:string;text:string;x:number;y:number};
export type Board={nodes:BoardNode[];notes:string;language:string};
export const languages=['English','Telugu','Hindi','Tamil','Kannada','Malayalam','Marathi','Bengali'];
export function validBoard(value:unknown):value is Board {
 if(!value||typeof value!=='object')return false;
 const b=value as Board;
 return typeof b.notes==='string'&&b.notes.length<=16000&&languages.includes(b.language)&&Array.isArray(b.nodes)&&b.nodes.length<=24&&b.nodes.every(n=>n&&typeof n==='object')&&new Set(b.nodes.map(n=>n.id)).size===b.nodes.length&&b.nodes.every(n=>typeof n.id==='string'&&n.id.length<=80&&typeof n.text==='string'&&n.text.length<=500&&Number.isFinite(n.x)&&n.x>=0&&n.x<=760&&Number.isFinite(n.y)&&n.y>=0&&n.y<=640);
}
