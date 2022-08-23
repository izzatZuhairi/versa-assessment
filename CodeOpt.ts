
// 1. Optimize this code
const getName = async () => {
    return "Izzat"
}
const getAge = async () => {
    return 25;
}
const getAddress = async () => {
    return "PJ"
}

const getUserInfo = async (userId: string): Promise<User> => {
    return await Promise.all(
        [getName(), getAge(), getAddress()]
    ).then(v => {
        return {
            name: v[0],
            age: v[1],
            address: v[2]
        }
    })
}

const test = async () => {
    console.log(await getUserInfo(""))
}

test();

// 2. Declare TypeScript interface for User'

interface User {
    name: string,
    age: number,
    address: string
}