export const makeMyAddress = (myAddress) => {
    let address = ""
    myAddress.map((element, index) => {
        if (index !== 0) {
            address = element.split('|')[0] + ", " + address
        } else {
            address = element.split('|')[0] + address
        }
    })
    return address
};
