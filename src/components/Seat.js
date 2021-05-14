import React from 'react';
import { Circle } from './Circle';
import { Rectangle } from "./Rectangle";
import leftData from './filters/Left156.json';
import rightData from './filters/Right156.json';
import { getAngles } from './getAngles.js';
import { getWidthForSeats, getDistanceRatioForSeats } from '../utils';


export const Seat = ({ track, index, length, audioTrack }) => {
  const seatSize = getWidthForSeats(length);
  const disanceRatio = getDistanceRatioForSeats(length);
  const angle = (360 / length) * index;
  const horizontal = Math.cos(angle * 2 * Math.PI / 360) * disanceRatio;
  const vertical = Math.sin(angle * 2 * Math.PI / 360) * disanceRatio;
  var angles = getAngles(horizontal, vertical);
  
  if (audioTrack != undefined && audioTrack.isLocal()){
    return (
        <Rectangle size={seatSize} horizontal={horizontal} vertical={vertical}>
          <video height={seatSize} style={{ flexShrink: 0 }} autoPlay='1' key={`track_${track.getId()}`} ref={(ref) => ref && track.attach(ref)} />
        </Rectangle>
    );
  }

  if (audioTrack != undefined && !audioTrack.isLocal()){

    // Create Audio Context
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();

    // Get the audio stream
    var source = audioCtx.createMediaStreamSource(audioTrack.stream);

    // Create filtering nodes
    var gainNode = audioCtx.createGain();
    var convolver = audioCtx.createConvolver();

    // Filters for left HRTF
    //var h_right = [4.541669e-08,-1.522935e-07,-2.724054e-06,-1.636506e-05,-5.741999e-05,-3.222024e-05,-1.305478e-04,-4.076917e-04,-2.721124e-04,-3.834076e-04,-4.279611e-04,-6.850296e-04,-1.182920e-03,-8.834847e-04,-4.940699e-04,-9.595191e-04,-1.041492e-03,-1.257017e-03,-8.896408e-04,-7.436180e-04,-1.333577e-03,-1.090711e-03,2.407692e-04,-1.756800e-03,-1.840209e-03,-1.052016e-03,-2.139444e-03,-3.615122e-04,-1.516918e-03,-1.115007e-03,1.655603e-04,-2.049618e-03,-2.351609e-03,-1.455118e-04,-2.377738e-04,-2.393584e-03,-8.408998e-04,8.308770e-04,3.144132e-04,-1.530175e-03,-9.089636e-04,-7.333953e-04,-4.000264e-03,-2.682718e-03,-2.120588e-04,-4.661520e-04,-6.793269e-04,-1.854368e-03,-1.114090e-03,1.498723e-02,8.749353e-02,1.389069e-01,9.655995e-02,8.451079e-02,9.365027e-02,5.056775e-02,-8.688477e-03,-4.617174e-02,-4.587600e-02,-3.873731e-02,-4.261973e-02,-4.644338e-02,-4.549774e-02,-3.181428e-02,-4.334032e-03,1.735273e-03,-2.323404e-02,-4.154136e-02,-3.602354e-02,-1.981152e-02,-2.598964e-02,-4.173964e-02,-3.944479e-02,-3.488880e-02,-3.661948e-02,-3.634024e-02,-3.249290e-02,-2.865435e-02,-2.854444e-02,-2.965137e-02,-2.538283e-02,-2.328662e-02,-2.237192e-02,-1.437875e-02,-8.671385e-03,-8.149146e-03,-4.127353e-03,-3.521398e-04,8.881232e-04,-2.948574e-03,-9.161793e-03,-1.114903e-02,-1.230386e-02,-1.436200e-02,-1.606669e-02,-1.402114e-02,-1.017078e-02,-5.847050e-03,-2.591262e-04,2.539834e-03,3.041011e-03,2.796269e-03,3.550741e-03,4.355983e-03,3.678987e-03,2.954749e-03,5.298173e-03,4.489630e-03,1.459454e-03,-8.537993e-04,-2.865004e-03,-4.318566e-03,-4.764929e-03,-2.163127e-03,1.558713e-03,4.660842e-03,7.787592e-03,1.058530e-02,1.249867e-02,9.643336e-03,2.594307e-03,-5.013621e-03,-1.127997e-02,-1.302886e-02,-1.006532e-02,-6.025973e-03,-3.570327e-03,-1.494260e-03,2.942984e-03,6.248361e-03,7.825316e-03,7.170382e-03,3.716879e-03,2.456770e-03,2.647041e-03,4.233373e-03,4.618423e-03,2.419100e-03,1.487416e-03,3.672934e-03,4.425557e-03,3.546762e-03,4.797919e-03,3.124487e-03,2.197868e-03,2.790302e-03,2.892195e-03,2.478870e-03,1.793782e-03,2.633078e-03,1.877279e-03,1.917420e-03,1.201842e-03,1.653906e-04,3.670070e-04,1.068422e-03,1.063114e-03,1.947081e-03,3.706548e-03,5.111329e-03,5.959895e-03,5.562438e-03,4.467688e-03,3.432931e-03,2.682512e-03,2.657010e-03,2.294487e-03,2.382538e-03,3.175935e-03,3.733532e-03,4.274767e-03,3.900313e-03,3.551511e-03,3.697382e-03,3.267680e-03,2.394310e-03,1.816570e-03,1.472668e-03,1.192665e-03,1.097367e-03,6.712559e-04,4.156967e-04,5.134594e-04,4.580959e-04,3.644909e-04,2.651622e-04,2.020758e-04,1.969170e-04,2.296600e-04,1.962746e-04,2.268973e-04,3.363826e-04,3.439419e-04,2.777474e-04,2.199426e-04,1.761238e-04,1.109860e-04,4.630207e-05,1.202415e-05];
    //var h_left = [-1.049537e-08,2.807712e-07,1.914083e-06,-3.156873e-05,-4.579430e-05,-2.214457e-04,-9.693524e-05,-4.863716e-04,-3.342360e-04,-1.129662e-03,-7.814010e-04,-4.888201e-03,5.250153e-03,3.667052e-02,7.194056e-03,-4.265136e-02,-1.095238e-02,7.099368e-03,1.674884e-02,-4.025399e-02,5.687631e-02,-7.459063e-02,7.169526e-01,1.133728e+00,-2.026029e-01,-6.404608e-02,-4.913352e-01,-5.746511e-01,-1.849831e-01,-4.178876e-01,6.251215e-01,5.734592e-01,-5.823404e-01,-4.573695e-01,5.126212e-02,4.218038e-02,4.834155e-02,-1.080666e-01,-8.106001e-02,3.259850e-02,-3.246915e-02,-5.860216e-03,-8.084138e-02,-5.910063e-02,-1.545932e-02,1.355221e-02,-7.393804e-02,-9.909847e-02,-1.373232e-02,5.290277e-02,-3.713714e-02,-1.206117e-01,-3.750505e-02,2.662158e-03,1.838373e-02,-2.647222e-02,-2.692072e-02,-1.322628e-02,-1.732075e-03,1.512840e-02,1.057737e-02,3.979574e-03,4.599166e-03,1.748929e-02,-4.829596e-03,-3.110669e-02,-4.403144e-02,2.188360e-02,5.387240e-02,1.228114e-02,1.103764e-02,1.482537e-02,1.136530e-02,1.051814e-02,9.023626e-03,6.193900e-03,4.304833e-03,-3.766955e-03,-8.011407e-03,-1.149347e-02,-2.144465e-02,-1.305013e-02,6.844405e-03,1.090363e-02,1.423943e-02,1.439798e-02,2.304073e-02,2.764571e-02,1.555029e-02,8.140821e-03,1.570344e-03,1.220529e-02,1.828223e-02,-1.019502e-03,3.201716e-03,3.726729e-03,-1.771150e-03,-1.974021e-03,-1.347995e-02,6.278984e-04,-4.809944e-05,3.046494e-03,2.028728e-02,-1.929114e-03,4.733844e-03,1.391268e-02,7.879133e-03,1.425245e-02,1.188965e-03,-1.894863e-03,1.102831e-03,-8.539935e-03,-9.788848e-03,-1.808553e-03,-1.251267e-03,4.856406e-03,1.698785e-02,2.107288e-02,2.898378e-02,1.365921e-02,-4.576334e-03,-8.961780e-03,-2.072974e-02,-1.191610e-02,-8.876485e-04,6.246088e-03,1.043027e-02,-2.512744e-04,-1.400989e-04,9.259483e-05,-3.399500e-03,-2.431991e-03,-4.200298e-03,-1.917733e-03,5.878065e-03,5.561041e-03,4.762528e-03,1.031269e-02,7.987875e-03,1.088181e-03,-7.779685e-04,-1.235170e-03,5.887787e-04,2.578379e-03,2.110823e-03,6.731790e-03,7.433989e-03,2.471095e-03,-4.900898e-03,-7.342951e-03,-6.185918e-03,-4.348775e-03,-8.906651e-04,-6.716553e-04,1.034057e-03,3.212020e-03,2.149101e-03,2.548947e-04,-3.028948e-04,-3.530187e-05,2.611089e-03,2.504208e-03,5.534237e-04,1.223495e-03,1.226912e-03,-1.563625e-04,-1.452051e-03,-1.310696e-03,-1.738441e-03,-3.045580e-03,-2.806713e-03,-1.947327e-03,-2.213924e-03,-1.423125e-03,-4.273691e-04,-1.193000e-03,-1.194617e-03,-1.448030e-03,-1.621206e-03,-6.198973e-04,-1.564164e-03,-3.834373e-03,-2.861538e-03,1.657784e-04,-4.302064e-06,-7.224687e-04,5.535665e-05,4.064251e-04,2.873156e-04,-7.000260e-04,-6.061774e-04,3.384021e-04,-1.132065e-04,-5.973211e-04,-2.664099e-04,-8.356843e-06,-2.725491e-05,-7.112672e-05,-5.502908e-05];

    // Get left and right filters
    var h_right = rightData[angles];
    var h_left = leftData[angles];

    var arrayBuffer = audioCtx.createBuffer(2, 200,44100);

    if (rightData[angles] != undefined) {
      arrayBuffer.copyToChannel(Float32Array.from(h_right), 1, 0);
      arrayBuffer.copyToChannel(Float32Array.from(h_left), 0, 0)
    }

    //convolver.buffer = audioCtx.decodeAudioData(arrayBuffer);

    convolver.buffer = arrayBuffer;
    gainNode.gain.setValueAtTime(4, audioCtx.currentTime);

    var bufferSource = audioCtx.createBufferSource();
    bufferSource.buffer = arrayBuffer;

    source.connect(convolver);
    convolver.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    //source.connect(splitter);


    //splitter.connect(gainNode, 1);

    //splitter.connect(convolverRight,1);
    //splitter.connect(convolverLeft,0);

    //gainNode.connect(merger,0,0);
    //convolverLeft.connect(merger,0,0);
    //convolverRight.connect(merger,0,1);

    //splitter.connect(merger,1,1);
    //splitter.connect(merger,0,0);

    //merger.connect(audioCtx.destination);
    /*
    // Create Panner Node
    var panner = audioCtx.createStereoPanner();

    if (horizontal > 0) {
      console.log('right');
      panner.pan.value = 1;

    }else if(horizontal < 0) {
      console.log('left');

      panner.pan.value = -1;
    }
    else{
      console.log('center');

      panner.pan.value = 0;

    }

    // Connect source->panner->destination node
    source.connect(panner);
    panner.connect(audioCtx.destination);
*/
    }

  if(audioTrack != undefined) {
    return (
        <Rectangle size={seatSize} horizontal={horizontal} vertical={vertical}>
          <audio autostart='true' ref={(ref) => ref && audioTrack.attach(ref)}/>
          <video height={seatSize} style={{ flexShrink: 0 }} autoPlay='1' key={`track_${track.getId()}`} ref={(ref) => ref && track.attach(ref)} />
        </Rectangle>

    );
  }
  else{
    return (
        <Rectangle size={seatSize} horizontal={horizontal} vertical={vertical}>
          <video height={seatSize} style={{ flexShrink: 0 }} autoPlay='1' key={`track_${track.getId()}`} ref={(ref) => ref && track.attach(ref)} />
        </Rectangle>

    );
  }
};
