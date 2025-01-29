const makeTimeStamp = () => {
    const date = new Date()
    const time =
    //get date.month.year
    date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear() 
    return time
}

//Check if the value is a number and not empty string. 0 is considered a number
const isNumber = (value) => !isNaN(value) && !(value === "");

//Check if the field is a field that requires a number
const isValidField = (field) => {
    const allowedFields = ["amount", "salary", "payment", "frqAmount", "housing", "groceries", "transportation", "emergencyFund","emergencyGoal","savingGoal","amountSaved"];
    return allowedFields.includes(field);
};

const handleChangeItem = (setItem, field, value) => {
    if (isValidField(field) && isNumber(value)) {
        setItem(prev => ({
            ...prev,
            [field]: Number(value),
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

const handleOnDropDownPress = (setItem,setVisible,visible,value,index) => {
    setVisible((prev) => (prev === index ? null : index));
    if (visible !== index) handleChangeItem(setItem, 'name', value);
}

const handleAddToList = (setItem, setVisible, setTempObject, tempObject) => {
    setItem((prevItem) => [...prevItem, { ...tempObject }]);
    setTempObject({});
    setVisible(null);
};

export {
    makeTimeStamp,
    handleChangeItem,
    handleRemoveFromList,
    handleOnDropDownPress,
    handleAddToList
}