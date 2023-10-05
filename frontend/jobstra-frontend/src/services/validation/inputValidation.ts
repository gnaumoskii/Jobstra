export const validateUsernameHandler = (username: string): boolean => {
    return username.trim().length >= 4;
};

export const validateEmailHandler = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const validatePasswordHandler = (password: string): boolean => {
    return password.trim().length >= 8;
};