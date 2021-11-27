import React, { useReducer } from "react";
import { CanvasWindow } from "./CanvasWindow";

export default Context = React.createContext();

export function Context(){
    const [state, dispatch] = useReducer(dataReducer, initialState);
}

export const deviceSize = {
    "iPhone 13": {width: 1242, height: 2688, image: ""},
    "iPhone X": {width: 1125, height: 2436, image: ""},
    "iPhone 8 Plus": {width: 1242, height: 2208, image: ""},
    "iPhone 8": {width: 750, height: 1334, image: ""},
    "iPad Pro 12.9": {width: 2048, height: 2732, image: ""},
    "iPad Pro 11": {width: 1668, height: 2388, image: ""},
    "iPad Air": {width: 1668, height: 2224, image: ""}
}
export const backgroundTypeEnum = Object.freeze({"single":1, "gradient":2, "image": 3})

export const deviceInitPosition = {
    xPos: 1500,
    yPos: 250,
    size: 2,
}

const initialState = {
    imageFiles: deviceSize,
    containImage: false,
    deviceType: deviceSize["iPhone 13"],
    deviceXPos: deviceInitPosition.xPos,
    deviceYPos: deviceInitPosition.yPos,
    deviceSize: 2,
    fontFamily: 'Arial',
    fontSize: 80,
    fontWeight: 100,
    lineHeight: 90,
    fontColor: '#ffffff',
    fontAlign: 'center',
    inputText: '',
    backgroundType: backgroundTypeEnum.single,
    backgroundImageFile: "",
    backgroundDirection: 0,
    backgroundColor: [{ id: 0, color: '#24C6DC', colorPos: 0 },{ id: 1, color: '#514A9D', colorPos: 100}],
};

function dataReducer(state, action) {
    console.log(action);
    switch (action.type) {
        case 'updateDeviceXPosition':
            return { ...state, 'deviceXPos': action.deviceXPos};
        case 'updateDeviceYPosition':
            return { ...state, 'deviceYPos': action.deviceYPos};
        case 'updateBackgroundDirection':
            return { ...state, 'backgroundDirection': action.backgroundDirection};
        case 'updateDeviceSize':
            return { ...state, 'deviceSize': action.deviceSize};
        case 'updateTextStr':
            return { ...state, 'inputText': action.inputText};
        case 'updateTextAlignment':
            return { ...state, 'fontAlign': action.fontAlignment};
        case 'updateTextFontFamily':
            return { ...state, 'fontFamily': action.fontFamily};
        case 'updateTextFontWeight':
            return { ...state, 'fontWeight': action.fontWeight};
        case 'updateTextFontSize':
            return { ...state, 'fontSize': action.fontSize};
        case 'updateTextLineHeight':
            return { ...state, 'lineHeight': action.lineHeight};
        case 'updateTextFontColor':
            return { ...state, 'fontColor': action.fontColor};
        case 'updateInputImage':
            deviceSize[action.imageType].image = action.imageFiles
            return { ...state, 'imageFiles': deviceSize, 'containImage': action.containImage};
        case 'updateBackgroundImage':
            return { ...state, 'backgroundImageFile': action.backgroundImageFile};
        case 'updateBackgroundColor':
            return { ...state, 'backgroundType': action.backgroundType, 'backgroundColor': action.backgroundColor};
        default: 
            return state
    }
};

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, initialState);
  
    return (
      <Context.Provider value={{ state, dispatch }}><CanvasWindow /></Context.Provider>
    );
};