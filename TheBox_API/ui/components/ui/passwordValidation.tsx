export type PasswordValidationResult = {
    valid: boolean;
    error?: string;
};

export function validatePassword(password: string): PasswordValidationResult {
    if (!password || password.trim().length === 0) {
        return { valid: false, error: "Password is required." };
    }

    if (password.length < 8) {
        return { valid: false, error: "Password must be at least 8 characters." };
    }

    if (!/\d/.test(password)) {
        return {
            valid: false,
            error: "Password must include at least one number.",
        };
    }

    return { valid: true };
}

