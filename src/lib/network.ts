/** Bound stalled service calls while respecting caller cancellation. */
export async function serviceFetch(input:RequestInfo|URL,init?:RequestInit):Promise<Response>{
 const controller=new AbortController();
 const upstream=init?.signal||(input instanceof Request?input.signal:undefined);
 const cancel=()=>controller.abort(upstream?.reason);
 if(upstream?.aborted)cancel();else upstream?.addEventListener('abort',cancel,{once:true});
 const address=input instanceof Request?input.url:String(input);
 const timeout=address.includes('/functions/v1/')?55000:20000;
 const timer=setTimeout(()=>controller.abort(new DOMException('The service timed out.','TimeoutError')),timeout);
 try{return await fetch(input,{...init,signal:controller.signal});}
 finally{clearTimeout(timer);upstream?.removeEventListener('abort',cancel);}
}
