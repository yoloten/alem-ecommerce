export const findDuplicates = (arr: any) => {
    const m = arr.reduce((i: any, v: any) => {
        if (i[v] === undefined) {
            i[v] = 1
        } else {
            i[v] = i[v] + 1;
        }
        return i;
    }, {});
   
    const vals: number[] = Object.values(m)
    const getMaxRepeated = Math.max(...vals)
    let duplicateItems = []
    
    for (var keys in m) {
        if (m[keys] === getMaxRepeated) {
            duplicateItems.push(keys)
        }
    }

    return duplicateItems
}