// the codes are helpers just for demonstration purposes
// especially for topics that aren't outside the current lesson

export const login = (dto) => {
    const user = findByUsername(dto.username);

    if (!user) {
        return null;
    }

    return { token: buildFakeToken(user) };
}

/**
 * 
 * example bearer token header: 'Bearer myawesometoken'
 */
export const extractBearerToken = (authorizationHeader) => {
    if (!authorizationHeader) {
        return null;
    }

    authorizationHeader = authorizationHeader.split('Bearer ');
    if (authorizationHeader.length != 2) {
        return null;
    }

    return authorizationHeader[1];
}

/**
 * 
 * example token: 1_admin_whatever
 */
export const extractTokenData = (token) => {
    const secretToken = fakeTokensVault.find(t => t === token)
    if (!secretToken) {
        return null;
    }

    const tokenDataArray = secretToken.split('_');

    return {
        id: tokenDataArray[0],
        role: tokenDataArray[1],
    }
}

export const buildFakeToken = (user) => {
    return `${user.id}_${user.role}_whatever`
}

export const findMany = (id) => {
    return fakeDb.users;
}

export const findByUsername = (username) => {
    return fakeDb.users.find(u => u.username === username)
}

export const findById = (id) => {
    return fakeDb.users.find(u => u.id === id)
}

export const fakeDb = {
    users: [
        {
            id: 1,
            username: 'hydro',
            role: 'admin'
        },
        {
            id: 1,
            username: 'thermal',
            role: 'user'
        },
    ]
};

export const fakeTokensVault = [
    buildFakeToken(fakeDb.users[0]),
    buildFakeToken(fakeDb.users[1]),
];