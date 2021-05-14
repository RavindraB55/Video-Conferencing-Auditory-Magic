import React from 'react';


export function getAngles (horizontal, vertical){

    var azimuth;
    var elevation;
    var angles;

    if (horizontal <= -60){
        azimuth = "neg45";
    }
    else if (horizontal > -60 && horizontal <= -20){
        //azimuth = "neg25";
        azimuth = "neg25";
    }
    else if (horizontal > -20 && horizontal <= 20){
        azimuth = "pos0";
    }
    else if (horizontal > 20 && horizontal <= 60){
        azimuth = "pos25";
    }
    else if (horizontal > 60){
        azimuth = "pos45";
    }

    if (vertical <= -30){
        elevation = "neg45";
    }
    else if (vertical > -30 && vertical <= -10){
        elevation = "neg28";
    }
    else if (vertical > -10 && vertical <= 10){
        elevation = "pos0";
    }
    else if (vertical > 10 && vertical <= 30){
        elevation = "pos28";
    }
    else if (vertical > 30){
        elevation = "pos45";
    }

//    return [azimuth, elevation];
    angles = azimuth + elevation;
    return angles;


};
