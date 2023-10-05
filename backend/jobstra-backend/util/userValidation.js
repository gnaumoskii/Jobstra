import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
        // Generate a salt (a random string) for added security
        const saltRounds = 10; // You can adjust the number of rounds for better security (higher is slower)
        const salt = await bcrypt.genSalt(saltRounds);
    
        // Hash the password using the generated salt
        const hash = await bcrypt.hash(password, salt);
        return hash;
}

export const compareHashedPassword = async (providedPassword, hashedPassword) => {
        const match = await bcrypt.compare(providedPassword, hashedPassword);
        return match; // 'true' if passwords match, 'false' if they don't

}