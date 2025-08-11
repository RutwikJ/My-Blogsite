import cron from 'cron';
import https from 'https';


const job= new cron.CronJob("*/12 * * * *",function(){
    https
        .get(process.env.URL,(res)=>{
            if(res.statusCode===200) console.log('get req sent successfully');
            else console.log('get req failed',res.statusCode);

            
            
        })
        .on('error',(e)=>console.error('Error occured while sending req',e))
})
export default job;