import React, { useEffect, useContext }  from "react";
import iPhone13Image from './asset/iPhone 13 - Moonlight.png';
import { useLocation } from "react-router";
import { TopMenu } from './TopMenu.js'; 
import { SideMenu } from "./SideMenu.js";
import { Context, backgroundTypeEnum } from "./ImageContext.js";

export function CanvasWindow() {
    const { state, dispatch } = useContext(Context);

    const emp = useLocation();
    const deviceSize = [1400,2700];
    const screenSize = [1170,2532];

    function screenImageLoad(){
        return new Promise(function(resolve, reject) {
            let screenImage = new Image();
            const reader = new FileReader();
            reader.onload=()=>{
                screenImage.src = reader.result;
            }
            reader.readAsDataURL(state.imageFiles["iPhone 13"].image);
            screenImage.onload = function() {
                console.log(state.imageFiles["iPhone 13"].image);
                resolve(screenImage);
            }
        });
    }

    function deviceImageLoad(){
        return new Promise(function(resolve, reject) {
            let deviceImage = new Image();
            deviceImage.src = iPhone13Image;

            deviceImage.onload = function() {
                resolve(deviceImage);
            }
        });
    }

    function deviceSizeLogic(sizeNum){
        let resizeFactor = screenSize[0]/deviceSize[1]
        switch (sizeNum) {
            case 1:
                resizeFactor *= 0.85
                break
            case 3:
                resizeFactor *= 1.2
                break
            default:
                break
        }
        console.log(resizeFactor);
        return resizeFactor
    }

    useEffect(() => {
        let setScreenWidth = state.deviceType.height;
        let setScreenHeight = state.deviceType.width;

        let canvas = document.getElementById("canvas-bg");
        canvas.width = setScreenWidth;
        canvas.height = setScreenHeight;
        let ctx = canvas.getContext("2d");
        
        let setGradientX = setScreenWidth;
        let setGradientY = setScreenHeight;

        if(parseInt(state.backgroundDirection) === 0){
            setGradientX = 0;
        }else{
            setGradientY = 0;
        }

        let grd = ctx.createLinearGradient(0, 0, setGradientX,setGradientY);
        if(state.backgroundType == backgroundTypeEnum.single){
            grd.addColorStop(0, state.backgroundColor[0].color);
            grd.addColorStop(1, state.backgroundColor[0].color);

            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, setScreenWidth, setScreenHeight);
        }else if(state.backgroundType == backgroundTypeEnum.gradient){
            let haveFirstZero = false;
            for (let value of state.backgroundColor.values()){
                let setPos = parseInt(value.colorPos)/100;
                if(setPos !== null && setPos < 101){
                    if(setPos == 0){
                        if(haveFirstZero === false){
                            haveFirstZero = true
                            grd.addColorStop(setPos, value.color);
                        }
                    }else{
                        grd.addColorStop(setPos, value.color);
                    }
                }
            }

            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, setScreenWidth, setScreenHeight);
        }else if(state.backgroundType == backgroundTypeEnum.image){
            
            if(state.backgroundImageFile !== ""){
                let backgroundImage = new Image();
                const reader = new FileReader();
                reader.onload=()=>{
                    backgroundImage.src = reader.result;
                }
                reader.readAsDataURL(state.backgroundImageFile);

                backgroundImage.onload = function() {
                    let imageWidth = backgroundImage.naturalWidth;
                    let imageHeight = backgroundImage.naturalHeight;
                    let imageScale = imageWidth/imageHeight;

                    ctx.drawImage(backgroundImage, 0, 0, setScreenWidth, setScreenHeight);
                    let imgData = canvas.toDataURL("image/png");
                    let canvasImage = document.getElementById('canvas-img-bg');
                    canvasImage.setAttribute('src' , imgData);
                }
            }
        }
    }, [state.backgroundType ,state.backgroundColor, state.backgroundDirection, state.backgroundColor, state.backgroundImageFile]);


    useEffect(() => {
        let setStartX = parseInt(state.deviceXPos);
        let setStartY = parseInt(state.deviceYPos);
        let setScreenWidth = screenSize[1];
        let setScreenHeight = screenSize[0];
        
        let sizeScaleFactor = deviceSizeLogic(state.deviceSize);
        const setDeviceWidth = sizeScaleFactor*deviceSize[0];
        const setDeviceHeight =sizeScaleFactor*deviceSize[1];

        let canvas = document.getElementById("canvas-device");
        canvas.width = setScreenWidth;
        canvas.height = setScreenHeight;
        let ctx = canvas.getContext("2d");  

        if(state.containImage){
            (async () => {
                const halfScreenWidth = setScreenWidth*sizeScaleFactor;
                const halfScreenHeight = setScreenHeight*sizeScaleFactor;
                const movePosX = 114*sizeScaleFactor;
                const movePosY = 84*sizeScaleFactor;

                const screenLoad = await screenImageLoad();
                ctx.drawImage(screenLoad, setStartX+movePosX, setStartY+movePosY, halfScreenHeight, halfScreenWidth);
                const deviceLoad = await deviceImageLoad();
                ctx.drawImage(deviceLoad, setStartX, setStartY, setDeviceWidth, setDeviceHeight);

                let imgData = canvas.toDataURL("image/png");
                let canvasImage = document.getElementById('canvas-img-device');
                canvasImage.setAttribute('src' , imgData);
            })();
        }else{
            let imageObj1 = new Image();
            imageObj1.src = iPhone13Image;

            imageObj1.onload = function() {
                ctx.drawImage(imageObj1, setStartX, setStartY, setDeviceWidth, setDeviceHeight);
                let imgData = canvas.toDataURL("image/png");
                let canvasImage = document.getElementById('canvas-img-device');
                canvasImage.setAttribute('src' , imgData);
            }
        }
    }, [state.imageFiles, state.containImage, state.deviceXPos, state.deviceYPos, state.deviceSize]);

    useEffect(() => {
        let setStartX = parseInt(state.deviceXPos);
        let setStartY = parseInt(state.deviceYPos);
        let setScreenWidth = screenSize[1];
        let setScreenHeight = screenSize[0];

        let canvas = document.getElementById("canvas-text");
        canvas.width = setScreenWidth;
        canvas.height = setScreenHeight;
        let ctx = canvas.getContext("2d");
        
        //ctx.textBaseline = setStyle.textBaseline;
        ctx.fillStyle = state.fontColor;
        ctx.textAlign = state.fontAlign;
        ctx.font = (state.fontWeight.toString()+" "+state.fontSize.toString()+"px "+state.fontFamily);

        let textArray = state.inputText.split(/\r?\n/);
        let y = 500;
        for (var i = 0; i < textArray.length; i++) {
            ctx.fillText(textArray[i], setStartX/2, y);
            y += parseInt(state.lineHeight);    
        }

        let imgData = canvas.toDataURL("image/png");
        let canvasImage = document.getElementById('canvas-img-text');
        canvasImage.setAttribute('src' , imgData);
    }, [state.fontAlign, state.fontFamily, state.fontWeight, state.fontSize, state.lineHeight, state.fontColor, state.inputText]);
    
    return (
        <div className="web-page">
            <TopMenu />
            <div className="preview-left-block">
                <SideMenu />
            </div>
            <div className="preview-right-block">
                <div className="preview-block">
                    <canvas id="canvas-bg" styles="z-index: 1;"><img id="canvas-img-bg" /></canvas>
                    <canvas id="canvas-device" styles="z-index: 2;"><img id="canvas-img-device" /></canvas>
                    <canvas id="canvas-text" styles="z-index: 3;"><img id="canvas-img-text" /></canvas>
                </div>
            </div>
        </div>
    );
}