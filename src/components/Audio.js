import React from 'react';
//https://stackoverflow.com/questions/14623947/web-audio-api-how-do-i-play-a-mono-source-in-only-left-or-right-channel
//https://stackoverflow.com/questions/60946825/adding-panner-spacial-audio-to-web-audio-context-from-a-webrtc-stream-not-work
export const Audio2 = ({ track, index }) => {
    //console.log(track.getParticipantId())
    //console.log(track)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const audioSourceNode = audioCtx.createMediaStreamSource(track.stream);
    var panNode = audioCtx.createStereoPanner();
    audioSourceNode .connect(panNode);
    panNode.connect(audioCtx.destination);
    panNode.pan.value = -1;
    console.log("PRINTING PANNER NODE_____________");
    console.log(panNode);

    if (track && track.isLocal())
        //track.startEffect();
        //track.setEffect(-100, 1, -100, 2);
        /*
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioCtx = new AudioContext();
        var source = audioCtx.createMediaStreamSource(track.stream);
        var panNode = audioCtx.createStereoPanner();
        source.connect(panNode);
        panNode.connect(audioCtx.destination);
        panNode.pan.value = -1;

         */
        return null;
    return <audio autoPlay='1' ref={(ref) => ref && track.attach(ref)} />;
};