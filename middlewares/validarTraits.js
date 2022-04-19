const validarTraits=async  (req,res=response,next)=>{
    const {traits}= req.body;
 
     if(!traits){
        return   next();
     }
    
     try{
         
         
           
 
 
         let traitsQuery=[];
         const traitsFilter = JSON.parse(traits);
 
         //agrego los tratis a un arreglo para luego poder filtrar
 
         traitsFilter.forEach((trait) => {
           const { name, value } = trait;
           if(isNaN(value)){
           traitsQuery.push( `"trait_type":"${name}","value":"${value}"`);
        }else{
            traitsQuery.push( `"trait_type":"${name}","value":${value}`);
        }
         });
 
 
         req.traitsQuery=traitsQuery;
         next();
 
 
       
 
     }catch(e){
         console.log(e)
     
         return res.status(401).json({
             msj:'Invalid traits',
             example:"[name:string,value:string]"
         });
     }
 }
 
 module.exports={
     validarTraits
 }
 
 