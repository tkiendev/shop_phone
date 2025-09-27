module.exports = (obj, splitKey) => {
    const obj1 = {};
    const obj2 = {};
    let foundSplit = false;

    for (const key in obj) {
        if (!foundSplit) {
            obj1[key] = obj[key];
            if (key === splitKey) {
                foundSplit = true;
            }
        } else {
            obj2[key] = obj[key];
        }
    }
    return { obj1, obj2 }
}