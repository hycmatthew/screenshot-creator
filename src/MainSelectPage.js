import React from "react";
import { TopMenu } from './TopMenu.js'; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import tempImage from './asset/Milky_Way.jpg';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export function MainSelectPage() {

    let cardList = [1,2,3,4,5,6,7];

    function createCard(id){
        return (
            <Card key={id} className="image-card" sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="cannot download the image"
                    height="140"
                    image={tempImage}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">Lizard</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Link to={{ pathname: '/preview', state: { previewId: id }}}><Button size="small">Learn More</Button></Link>
                </CardActions>
            </Card>
        );
    }

    return (
        <div className="web-page">
            <TopMenu />
            <div className="main-page">
                { cardList.map((list) => createCard(list) )}
            </div>
        </div>
    );
}