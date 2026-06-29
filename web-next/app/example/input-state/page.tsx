"use client";
import { useState, ChangeEvent } from "react";
export default function Page() {
    const [email, setEmail] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleSubmit = () => alert("Submitted email: " + email);
    return (
        <div>
            <label>Email: </label>
            <input
                className="border p-2"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

// convert this statemanagement into hooks
// states for email, password
// handleChange for both
// handleSubmit to alert email and password
// in input-state/hooks/use-form.tsx
// in input-state/hooks/page.tsx use the useForm hook 
// and create form for email and password