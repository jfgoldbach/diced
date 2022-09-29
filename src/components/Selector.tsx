import { useLoader } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Selector(props) {
    const positions = [[-0.8,0,0], [0,0,0], [0.8,0,0], [0, 0.8, 0], [0,0,0], [0,-0.8,0], [0,0,0.8], [0,0,0], [0,0,-0.8]]
    const rotations = [[0, Math.PI/2, 0], [Math.PI/2, 0, 0], [0,0,0]]
  
    const [over, setOver ] = useState(0)
  
    useEffect(() => {
      over != 0
        ? document.body.style.cursor = [4,5,6].includes(over)? "ew-resize" : "ns-resize"
        :document.body.style.cursor = "grab"
    }, [over])
  
    const show = useLoader(GLTFLoader, '/selectors/selector_visualizer.gltf')
  
    return(
      <group onPointerOut={() => {setOver(0)}}>
        <Suspense>
          <primitive 
            object={useLoader(GLTFLoader, '/selectors/selector.gltf').scene} 
            scale={0.4} 
            onPointerOver={(e) => {setOver(parseInt(e.object.material.name))}} 
            />
          {over !== 0 && 
            <primitive 
                object={show.scene} 
                rotation={rotations[Math.floor((over-1)/3)]} 
                position={positions[over-1]} 
                scale={0.4} 
            />}
        </Suspense>
      </group>
    )
}

export default Selector