import React, { useState, useEffect, useReducer, useContext }  from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import TextField from '@mui/material/TextField';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { backgroundTypeEnum, deviceInitPosition, deviceSize, Context } from "./ImageContext.js";
import { v4 as uuidv4 } from 'uuid';


export function SideMenu() {
    const Input = styled(MuiInput)`width: 42px;`;

    const safeFontFamilyList = ["Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman",
     "Georgia", "Garamond", "Courier New", "Brush Script MT"];
     
    const initDeviceSetting = {
        deviceXPos: deviceInitPosition.xPos,
        deviceYPos: deviceInitPosition.yPos,
        size: deviceInitPosition.size,
    }

    const initTextSetting = {
        inputText: "",
        inputAlignment: "center",
        inputFontFamily: "Arial",
        inputFontWeight: 400,
        inputFontSize: 80,
        inputFontColor: '#ffffff',
        inputLineHeight: 90
    }

    const initColorLogicLogic = [{ id: 0, color: '#24C6DC', colorPos: 0 },{ id: 1, color: '#514A9D', colorPos: 100}];
    const screenImageMap = new Map();
    let typingTimer = null;

    const [openSizeSetting, setOpenSizeSetting] = React.useState(true);
    const [openScreenshot, setOpenScreenshot] = React.useState(true);
    const [openBackground, setOpenBackground] = React.useState(true);
    const [openText, setOpenText] = React.useState(true);
    const {state, dispatch } = useContext(Context);
    const [backgroundType, setBackgroundType] = React.useState(backgroundTypeEnum.single);

    const [deviceSetting, setDeviceSetting] = React.useState(initDeviceSetting);
    const [textSetting, setTextSetting] = React.useState(initTextSetting);
    const [colorList, setColorList] = React.useState(initColorLogicLogic);
    const [backgroundDirection, setBackgroundDirection] = React.useState(0);

    const theme = createTheme({
        typography: {
            fontSize: 12,
        },
    });

    const rgbToHex = (r, g, b) => {
        var rgb = (r << 16) | (g << 8) | b
        return '#' + rgb.toString(16).padStart(6, 0)  
    }

    function ValidateFileUpload(e) {
        const imageFile = e.target.files[0];
        
        if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
            alert('Please select valid image.');
            return false;
        }
        return true
    }

    const updateSizeSettingList = () => {
        setOpenSizeSetting(!openSizeSetting);
    }

    const updateScreenshotList = () => {
        setOpenScreenshot(!openScreenshot);
    }

    const updateBackgroundList = () => {
        setOpenBackground(!openBackground);
    }

    const updateOpenText = () => {
        setOpenText(!openText);
    }

    const updateBackgroundDirection = (num) => {
        let setNum = parseInt(num)
        setBackgroundDirection(setNum);
        dispatch({ type: 'updateBackgroundDirection', backgroundDirection: setNum});
    };

    const addBackgroundColorNum = () => {
        let setNum = uuidv4();
        let newList = [...colorList, { id: setNum, color: '#f9d39a', colorPos: 0 }];
        setColorList(newList);
    }

    const deleteBackgroundColorNum = (num) => {
        let newList = [...colorList];
        newList.splice(num,1);
        console.log("-"+num);
        setColorList(newList);
    }

    const updateBackgroundType = (type) => {
        let setType = parseInt(type);
        setBackgroundType(setType);
        dispatch({ type: 'updateBackgroundColor', backgroundType: type, backgroundColor: colorList});
    };

    const updateInputText = (str) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            dispatch({ type: 'updateTextStr', inputText: str});
        }, 500);
    }

    const updateDeviceSize = (e, size) => {
        setDeviceSetting(prevState => ({ ...prevState, size: size }))
        dispatch({ type: 'updateDeviceSize', deviceSize: size});
    }

    const updateDeviceXPosition = (pos) => {
        const re = /^[0-9\b]{1,4}$/;
        if (pos === '' || re.test(pos)) {
            setDeviceSetting(prevState => ({ ...prevState, deviceXPos: pos }))
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                dispatch({ type: 'updateDeviceXPosition', deviceXPos: pos});
            }, 300);
        }
    }

    const updateDeviceYPosition = (pos) => {
        const re = /^[0-9\b]{1,3}$/;
        if (pos === '' || re.test(pos)) {
            setDeviceSetting(prevState => ({ ...prevState, deviceYPos: pos }))
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                dispatch({ type: 'updateDeviceYPosition', deviceYPos: pos});
            }, 300);
        }
    }

    const handleAlignment = (newAlignment) => {
        console.log(newAlignment);
        setTextSetting(prevState => ({ ...prevState, inputAlignment: newAlignment }))
        dispatch({ type: 'updateTextAlignment', fontAlignment: newAlignment});
    };

    const updateTextFontFamily = (fontFamily) => {
        setTextSetting(prevState => ({ ...prevState, inputFontFamily: fontFamily }))
        dispatch({ type: 'updateTextFontFamily', fontFamily: fontFamily});
    }

    const updateTextFontWeight = (fontWeight) => {
        setTextSetting(prevState => ({ ...prevState, inputFontWeight: fontWeight }))
        dispatch({ type: 'updateTextFontWeight', fontWeight: fontWeight});
    }


    const updateLineHeight = (lineHeight) => {
        const re = /^[0-9\b]{1,3}$/;
        if (lineHeight === '' || re.test(lineHeight)) {
            setTextSetting(prevState => ({ ...prevState, inputLineHeight: lineHeight }))
            dispatch({ type: 'updateTextLineHeight', lineHeight: lineHeight});
        }
    }

    const updateTextFontSize = (fontSize) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            setTextSetting(prevState => ({ ...prevState, inputFontSize: fontSize }))
            dispatch({ type: 'updateTextFontSize', fontSize: fontSize});
        }, 8);
    }

    const updateBackgroundColor = (type, newList) => {
        dispatch({ type: 'updateBackgroundColor', backgroundType: type, backgroundColor: newList});
    }

    const uploadImage = (e, deviceKey) =>{
        dispatch({ type: 'updateInputImage', imageFiles: e.target.files[0], imageType: deviceKey, containImage: true});
    }

    const uploadBackgroundImage = (e) =>{
        if(ValidateFileUpload(e)){
            console.log(e.target.files[0]);
            dispatch({ type: 'updateBackgroundImage', backgroundImageFile: e.target.files[0]});
        }
    }

    const backgroundColorBlockChange = (setId, colorHex) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            if(hexColorValidation(colorHex)){
                let newList = colorList.map(item => {
                    if(item.id === setId){
                        item.color = colorHex
                    }
                    return item
                });
                updateBackgroundColor(backgroundType, newList);
                setColorList(newList);
            }
        }, 8);
    }

    const backgroundColorPositionChange = (setId, pos) => {
        let newList = colorList.map(item => {
            if(item.id === setId){
                item.colorPos = pos
            }
            return item
        });
        updateBackgroundColor(backgroundType, newList);
        setColorList(newList);
    }

    const hexColorValidation = (color) =>{
        let rs = /^#([0-9A-F]{3}){1,2}$/i;
        if(color.match(rs)){
            return true
        }
        return false
    }

    const updateFontColor = (color) => {
        if(hexColorValidation(color)){
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                setTextSetting(prevState => ({...prevState, inputFontColor: color}));
                dispatch({ type: 'updateTextFontColor', fontColor: color});
            }, 10);
        }
    }

    const setScreenshotImageBlock = () => {
        let tempScreenImageList = [];
        for (let key of Object.keys(deviceSize)) {
            screenImageMap.set(key, "");
            tempScreenImageList.push(
                <div key={key}>
                    <Typography component="legend" sx={{ width: 200 }}>{key} ({deviceSize[key].width}x{deviceSize[key].height})</Typography>
                    <ListItem>
                        <input type="file" onChange={ (e)=>uploadImage(e, key)} />
                    </ListItem>
                </div>
            );
        }
        return tempScreenImageList;
    }

    const setFontFamilyBlock = () =>{
        let tempFontFamilyList = [];
        for(let i=0; i<safeFontFamilyList.length; i++){
            tempFontFamilyList.push(
                <MenuItem key={safeFontFamilyList[i]} value={ safeFontFamilyList[i] }>{ safeFontFamilyList[i] }</MenuItem>
            );
        }
        return tempFontFamilyList
    }

    const setFontWeightBlock = () =>{
        let fontWeightList = [100,200,300,400,500,600,700,800,900];
        let tempFontWeightList = [];
        for(let i=0; i<=fontWeightList.length-1; i++){
            tempFontWeightList.push(
                <MenuItem key={fontWeightList[i]} value={ fontWeightList[i] }>{ fontWeightList[i]}</MenuItem>
            );
        }
        return tempFontWeightList
    }

    const setBackgroundBlock = () =>{
        if(backgroundType === backgroundTypeEnum.single){
            return (
                <ListItem>
                    <div>
                        <div className="background-color-block">
                            <input id="color" type="color" value={colorList[0].color} onChange={e => backgroundColorBlockChange(colorList[0].id, e.target.value)}/>
                        </div>
                        <TextField size="small" label="Color" value={colorList[0].color} onChange={e => backgroundColorBlockChange(colorList[0].id, e.target.value)}/>
                    </div>
                </ListItem>
            );
        }else if(backgroundType === backgroundTypeEnum.gradient){
            let blockPickerList = [];
            if(colorList.length > 5){
                blockPickerList.push(
                    <ListItem>
                        <ToggleButtonGroup color="primary" value={backgroundDirection} onChange={e => updateBackgroundDirection(e.target.value)} exclusive>
                            <ToggleButton value={0}>vertical</ToggleButton>
                            <ToggleButton value={1}>horizontal</ToggleButton>
                        </ToggleButtonGroup>
                        <IconButton aria-label="delete" disabled color="primary">
                            <AddCircleIcon />
                        </IconButton>
                    </ListItem>
                )
            }else{
                blockPickerList.push(
                    <ListItem>
                        <ToggleButtonGroup color="primary" value={backgroundDirection} onChange={e => updateBackgroundDirection(e.target.value)} exclusive>
                            <ToggleButton value={0}>vertical</ToggleButton>
                            <ToggleButton value={1}>horizontal</ToggleButton>
                        </ToggleButtonGroup>
                        <IconButton aria-label="delete" onClick={e => addBackgroundColorNum() } color="primary">
                            <AddCircleIcon />
                        </IconButton>
                    </ListItem>
                )
            }
            for(let i=0; i<colorList.length; i++){
                if(colorList.length < 3){
                    blockPickerList.push(
                        <ListItem key={colorList[i].id}>
                            <div className="background-color-block">
                                <input id="color" type="color" value={colorList[i].color} onChange={e => backgroundColorBlockChange(colorList[i].id, e.target.value)}/>
                            </div>
                            <TextField width="100px" size="small" label="Color" value={colorList[i].color} onChange={e => backgroundColorBlockChange(colorList[i].id, e.target.value)}/>
                            <TextField width="100px" size="small" label="Position" defaultValue={colorList[i].colorPos} onChange={e => backgroundColorPositionChange(colorList[i].id, e.target.value)}/>
                            <IconButton aria-label="delete" disabled color="primary">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    )
                }else{
                    blockPickerList.push(
                        <ListItem key={colorList[i].id}>
                            <div className="background-color-block">
                                <input id="color" type="color" value={colorList[i].color} onChange={e => backgroundColorBlockChange(colorList[i].id, e.target.value)}/>
                            </div>
                            <TextField width="100px" size="small" label="Color" value={colorList[i].color} onChange={e => backgroundColorBlockChange(colorList[i].id, e.target.value)}/>
                            <TextField width="100px" size="small" label="Position" defaultValue={colorList[i].colorPos} onChange={e => backgroundColorPositionChange(colorList[i].id, e.target.value)}/>
                            
                            <IconButton aria-label="delete" onClick={e => deleteBackgroundColorNum(i) } color="primary">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    )
                }
            }
            return blockPickerList;
        }else if(backgroundType === backgroundTypeEnum.image){
            return (<ListItem>
                <ListItemIcon><StarBorder /></ListItemIcon>
                <input type="file" onChange={uploadBackgroundImage} />
            </ListItem>)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <List className="side-main-list" subheader={<ListSubheader component="div" id="nested-list-subheader">Screenshot Setup</ListSubheader>}>
                <ListItemButton className="upload-image-submenu" onClick={updateSizeSettingList}>
                    <ListItemIcon>
                    <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Size" />
                    {openSizeSetting ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSizeSetting} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem>
                        <ToggleButtonGroup value={deviceSetting.size} exclusive onChange={ updateDeviceSize } aria-label="text alignment">
                            <ToggleButton value={1} aria-label="left aligned">
                                <CropPortraitIcon fontSize="small" />
                            </ToggleButton>
                            <ToggleButton value={2} aria-label="centered">
                                <CropPortraitIcon fontSize="medium" />
                            </ToggleButton>
                            <ToggleButton value={3} aria-label="right aligned">
                                <CropPortraitIcon fontSize="large" />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ListItem>
                    <ListItem>
                        <TextField size="small" label="Position X" value={deviceSetting.deviceXPos} onChange={e => updateDeviceXPosition(e.target.value)}/>
                        <TextField size="small" label="Position Y" value={deviceSetting.deviceYPos} onChange={e => updateDeviceYPosition(e.target.value)}/>
                    </ListItem>
                    </List>
                </Collapse>
                <ListItemButton className="upload-image-submenu" onClick={updateScreenshotList}>
                    <ListItemIcon>
                    <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Screenshot" />
                    {openScreenshot ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openScreenshot} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        { setScreenshotImageBlock() }
                    </List>
                </Collapse>
                <ListItemButton className="set-background-submenu" onClick={updateBackgroundList}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Background" />
                    {openBackground ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openBackground} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                            <ToggleButtonGroup color="primary" value={backgroundType} exclusive onChange={e => updateBackgroundType(e.target.value)}>
                            <ToggleButton value={backgroundTypeEnum.single}>Single Color</ToggleButton>
                            <ToggleButton value={backgroundTypeEnum.gradient}>Gradient</ToggleButton>
                            <ToggleButton value={backgroundTypeEnum.image}>Image</ToggleButton>
                            </ToggleButtonGroup>
                        </ListItem>
                        { setBackgroundBlock() }
                    </List>
                </Collapse>
                <ListItemButton onClick={updateOpenText}>
                    <ListItemIcon>
                    <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Text" />
                    {openText ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openText} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem>
                        <ToggleButtonGroup value={textSetting.inputAlignment} exclusive onChange={ (e, value) => handleAlignment(value)} aria-label="text alignment">
                            <ToggleButton value="left" aria-label="left aligned">
                                <FormatAlignLeftIcon />
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered">
                                <FormatAlignCenterIcon />
                            </ToggleButton>
                            <ToggleButton value="right" aria-label="right aligned">
                                <FormatAlignRightIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ListItem>
                    <ListItem>
                        <Box sx={{ minWidth: 300 }}>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-label">Font Family</InputLabel>
                                <Select value={textSetting.inputFontFamily} label="Font-Family" onChange={ e => updateTextFontFamily(e.target.value) }>
                                { setFontFamilyBlock() }
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 100 }}>
                                <InputLabel id="demo-simple-select-label">Font Weight</InputLabel>
                                <Select value={textSetting.inputFontWeight} label="Font-Family" onChange={ e => updateTextFontWeight(e.target.value) }>
                                { setFontWeightBlock() }
                                </Select>
                            </FormControl>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box sx={{ width: 250 }}>
                            <Typography id="input-slider" gutterBottom>Font Size</Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Slider value={textSetting.inputFontSize}  aria-labelledby="input-slider" onChange={ e => updateTextFontSize(e.target.value) } />
                                </Grid>
                                <Grid item>
                                    <Input value={textSetting.inputFontSize} size="small" onChange={ e => updateTextFontSize(e.target.value) } inputProps={{ step: 10,  min: 0, max: 100, type: 'number', 'aria-labelledby': 'input-slider', }} />
                                </Grid>
                            </Grid>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <TextField size="small" label="Line-Height" value={textSetting.inputLineHeight} onChange={e => updateLineHeight(e.target.value)}/>
                    </ListItem>
                    <ListItem>
                        <div>
                            <div className="background-color-block">
                                <input id="color" type="color" value={textSetting.inputFontColor} onChange={e => updateFontColor(e.target.value)}/>
                            </div>
                            <TextField size="small" value={textSetting.inputFontColor} onChange={e => updateFontColor(e.target.value)}/>
                        </div>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <TextField size="small" fullWidth id="outlined-basic" label="Text" variant="outlined" onChange={e => updateInputText(e.target.value)} multiline rows={4} />
                    </ListItem>
                    </List>
                </Collapse>
            </List>
        </ThemeProvider>
    );

}