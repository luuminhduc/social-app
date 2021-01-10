export const getUserName = (arr, uid) => {
    return arr.filter(el => el.id === uid)[0];
}