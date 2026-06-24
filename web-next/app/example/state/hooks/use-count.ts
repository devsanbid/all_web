// hooks are combination of state and their function
// to resuse and manage seperately from UI logic
import { useState, useEffect } from "react";
// naming convention: use + name of hook (useCount, useAuth, useBlog)
export default function useCount() {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    const incrementCount2 = () => setCount2(count2 + 2);
    const decrementCount2 = () => setCount2(count2 - 2);
    const resetCount2 = () => setCount2(0);

    useEffect(() => {
        alert("Count value changed: " + count);
    }, [count, count2]);
    
    return {
        count, count2, 
        incrementCount2, decrementCount2, resetCount2
    }
}