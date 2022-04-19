const validarOrderBy=async  (req,res=response,next)=>{
    const {orderBy}= req.query;
    const {order}=req.query;
 
     if(!orderBy){
        return   next();
     }
    
     try{
         switch (orderBy) {
             case "serial":
                 req.orderBy="serial_number";
                 
                 break;
                 case "price":
                 req.orderBy="price";
                 
                 break;

                 case "rank":
                 req.orderBy="rank";
                 
                 break;
                 
         
             default:
                 return res.status(401).json({
                        msj:'Invalid orderBy',
                        example:"serial,price,rank!"
                    });
                
         }
         if(order=="desc"||order=="DESC"){
            req.order="DESC";
         }
         else{
            req.order="ASC";
         }
            
         
           
 
 
         next();
 
 
       
 
     }catch(e){
         console.log(e)
     console.log(e)
         return res.status(401).json({
            msj:'Invalid orderBy',
            example:"serial,price,rank",
            error:e.message
           
         });
     }
 }
 
 module.exports={
    validarOrderBy
 }
 
 