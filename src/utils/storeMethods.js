export const mergeIntoArray = (array, data) => {
    const merged = (array || []).map((item) => {
        const match = data && data.id === item.id
        return match ? { ...item, ...data } : item;
    });
    // add into array if it is not present
    const inArray = merged.some((i) => i.id === data.id);
    if (!inArray) merged.push(data);

    return merged;
}

export const mergeArrays = (array, data) => {
    const merged = (array || []).map((item) => {
        const match = data.find((d) => d.id === item.id);
        return match ? { ...item, ...match } : item;
    });
    // add data into array if it is not present
    data.forEach((d) => {
        const inArray = merged.some((i) => i.id === d.id);
        if (!inArray) merged.push(d);
    });

    return merged;
}
