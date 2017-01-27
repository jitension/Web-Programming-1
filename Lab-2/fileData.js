
const fs = require('fs');

module.exports={
        getFileAsString:function(path)
        {
          
          return new Promise((fulfill, reject) => {
                if(!path) reject("path is not correct!");
                fs.readFile(path,"utf-8",(error, data)=>{
                    if(error) reject(error);
                    fulfill(data);
                });
             })
         },

      getFileAsJSON: function(path)
      {
              return new Promise((fulfill, reject) => {
                if(!path) reject("path is not correct!");
                fs.readFile(path,"utf-8",(error, data)=>{
                    if(error) reject(error);
                    try{
                        var asobject=JSON.parse(data);
                    } catch(error){
                        reject(error);
                    }
                    fulfill(asobject);
                });
              });
      },

      saveStringToFile:function(path, text)
        {
         return new Promise((fulfill, reject) => {
       if(!path || !text) reject("path or text is not correct!");
        fs.writeFile(path, text, (error, data)=>{
			if(error) reject(error);
            fulfill("File Data is Saved in location"+path);

        });
         });
        },

       saveJSONToFile:function(path, obj)
   {
    return new Promise((fulfill, reject) => {
       if(!path || !obj) reject("Reject Invalid!");
       fs.writeFile(path,JSON.stringify(obj,null,4),(error,data)=>{
           if(error) reject(error);
           fulfill("File Data is Saved in location"+path);



});
});

}
}

