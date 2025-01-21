const makeTimeStamp = () => {
    const date = new Date()
    const time =
    //get date.month.year
    date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear()/*+'-'+
    //get hour, if hours < 10 then add a 0 infront of the number
    (date.getHours() < 10 ? '0'+date.getHours() : date.getHours())+':'+
    //get minutes, if minutes < 10 then add a 0 infront of the number
    (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes())+':'+
    //get seconds
    date.getSeconds()*/ 
    return time
}

//Check if the value is a number and not empty string. 0 is considered a number
const isNumber = (value) => !isNaN(value) && !(value === "");

//Check if the field is a field that requires a number
const isValidField = (field) => {
    const allowedFields = ["amount", "salary", "payment", "frqAmount", "housing", "groceries", "transportation", "emergencyFund","emergencyGoal"];
    return allowedFields.includes(field);
};

const handleChangeItem = (setItem, field, value) => {
    if (isValidField(field) && isNumber(value)) {
        setItem(prev => ({
            ...prev,
            [field]: Number(value),
        }));
    } else if (isValidField(field) && !isNumber(value)) {
        setItem(prev => ({
            ...prev,
            [field]: "",
        }));
    } else {
        setItem(prev => ({
            ...prev,
            [field]: value,
        }));
    }
}

const handleRemoveFromList = (setItem,index) => {
    setItem((prevBills) => prevBills.filter((_, i) => i !== index));
}

export {
    makeTimeStamp,
    isNumber,
    handleChangeItem,
    isValidField,
    handleRemoveFromList,
}