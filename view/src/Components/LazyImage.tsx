
  
import React, { useState } from 'react';

const LazyImage = (
    { className, src, placeHolder, alt, onClick, onLoadCallBack }:
    { src:string, alt:string,  className?:string, placeHolder?:string,onClick?:Function, onLoadCallBack?:Function ,}
    ) => {

    const [currentImg, setCurrentImg] = useState(placeHolder);
    if (!currentImg) {setCurrentImg(src);}
    React.useEffect(() => {
        setOriginalImage()
    });

    const setOriginalImage = () => {
        let originalImg = new Image();
        originalImg.onload = () => {
            setCurrentImg(src);
            if (onLoadCallBack) {
                onLoadCallBack();
            }
        };
        originalImg.src = src;
    }


    return (
        <img
            className={className ? className : ''}
            src={currentImg} alt={alt}
            loading='lazy'
            onClick={()=>{if(onClick)onClick();}}

        ></img>
    )

}
export default LazyImage;