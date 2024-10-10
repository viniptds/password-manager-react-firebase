
const accountService = {
    accountInfo: (user) => {
        console.log(user.metadata)
        console.log(user.metadata.lastLoginAt)
        console.log(new Date(user.metadata.lastLoginAt))
        return {
            // lastLogin: new Date(user.metadata.lastLoginAt),
            createdAt: user.metadata.creationTime,
            lastLogin: user.metadata.lastSignInTime,
        }
    }
}

export default accountService