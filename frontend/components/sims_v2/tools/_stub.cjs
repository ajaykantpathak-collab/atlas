const P=new Proxy(function(){}, {get:(t,k)=> k==="default"?P:P, apply:()=>P, construct:()=>P});
module.exports=P; module.exports.default=P;
