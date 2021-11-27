import React, { useState }  from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export function TopMenu() {

  return (
    <Box className="top-menu" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <MenuIcon />
                <Link to="/"><Button>Main</Button></Link>
                <Link to="/preview"><Button>Image</Button></Link>
            </Toolbar>
        </AppBar>
    </Box>
  );
}