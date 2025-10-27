import { server } from "./index.js";

const PORT=3100;

server.listen(PORT,()=>{
    console.log(`server started at ${ PORT}.....`);
    
})