import { useLoader, useFrame } from '@react-three/fiber'
import React, { Suspense, useEffect, useState, useRef, useReducer, useMemo } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'
import { Html } from '@react-three/drei';
import "./Cube.css"


type cubeProps = {
    solved: boolean
    setSolved: React.Dispatch<React.SetStateAction<boolean>>
    mix: boolean
    setMix: React.Dispatch<React.SetStateAction<boolean>>
    mixes: number
    speed: number
    colors: string[]
    rim: string
    reset: boolean
    setReset: React.Dispatch<React.SetStateAction<boolean>>
    controls: boolean
    cameraRef: React.MutableRefObject<any>
}


function Cube(props: cubeProps) {
    const speed = props.speed
    const colors = props.colors
    const rim = props.rim
    const reset = props.reset
    const setReset = props.setReset
    const mix = props.mix
    const camera = props.cameraRef.current

    //[start] relevant to selector
    const positions = [[-0.8,0,0], [0,0,0], [0.8,0,0], [0, 0.8, 0], [0,0,0], [0,-0.8,0], [0,0,0.8], [0,0,0], [0,0,-0.8]]
    const rotations = [[0, Math.PI/2, 0], [Math.PI/2, 0, 0], [0,0,0]]
  
    const [over, setOver ] = useState<number>(0)
    const [scroll, setScroll] = useState<number>(0)
    const scrollRef = useRef<number>() //needed to check current value (useState returns outdated value in functions)
    scrollRef.current = scroll

    const selector = useLoader(GLTFLoader, '/selectors/selector_visualizer.gltf')
  
    useEffect(() => {
        if(!props.controls){
            over !== 0
              ? document.body.style.cursor = [4,5,6].includes(over)? "ew-resize" : "ns-resize"
              :document.body.style.cursor = "grab"
        }
    }, [over])
    //[end] relevant to selector

    
    //[start] relevant to boxes
    const activeReducer = (state, action) => {
        switch(action.over){
                default:
                case 0:
                    return([])
                case 1:
                    const case1 = [layout[0], layout[1], layout[2], layout[9], layout[10], layout[11], layout[17], layout[18], layout[19]]
                    action.activeRef.current = case1
                    return(case1)
                case 2:
                    const case2 =[layout[3], layout[4], layout[5], layout[12], layout[13], layout[20], layout[21], layout[22]]
                    action.activeRef.current = case2
                    return(case2)
                case 3:
                    const case3 =[layout[6], layout[7], layout[8], layout[14], layout[15], layout[16], layout[23], layout[24], layout[25]]
                    action.activeRef.current = case3
                    return(case3)
                case 4:
                    const case4 =[layout[0], layout[1], layout[2], layout[3], layout[4], layout[5], layout[6], layout[7], layout[8]]
                    action.activeRef.current = case4
                    return(case4)
                case 5:
                    const case5 =[layout[9], layout[10], layout[11], layout[12], layout[13], layout[14], layout[15], layout[16]]
                    action.activeRef.current = case5
                    return(case5)
                case 6:
                    const case6 =[layout[17], layout[18], layout[19], layout[20], layout[21], layout[22], layout[23], layout[24], layout[25]]
                    action.activeRef.current = case6
                    return(case6)
                case 7:
                    const case7 =[layout[0], layout[3], layout[6], layout[9], layout[12], layout[14], layout[17], layout[20], layout[23]]
                    action.activeRef.current = case7
                    return(case7)
                case 8: 
                    const case8 =[layout[1], layout[4], layout[7], layout[10], layout[15], layout[18], layout[21], layout[24]]
                    action.activeRef.current = case8
                    return(case8)
                case 9: 
                    const case9 =[layout[2], layout[5], layout[8], layout[11], layout[13], layout[16], layout[19], layout[22], layout[25]]
                    action.activeRef.current = case9
                    return(case9)
        }
    }

    const layoutReducer = (state, action) => {
        let arr = []
        let newLayout = state
        let indicies = []
        let layer = 0
        const finishedLayouts = 
            [["000", "001", "002", "010", "011", "012", "020", "021", "022", "100", "101", "102", "110", "112", "120", "121", "122", "200", "201", "202", "210", "211", "212", "220", "221", "222"]]
        for(let i = 0; i<action.active.length; i++){
            indicies.push(state.findIndex(e => e === action.active[i]))
        }
        switch(action.over){
            default:
                arr = state
            case 0:
                //resets layout
                newLayout = action.baseLayout;
                props.setSolved(true)
                break;
            case 1:
            case 3:
            case 4:
            case 6:
            case 7:
            case 9:
                //cases for all groups of 9 boxes (they dont have the missing box in the center)
                console.log(`length: ${action.active.length}`)
                for(let i = 0; i<action.active.length; i++){
                    let pos = (i*3-(layer*9))+(2-layer)
                    let elem = action.active[pos]
                    arr.push(elem)
                    console.log(`pushed ${elem} at position ${pos}`)
                    if(Math.floor(((i+1)-(layer*3))/3) === 1){
                        layer ++ //adds 1 to layer if end of current layer of 3 boxes is reached
                        console.log("next layer")
                    }
                }
                if(action.scroll < 0){
                    let reverse = arr.reverse()
                    arr = reverse
                }
                for(let i = 0; i<action.active.length; i++){
                    newLayout[indicies[i]] = arr[i]
                }
                break;
            case 2:
            case 5:
            case 8:
                //cases for every group of 8 boxes with missing box in the center
                console.log(`length: ${action.active.length}`)
                for(let i = 0; i<action.active.length+1; i++){
                    //skip if on missing center box:
                    if(i === 4){
                        continue;
                    }
                    let pos = (i*3-(layer*9))+(2-layer)
                    //considerate gap from missing center box:
                    if(pos>3){
                        pos -- 
                    }
                    let elem = action.active[pos]
                    arr.push(elem)
                    console.log(`pushed ${elem} at position ${pos}`)
                    if(Math.floor(((i+1)-(layer*3))/3) === 1){
                        layer ++ //adds 1 to layer if end of current layer of 3 boxes is reached
                        console.log("next layer")
                    }
                }
                if(action.scroll < 0){
                    let reverse = arr.reverse()
                    arr = reverse
                }
                for(let i = 0; i<action.active.length; i++){
                    newLayout[indicies[i]] = arr[i]
                }
                break;
        }

        //check if the cube is completed
        const colors = [["000","001","002","010","011","012","020","021","022"],["020","021","022","120","121","122","220","221","222"],["200","201","202","210","211","212","220","221","222"],
                        ["000","001","002","100","101","102","200","201","202"],["000","010","020","100","110","120","200","210","220"],["002","012","022","102","112","122","202","212","222"]]
        //loop through every side:
        if(action.over !== 0){
            for(let i = 0; i<6; i++){
                let first = state[action.baseLayout.findIndex(e => e === colors[i][0])]
                let colorFound = false
                //loop through every possible color:
                for(let i2 = 0; i2<6; i2++){
                    if(colors[i2].find(e => e === first)){
                        //check if every box is inside checked color:
                        for(let i3 = 1; i3<9; i3++){
                            let curBox = colors[i2].find(e => e === state[action.baseLayout.findIndex(e => e === colors[i][i3])])
                            if(curBox){
                                if(i3 === 8){
                                    colorFound = true
                                }
                            }else {
                                break //box not in current colors array; continue searching in next color
                            }
                        }
                    }
                }
                if(!colorFound){
                    props.setSolved(false)
                    console.log("Cube not completed yet")
                    break //cancel all further search
                }
                if(i === 5 && colorFound){
                    props.setSolved(true)
                    setReset(true)
                    window.alert("🎉 Completed! 🥳")
                }
            }
        }
        
        //if newLayout is valid, return that array
        if(newLayout.length < state.length){
            console.log(`return initial layout, because: ${newLayout.length} is shorter than ${state.length}`)
            return state;
        }else{
            console.log(newLayout)
            return (newLayout)
        }
    }

    const [layout, changeLayout] = useReducer(layoutReducer, ["000", "001", "002", "010", "011", "012", "020", "021", "022", "100", "101", "102", "110", "112", "120", "121", "122", "200", "201", "202", "210", "211", "212", "220", "221", "222"])
    const layoutRef = useRef()
    layoutRef.current = layout
    const baseLayout = ["000", "001", "002", "010", "011", "012", "020", "021", "022", "100", "101", "102", "110", "112", "120", "121", "122", "200", "201", "202", "210", "211", "212", "220", "221", "222"]
    const [active, changeActive] = useReducer(activeReducer, [])
    const [direction, setDirection] = useState("x")
    const [positive, setPositive] = useState(true)
    const activeRef = useRef(active)
    const [negy, setNegy] = useState(false)
    const [camxz, setCamxz] = useState(0)
    const [btnpos, setBtnpos] = useState([[1,1],[1,1]])


    const sound = new Audio('sounds/spin1.wav')
    sound.playbackRate = 200/speed
    const colorOrder = ["white", "orange", "blue", "red", "green", "yellow"]

    function Model(props){
        const ref = useRef<any>()
        const {scene, materials} = useLoader(GLTFLoader, `boxes/${props.name}.gltf`)
        let rotated = 0
        let timeElapsed = 0
        //responsible for actually spinning each box. rotation is adjusted to current delta-time and prevented to go over 90° or pi/2 in each interval
        useFrame((state, delta) => {
            if(active.includes(props.name)){
                let rot = Math.PI/2 * delta * (1000 / speed) * 1.25
                //If the next rotation exceeds 90° or the rotation is not completed in 3 frames, add the missing rotation to complete the rotation
                if((rotated + rot > Math.PI/2 && rotated !== Math.PI/2) || timeElapsed + delta > speed/1000 || (timeElapsed + 3000*delta > speed && rotated + 3*rot < Math.PI/2)){
                    ref.current?.rotateOnWorldAxis(direction, (Math.PI/2 - rotated) * (positive? 1 : -1))
                    rotated = Math.PI/2
                //Standard rotation
                } else if(rotated < Math.PI/2) {
                    ref.current?.rotateOnWorldAxis(direction, rot * (positive? 1 : -1))
                    rotated += rot
                    timeElapsed += delta
                    console.log(rotated)
                } else {} //else statement is necessary
            }
        })
        //change colors:
        useMemo(() => {
            for(const material in materials){
                //only change material color if not black rim:
                if(material !== "black"){
                    materials[material].color.set(colors[colorOrder.findIndex(e => e === material)])
                }
            }
        }, [props.colors])
        //change rim color:
        useMemo(() => {
            for(const material in materials){
                if(material === "black"){
                    materials["black"].color.set(rim)
                }
            }
        }, [rim])
        useEffect(() => {
            if(reset && !mix){
                ref.current?.rotation.set(0,0,0)
            }
        }, [reset])
        return(
            <primitive castShadow ref={ref} object={scene} scale={0.4} />
        )
    }

    useEffect(() => {
        //only change scroll direction if everything regarding rotations of the boxes and states is idle
        const wheelListener = document.addEventListener("wheel", e => {
            if(scrollRef.current === 0 && !props.mix && !props.controls){
                setScroll(e.deltaY)
            }
        })
        return document.removeEventListener("wheel", (wheelListener as unknown) as EventListenerOrEventListenerObject)
    }, [])

    useEffect(() => {
        if(reset){
            changeLayout({active: activeRef.current, over: 0, positive, scroll, baseLayout})
            setReset(false)
        }
    }, [reset])

    useEffect(() => {
        if(over !== 0 && scroll !== 0){
            setPositive(scroll > 0)
            changeActive({over, layout, activeRef})
            setDirection([new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1)][Math.floor((over-1)/3)]) //rotation is on the same axis for every pair of three
            if(speed<300){
                sound.play()
            }
            setTimeout(() => {
                changeLayout({active: activeRef.current, over, positive, scroll, baseLayout})
                changeActive({over: 0})
                setScroll(0)
            }, speed)
        }
    }, [scroll])

    const mixCube = () => {
        for(let i = 0; i<props.mixes; i++)
        setTimeout(() => {
            if(props.mix){
                let randomSection = Math.ceil(Math.random()*9)
                setPositive(true)
                changeActive({over: randomSection, layout, activeRef})
                setDirection([new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1)][Math.floor((randomSection-1)/3)]) //rotation is on the same axis for every pair of three
                if(speed<500){
                    sound.play()//only play if speed is less than <0.5s (sound gets too distorted)
                }
                setTimeout(() => {
                    changeLayout({active: activeRef.current, over:randomSection, positive, scroll, baseLayout})
                    changeActive({over: 0})
                    setScroll(0)
                    setOver(0) //because of button controls (would decrease performance if setTimeout would be in buttonScrollHandler)
                }, speed)
            }
        }, (speed*2 + 20) * i)
        //disable mixing state after mixing is finished
        setTimeout(() => {
            props.setMix(false)
        }, (speed*2 + 20) * props.mixes)
    }

    useEffect(() => {
        if(props.mix){
            mixCube()
        }
    }, [props.mix])
    //[end] relevant to boxes

    //Handlers to avoid changing "over" variable and interrupting current animation
    const overHandler = e => {
        if(active.length === 0 && !props.controls){
            setOver(parseInt(e.object.material.name))
        }
    }  
    const outHandler = e => {
        if(active.length === 0 && !props.controls){
            setOver(0)
        }
    }

    useEffect(() => {
        setOver(0)
    }, [props.controls])

    const cubeRef = useRef<any>()

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        cubeRef.current.position.y = Math.sin(time) / 30
        if(!mix && active.length === 0){
            setNegy(camera.position.y < 0)
            const threshold = 0

            //change xz values only if corners are crossed (which is if the plus/minus sign has changed)
            if(camera.position.x > threshold && camera.position.z < threshold && camxz[0] !== 0){
                setCamxz(0)
            } else if(camera.position.x > threshold && camera.position.z > threshold && camxz[0] !== 1 ){
                setCamxz(1)
            } else if(camera.position.x < threshold && camera.position.z > threshold && camxz[0] !== 2 ){
                setCamxz(2)
            }else if(camera.position.x < threshold && camera.position.z < threshold && camxz[0] !== 3 ){
                setCamxz(3)
            }
        }
    })

    useEffect(() => {
        switch(camxz){
            case 0:
                setBtnpos([[-1,-1],[1,1]])
                console.log("case 0")
                break;
            case 1:
                setBtnpos([[1,-1],[-1,1]])
                console.log("case 1")
                break;
            case 2:
                setBtnpos([[1,1],[-1,-1]])
                console.log("case 2")
                break;
            case 3:
                setBtnpos([[-1,1],[1,-1]])
                console.log("case 3")
                break;
        }
    }, [camxz])

    const buttonScrollHandler = (element, direction) => {
        setOver(element)
        setScroll(direction)
    }



    //return all the JSX
    return(
    <>
      <group visible={!props.controls} onPointerOut={e => outHandler(e)}>
        <Suspense>
          <primitive 
            object={useLoader(GLTFLoader, '/selectors/selector.gltf').scene} 
            scale={0.4} 
            onPointerOver={e => overHandler(e)}
            />
            <primitive 
                object={selector.scene} 
                rotation={rotations[Math.floor((over-1)/3)]} 
                position={positions[over-1]} 
                scale={0.4}
                visible = {over !== 0 && scroll === 0}
            />
        </Suspense>
      </group> 
      
      <group ref={cubeRef}>
        <Model id="000" name="000"/>
        <Model id="001" name="001" />
        <Model id="002" name="002" />
        <Model id="010" name="010" />
        <Model id="011" name="011" />
        <Model id="012" name="012" />
        <Model id="020" name="020" />
        <Model id="021" name="021" />
        <Model id="022" name="022" />

        <Model id="100" name="100" />
        <Model id="101" name="101" />
        <Model id="102" name="102" />
        <Model id="110" name="110" />
        <Model id="112" name="112" />
        <Model id="120" name="120" />
        <Model id="121" name="121" />
        <Model id="122" name="122" />

        <Model id="200" name="200" />
        <Model id="201" name="201" />
        <Model id="202" name="202" />
        <Model id="210" name="210" />
        <Model id="211" name="211" />
        <Model id="212" name="212" />
        <Model id="220" name="220" />
        <Model id="221" name="221" />
        <Model id="222" name="222" />

        {(active.length === 0 && props.controls && !mix) &&
            <group>
                <group position={[0,negy? -2.4: 0 ,0]}>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[-0.8, 1.2, 1.2]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate" onClick={() => {buttonScrollHandler(1,100)}}>
                            <p>{camxz === 2? "🡫" : camxz === 3? "🡪" : camxz === 0 ? "🡩" : "🡨"}</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[-0.8, 1.2, -1.2]} rotation={[Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate" onClick={() => {buttonScrollHandler(1,-100)}}>
                            <p>{camxz === 2? "🡩" : camxz === 3? "🡨" : camxz === 0 ? "🡫" : "🡪"}</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[0, 1.2, 1.2]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate" onClick={() => {buttonScrollHandler(2,100)}}>
                            <p>{camxz === 2? "🡫" : camxz === 3? "🡪" : camxz === 0 ? "🡩" : "🡨"}</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[0, 1.2, -1.2]} rotation={[Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate" onClick={() => {buttonScrollHandler(2,-100)}}>
                            <p>{camxz === 2? "🡩" : camxz === 3? "🡨" : camxz === 0 ? "🡫" : "🡪"}</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[0.8, 1.2, 1.2]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate" onClick={() => {buttonScrollHandler(3,100)}}>
                            <p>{camxz === 2? "🡫" : camxz === 3? "🡪" : camxz === 0 ? "🡩" : "🡨"}</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[0.8, 1.2, -1.2]} rotation={[Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate" onClick={() => {buttonScrollHandler(3,-100)}}>
                            <p>{camxz === 2? "🡩" : camxz === 3? "🡨" : camxz === 0 ? "🡫" : "🡪"}</p>
                        </div>
                    </Html>

                    <Html zIndexRange={[100, 0]} scale={0.25} position={[-1.2, 1.2, 0.8]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate2" onClick={() => {buttonScrollHandler(7,100)}}>
                            <p>{camxz === 2? "🡨" : camxz === 3? "🡫" : camxz === 0 ? "🡪" : "🡩"}</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[1.2, 1.2, 0.8]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate2" onClick={() => {buttonScrollHandler(7,-100)}}>
                            <p>{camxz === 2? "🡪" : camxz === 3? "🡩" : camxz === 0 ? "🡨" : "🡫"}</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[-1.2, 1.2, 0]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate2" onClick={() => {buttonScrollHandler(8,100)}}>
                            <p>{camxz === 2? "🡨" : camxz === 3? "🡫" : camxz === 0 ? "🡪" : "🡩"}</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[1.2, 1.2, 0]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate2" onClick={() => {buttonScrollHandler(8,-100)}}>
                            <p>{camxz === 2? "🡪" : camxz === 3? "🡩" : camxz === 0 ? "🡨" : "🡫"}</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[-1.2, 1.2, -0.8]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate2" onClick={() => {buttonScrollHandler(9,100)}}>
                            <p>{camxz === 2? "🡨" : camxz === 3? "🡫" : camxz === 0 ? "🡪" : "🡩"}</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[1.2, 1.2, -0.8]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate2" onClick={() => {buttonScrollHandler(9,-100)}}>
                            <p>{camxz === 2? "🡪" : camxz === 3? "🡩" : camxz === 0 ? "🡨" : "🡫"}</p>
                        </div>
                    </Html>
                </group>

                <group position={[1.2 * btnpos[0][0], 0, 1.2 * btnpos[0][1]]}>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[0, 0.8, 0]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate3" onClick={() => {buttonScrollHandler(4,100)}}>
                            <p>🡪</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate3" onClick={() => {buttonScrollHandler(5,100)}}>
                            <p>🡪</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[0, -0.8, 0]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate3" onClick={() => {buttonScrollHandler(6,100)}}>
                            <p>🡪</p>
                        </div>
                    </Html>
                </group>

                <group position={[1.2*btnpos[1][0], 0, 1.2*btnpos[1][1]]}>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[0, 0.8,0]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate3" onClick={() => {buttonScrollHandler(4,-100)}}>
                            <p>🡨</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[0, 0,0]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate3" onClick={() => {buttonScrollHandler(5,-100)}}>
                            <p>🡨</p>
                        </div>
                    </Html>
                    <Html zIndexRange={[100, 0]} scale={0.25} position={[0,-0.8,0]} rotation={[-Math.PI/2, 0,0]} transform sprite>
                        <div className="btn__rotate rotate3" onClick={() => {buttonScrollHandler(6,-100)}}>
                            <p>🡨</p>
                        </div>
                    </Html>
                </group>

            </group>
        }

        </group>
    </>
    )
}

export default Cube