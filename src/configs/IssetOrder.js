const issetOrder = (idFood, orders) => {
    let tempList = [...[], ...orders]
    const tempDoc = tempList.filter(e=> {
        return e.idFood === idFood
    });
    console.log(orders);
    if(tempDoc.length === 0) {
        return false
    } else {
        return true;
    }
};

export { issetOrder };