"use client";
import useCount from "./use-count";
export default function Page() {
    // object destructure
    const { count, count2, incrementCount2, decrementCount2, resetCount2 } 
        = useCount();
    // use as object
    // const hookCount = useCount();
    // use as hookCount.count, hookCount.incrementCount2() etc
    return (
        <div>
            <div>
                Count: {count2}
            </div>
            <button onClick={incrementCount2}>Increment Count by 2</button>
            <button onClick={decrementCount2}>Decrement Count by 2</button>
            <button onClick={resetCount2}>Reset Count to 0</button>
        </div>
    );
}