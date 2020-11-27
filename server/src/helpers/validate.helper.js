export const validatorClassId = (classID) => {
    let reg = new RegExp("^[0-9]+$");
    if (classID.length === 8 && reg.test(classID)) return true;
    return false;
}