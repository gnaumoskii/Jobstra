import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
}

export const compareHashedPassword = async (providedPassword, hashedPassword) => {
        const match = await bcrypt.compare(providedPassword, hashedPassword);
        return match;

}


export const validateUserData = (user) => {
 return validateUsername(user.username) && validateEmail(user.email) && validatePassword(user.password);
}

const validateUsername = (username) => {
        return username.trim().length >= 4;
}

const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
}

const validatePassword = (password) => {
        return password.trim().length >= 8;
}

