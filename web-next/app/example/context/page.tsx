"use client"; // context is a client/state
import { createContext, useContext, useState } from "react";

// 1. Create a context with a default value
const CounterContext = createContext<any>(null); // data type
export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    return (
        <CounterContext.Provider value={{ count, increment, decrement }}>
            {children}
        </CounterContext.Provider>
    );
    // values -> what to share from this grouped state
}
export default function ContextPage() {
    return (
        <div>
            <CounterProvider>
                <SomeComponent/>
            </CounterProvider>
        </div>
    );
}
function SomeComponent(){
    const { count, increment, decrement } = useContext(CounterContext);
    return (
        <div>
            {count}
            <button onClick={increment}>Increment</button>
            <ChildComponent/>
        </div>
    )
}
function ChildComponent(){
    const { count, increment, decrement } = useContext(CounterContext); 
    return (
        <div>
            Child Using: {count}
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}