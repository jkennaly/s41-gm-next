


export const rollPass = (skillObject) => rollResult => {

    if(!skillObject.target) return true
    if(!rollResult || !rollResult.sum) return false
    const modifiedTotal = rollResult.sum + (skillObject.otherBonus || 0) + (skillObject.skillBonus || 0) + (skillObject.specialtyBonus || 0) + (skillObject.characteristicBonus || 0);
    return modifiedTotal >= skillObject.target
}