import { db } from "..";

export const getUserByUsername = async(username: string) => {

    const result = await db.query.users.findFirst({
        where: (user,{eq}) => eq(user.userName, username)
    })

    return result
}

 