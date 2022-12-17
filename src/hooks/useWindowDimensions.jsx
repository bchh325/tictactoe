import {useState, useEffect} from 'react'

function getDimensions() {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    return {innerWidth, innerHeight};
}

export default function useWindowDimensions() {
    const [dimensions, setDimensions] = useState(getDimensions())

    useEffect(() => {
        function handleResize() {
            setDimensions(getDimensions());
          }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return dimensions
}
