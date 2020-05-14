export default ({fn= () => {}, dur = 800 }) => {
    if (window.DeviceMotionEvent){
        window.addEventListener('devicemotion',deviceMotionHandler, false);
    } else {
        alert('不支持devicemotion事件');
    }
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastTime = 0;
    
    function deviceMotionHandler(event){
        let x,y,z, acceleration,currentTime;
        currentTime = Date.now();

        acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;

        // 灵敏度
        if ( Math.abs(x-lastX) > 12 || Math.abs(y-lastY) > 13 || Math.abs(z - lastZ) > 14 ){  
             // 最大频路是800ms一次
             if( Math.abs(currentTime - lastTime) > dur){
                 
                fn(currentTime - lastTime);
                lastTime = currentTime;
             }

            
        }

        lastX = x;
        lastY = y;
        lastZ = z;
        
        
    }
}