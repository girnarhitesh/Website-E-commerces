import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Simple local-login/demo:
 * - Stores demo users in localStorage under key "demoUsers" as { email, password, name }
 * - On login success stores "userEmail" and "userName" in localStorage
 * - Redirects to /offer (with lastViewedProduct if present)
 *
 * For real Google Sign-In use Firebase or OAuth (instructions below).
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);

    // avatar using robohash (unique image per email)
    const avatarUrl = email ? `https://robohash.org/${encodeURIComponent(email)}.png?size=100x100` : "https://robohash.org/default.png?size=100x100";

    useEffect(() => {
        setError("");
        setInfo("");
    }, [email, password]);

    const readDemoUsers = () => {
        try {
            const raw = localStorage.getItem("demoUsers");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    };

    const saveDemoUsers = (users) => {
        localStorage.setItem("demoUsers", JSON.stringify(users));
    };

    const createAccount = () => {
        setError("");
        if (!EMAIL_REGEX.test(email)) {
            setError("Please enter a valid email before creating an account.");
            return;
        }
        if (!password || password.length < 4) {
            setError("Password must be at least 4 characters to create account.");
            return;
        }
        const users = readDemoUsers();
        if (users.find((u) => u.email === email)) {
            setError("Account with this email already exists. Try login or reset password.");
            return;
        }
        const name = email.split("@")[0];
        users.push({ email, password, name });
        saveDemoUsers(users);
        setInfo("Account created! You can now login.");
    };

    const handleLogin = () => {
        setError("");
        setInfo("");
        if (!EMAIL_REGEX.test(email)) {
            setError("Please enter a valid email.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setLoading(true);

        // Simulate async check
        setTimeout(() => {
            const users = readDemoUsers();
            const user = users.find((u) => u.email === email);

            if (!user) {
                setLoading(false);
                setError("No account found. Click Create Account to register (demo).");
                return;
            }
            if (user.password !== password) {
                setLoading(false);
                setError("Incorrect password. Please try again.");
                return;
            }

            // success
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userName", user.name || user.email.split("@")[0]);

            // read lastViewedProduct if exists and redirect to /offer with it
            const lastProduct = localStorage.getItem("lastViewedProduct");
            if (lastProduct) {
                navigate("/offer", { state: { product: JSON.parse(lastProduct) } });
            } else {
                navigate("/");
            }
        }, 600);
    };

    // Mock Google Sign-in (demo)
    const handleGoogleSignIn = () => {
        // NOTE: This is a mock shortcut for demo/testing.
        // For a real Google login use Firebase Auth or OAuth flow.
        setLoading(true);
        setTimeout(() => {
            const googleEmail = "google.user@example.com";
            const googleName = "Google User";

            // store as logged-in
            localStorage.setItem("userEmail", googleEmail);
            localStorage.setItem("userName", googleName);

            // ensure demo user exists so password-based login won't error later
            const users = readDemoUsers();
            if (!users.find(u => u.email === googleEmail)) {
                users.push({ email: googleEmail, password: "google-oauth", name: googleName });
                saveDemoUsers(users);
            }

            const lastProduct = localStorage.getItem("lastViewedProduct");
            setLoading(false);
            if (lastProduct) {
                navigate("/offer", { state: { product: JSON.parse(lastProduct) } });
            } else {
                navigate("/");
            }
        }, 900);
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={{ margin: 0 ,fontFamily:'arial'}}>Sign in</h2>
                <p style={{ color: "#666", marginTop: 6,fontFamily:"arial",letterSpacing:"1px" }}>Welcome back — continue to place your order</p>

                <div style={styles.avatarRow}>
                    <img src={avatarUrl} alt="avatar" style={styles.avatar} />
                    <div style={{ marginLeft: 12 }}>
                        <div style={{ fontWeight: 600 , fontFamily:"arial",letterSpacing:"0.4px" }}>{email ? email : "Enter your email"}</div>
                        <div style={{ color: "#888", fontSize: 13 ,fontFamily:"arial",letterSpacing:"0.4px" }}>{localStorage.getItem("userName") || ""}</div>
                    </div>
                </div>

                <div style={{ marginTop: 14 }}>
                    <label style={styles.labelmm}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        style={styles.input}
                    />

                    <label style={{ ...styles.label, marginTop: 8 }}>Password</label>
                    <div style={styles.pwdRow}>
                        <input
                            type={showPwd ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            style={{ ...styles.input, marginBottom: 0 }}
                        />
                        <button onClick={() => setShowPwd((s) => !s)} style={styles.showBtn}>
                            {showPwd ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                {error && <div style={styles.error}>{error}</div>}
                {info && <div style={styles.info}>{info}</div>}

                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <button onClick={handleLogin} style={styles.primary} disabled={loading}>
                        {loading ? "Please wait..." : "Login"}
                    </button>
                    <button onClick={createAccount}  style={styles.ghost}>
                        Create Account
                    </button>
                </div>

                <div style={{ textAlign: "center", marginTop: 12,fontFamily:"arial",letterSpacing:"0.4px" }}>
                    <div style={{ color: "#888", marginBottom: 8 ,fontFamily:"arial",letterSpacing:"0.4px"}}>— Or continue with —</div>
                    <button onClick={handleGoogleSignIn} style={styles.googleBtn} disabled={loading}>
                        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="google" style={{ width: 18, marginRight: 8 }} />
                        Continue with Google
                    </button>
                </div>

                <div style={{ marginTop: 14, color: "#666", fontSize: 13,fontFamily:"arial",letterSpacing:"0.4px" }}>
                    By continuing you agree to our <u>Terms</u> & <u>Privacy</u>.
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "#f4f6fb",
    },
    card: {
        width: 420,
        maxWidth: "95%",
        background: "#fff",
        padding: 22,
        borderRadius: 10,
        boxShadow: "0 6px 20px rgba(20,30,60,0.08)",
    },
    avatarRow: {
        display: "flex",
        alignItems: "center",
        marginTop: 12,
        marginBottom: 10,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 10,
        objectFit: "cover",
        border: "1px solid #eee",
    },
    label: {
        display: "block",
        fontSize: 13,
        color: "#333",
        marginBottom: 6,
    },
    input: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #ddd",
        outline: "none",
        boxSizing: "border-box",
        marginBottom: 12,
    },
    pwdRow: {
        display: "flex",
        gap: 8,
        alignItems: "center",
    },
    showBtn: {
        padding: "8px 10px",
        borderRadius: 8,
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer",
    },
    primary: {
        flex: 1,
        padding: "10px 12px",
        background: "#ff9900",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: 700,
    },
    ghost: {
        flex: 1,
        padding: "10px 12px",
        background: "#fff",
        color: "#333",
        border: "1px solid #ddd",
        borderRadius: 8,
        cursor: "pointer",
    },
    googleBtn: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 8,
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer",
    },
    error: {
        marginTop: 10,
        color: "#b00020",
        background: "#ffecec",
        padding: "8px 10px",
        borderRadius: 6,
    },
    info: {
        marginTop: 10,
        color: "#0a6b0a",
        background: "#ecffed",
        padding: "8px 10px",
        borderRadius: 6,
    },
};

export default LoginPage; 