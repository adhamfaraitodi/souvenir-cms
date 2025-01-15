import grapesjs from "grapesjs";
import { useEffect, useRef, useState } from "react";
import grapesjsTailwind from "grapesjs-tailwind";
import grapesjsTemplate from "grapesjs-templates";
import "grapesjs/dist/css/grapes.min.css";

const GrapeJsLayouting = () => {
    const [editor, setEditor] = useState(null);
    const editorRef = useRef(null);
    useEffect(() => {
        if (!editorRef.current) {
            const editorInstance = grapesjs.init({
                container: "#gjs",
                fromElement: false,
                storageManager: false,
                plugins: [grapesjsTailwind, grapesjsTemplate],
            });
        }
    }, []);
    return <div className="w-full h-screen" id="gjs"></div>;
};

export default GrapeJsLayouting;
