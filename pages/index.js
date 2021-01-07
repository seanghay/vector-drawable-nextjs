import {ReactSVG} from "react-svg";
import {useState, useEffect} from "react";
import {transform} from 'vector-drawable-svg';
import SVG from 'react-inlinesvg';
import { useFilePicker } from 'react-sage';
import Head from "next/head";


const STATE_NONE = -1
const STATE_DRAG_LEAVE = 0
const STATE_DRAGGING = 1
const STATE_DROP = 2


function downloadBlob(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function isValidFileType(type) {
    if (type === 'text/xml') return true;
    return type === 'application/xml';
}

function transformXmlOrNull(value, options) {
    if (!value) {
        return null;
    }
    try {
        return transform(value, options)
    } catch (e) {
        console.warn(e)
    }
}

function dropzoneClassOfState(state) {
    if (state === STATE_DRAG_LEAVE) return '';
    if (state === STATE_DRAGGING) return 'vd-highlight';
    if (state === STATE_DROP) return 'vd-active';
}

async function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result)
        reader.readAsText(file);
    });
}

export default function Home() {

    const { files, onClick: onDropzoneClick, errors, HiddenFileInput } = useFilePicker({
        maxFileSize: 1,
    })

    const [dragState, setDragState] = useState(STATE_NONE)
    const [isEnabled, setEnabled] = useState(false);
    const [vectorDrawableFile, setVectorDrawableFile] = useState()
    const [transformedSvg, setTransformedSvg] = useState()


    function dragEnter(e) {
        e.stopPropagation();
        e.preventDefault();
        setDragState(STATE_DRAGGING)
    }

    function dragLeave(e) {
        e.stopPropagation();
        e.preventDefault();
        setDragState(STATE_DRAG_LEAVE)
    }


    async function proceedFile(file) {
        const xmlContent = await readFileContent(file);
        const svgContent = transformXmlOrNull(xmlContent);
        if (!svgContent) {
            return;
        }

        setTransformedSvg(svgContent);
        setVectorDrawableFile(file);
        setDragState(STATE_DROP);
    }

    async function fileDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;

        if (files.length > 0) {
            const file = files[0]
            if (isValidFileType(file.type)) {
                await proceedFile(file);
                return;
            }
        }

        setDragState(STATE_NONE);
    }

    function dragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    }

    function clearUpload(e) {
        e.stopPropagation();
        setDragState(STATE_NONE)
        setVectorDrawableFile(null);
        setTransformedSvg(null);
    }

    function downloadCurrentSvg() {
        if (!transformedSvg) {
            return;
        }

        let filename = 'output.svg';
        if (vectorDrawableFile) {
            filename = vectorDrawableFile.name.split('.').slice(0, -1).join('.') + ".svg";
        }
        downloadBlob(filename, transformedSvg);
    }

    useEffect(() => {
        const getDataUrls = async () => {
            if (files.length <= 0) {
                return;
            }
            const file = files[0];
            if (isValidFileType(file.type)) {
                await proceedFile(file);
            }
        }
        getDataUrls()
    }, [files])

    return (
        <>
            <Head>
                <title>VectorDrawable to SVG</title>
            </Head>
            <div className="vd-form-center">
                <HiddenFileInput accept=".xml" multiple={false} />
                <div className="vd-head vd-form-center">
                    <h1 className="vd-title">VectorDrawable to SVG</h1>
                    <p className="vd-subtitle">Drop a valid vector drawable file here.</p>
                    <div
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDragOver={dragOver}
                        onDrop={fileDrop}
                        onClick={onDropzoneClick}

                        className={"vd-dropzone " + dropzoneClassOfState(dragState)}>
                        <div className="vd-placeholder">
                            <ReactSVG src="plus.svg"/>
                        </div>
                        <div className="vd-image-container">
                            <div onClick={clearUpload} className="text-button-icon">
                                <ReactSVG src="close.svg"/>
                            </div>
                            <div className="vd-image">
                                <SVG src={transformedSvg} width={300} height={300} title="SVG"/>
                            </div>

                            <div className="vd-filename">
                                <p>{vectorDrawableFile?.name}</p>
                            </div>
                        </div>
                    </div>

                    <button onClick={downloadCurrentSvg} disabled={!vectorDrawableFile} className="vd-download">
                        <ReactSVG src="/download-circular-button.svg"/>
                        Download
                    </button>

                    <footer className="vd-footer">
                        <div className="vd-github">
                            <a href="https://github.com/seanghay/vector-drawable-nextjs" target="_blank">
                                <ReactSVG src="/github.svg"/>
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}
