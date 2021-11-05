import React from 'react'
import Lottie from 'react-lottie'

const LeafAnimation = ({lotti, width, height,speed}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: lotti,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        }
    };

    return (
        <div>
            <Lottie options = {defaultOptions} height = {height} width = {width} speed = {speed}/>
        </div>
    )
}

export default LeafAnimation
