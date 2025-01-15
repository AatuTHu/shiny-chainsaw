export const makeTimeStamp = () => {
    const date = new Date()
    const time =
    //get date month year
    date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear()+'-'+
    //get hour, if hours < 10 then add a 0 infront of the number
    (date.getHours() < 10 ? '0'+date.getHours() : date.getHours())+':'+
    //get minutes, if minutes < 10 then add a 0 infront of the number
    (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes())+':'+
    //get seconds
    date.getSeconds()
   
    return time
}