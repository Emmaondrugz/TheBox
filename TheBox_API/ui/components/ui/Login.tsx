import { useState } from "react";
import { validatePassword } from "./passwordValidation";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

type FormDetailsProps = {
    Email: string | null,
    password: string | null
}

type LoginProps = {
    setForm: (form: "signup" | "login" | "reset") => void;
    setFormDetails: (details: FormDetailsProps) => void;
};
export default function Login({ setForm, setFormDetails }: LoginProps) {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const { fetchCart } = useCart()

    const handleSubmit = async () => {
        let hasError = false;
        setEmailError("");
        setPasswordError("");

        if (!email.trim()) {
            setEmailError("Email or username is required.");
            hasError = true;
        }

        const pwResult = validatePassword(password);
        if (!pwResult.valid) {
            setPasswordError(pwResult.error ?? "Invalid password.");
            hasError = true;
        }

        if (hasError) return;

        // TODO: hook up to API
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/api/users/login/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    email: email,
                    password: password
                })
            })

            const data = await response.json()

            if (response.ok) {
                console.log('Login successfull!')

                // Save tokens to localStorage
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh)

                // TRIGGER CART FETCH IMMEDIATELY BEFORE REDIRECT
                await fetchCart();
                setIsLoading(false)

                // Redirect to product dashboard page
                router.push('/products')
            } else {
                console.log('Error: ', JSON.stringify(data))
            }

        } catch (error) {
            console.error('Login Failed: ', error)
        }
    };

    return (
        <div className="flex flex-col gap-3 montserrat">
            {/* Email/username Input */}
            <div className="w-full">
                <input
                    type="email"
                    className={`bg-[#f2f2f2] montserrat w-full h-[40px] p-3 rounded-md focus:outline-0 text-sm placeholder:text-[13px] ${emailError ? "border border-red-400" : ""
                        }`}
                    placeholder="Email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p
                    className={`mt-1 text-xs text-red-500 min-h-[14px] transition-opacity duration-200 ${emailError ? "opacity-100" : "opacity-0"}`}
                >
                    {emailError || " "}
                </p>
            </div>

            {/* Password Input */}
            <div className="w-full relative">
                <input
                    type={showPassword ? "text" : "password"}
                    className={`bg-[#f2f2f2] montserrat w-full h-[40px] p-3 pr-9 rounded-md focus:outline-0 text-sm placeholder:text-[13px] ${passwordError ? "border border-red-400" : ""
                        }`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute top-1/2 -translate-y-full right-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-6.94" />
                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19" />
                            <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                            <line x1="3" y1="3" x2="21" y2="21" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M1 12s3-7 11-7 11 7 11 7-3 7-11 7S1 12 1 12Z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    )}
                </button>
                <p
                    className={`mt-1 text-xs text-red-500 min-h-[14px] transition-opacity duration-200 ${passwordError ? "opacity-100" : "opacity-0"}`}
                >
                    {passwordError || " "}
                </p>
            </div>

            {/* Links */}
            <div className="text-sm flex justify-between items-center mt-3">
                <div
                    className="cursor-pointer hover:text-gray-600"
                    onClick={() => setForm("reset")}
                >
                    Forgot password?
                </div>
                <div
                    className="cursor-pointer hover:text-gray-600"
                    onClick={() => setForm("signup")}
                >
                    Create account
                </div>
            </div>

            {/* Submit button */}
            <div className="w-full">
                <button
                    className="bg-black text-white cursor-pointer py-2 w-full rounded-md"
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
            </div>
        </div>
    );
}

