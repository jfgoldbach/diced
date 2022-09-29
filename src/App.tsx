import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react';
import { ContactShadows, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import './App.css';
import Cube from './components/Cube';
import Colors from './components/Colors';
import Colorpick from './components/Colorpick';


function App() {
  const settingsRef = useRef<HTMLDivElement>()
  const [settings, setSettings] = useState<boolean>(false)
  const [solved, setSolved] = useState<boolean>(true)
  const [mix, setMix] = useState<boolean>(false)
  const mixRef = useRef<null | boolean>()
  mixRef.current = mix
  const [mixes, setMixes] = useState<number>(8)
  const [speed, setSpeed] = useState<number>(200)
  const [colors, setColors] = useState(["#FFFFFF", "#FF8900", "#0000FF", "#FF0000", "#00FF00", "#FFFF00"])
  const [rim, setRim] = useState<string>("#000000")
  const rimRef = useRef<null | string>()
  rimRef.current = rim
  const [dropdown, setDropdown] = useState<boolean>()
  const [reset, setReset] = useState<boolean>(false)
  const [dark, setDark] = useState<boolean>(true)
  const [controls, setControls] = useState<boolean>(false)
  const controlsRef = useRef<null | boolean>()
  controlsRef.current = controls
  const cameraRef = useRef()
  const [fov, setFov] = useState<number>(75)

  const settingsHandler = () => {
    if(!mix){
      setSettings(!settings)
    }
  }

  useEffect(() => {
    if(settings){
      settingsRef.current?.classList.remove("settings__deactivate")
      settingsRef.current?.classList.add("settings__active")
    } else if(!settings) {
      settingsRef.current?.classList.remove("settings__active")
      settingsRef.current?.classList.add("settings__deactivate")
    }
  }, [settings])

  //check for mobile or desktop mode on load and create window-resize listener:
  useEffect(() => {
    if(window.innerWidth < 768){
      setFov(80)
      setControls(true)
    }
    const watchResize = window.addEventListener('resize', () => {
      if(window.innerWidth < 768){
        setFov(80)
      } else {
        setFov(75)
      }
    })
    return window.removeEventListener('resize', (watchResize as unknown) as EventListenerOrEventListenerObject)
  }, [])
  
  const colorsDropdown = () => {
    setDropdown(!dropdown)
  }

  const resetHandler = () => {
    if(!mix){
      setReset(true)
    }
  }

  const modeHandler = () => {
    if(!mix){
      setDark(!dark)
    }
  }

  const rimHandler = e => {
    if(!mix){
      setRim(e.target.value)
    }
  }

  const controlHandler = e => {
    setControls(!(e.target.value === "Scroll controls"))
    console.log(controlsRef)
  }

  return (
    <Suspense fallback={
      <Suspense>
        <img alt="Loading..." className="loading" src="imgs/fianl_gimp_lowest.gif" />
      </Suspense>
    }>

      <Canvas className="fade__in" shadows style={{height: "100vh", width: "100%"}}>
        <color attach="background" args={[dark?"#101010":"white"]} />
        <fog attach="fog" args={[dark? "#000000":"white", 10, 55]} />
        <ambientLight 
          intensity={0.2}
        />
        <directionalLight
          castShadow
          position={[0,5,0]} 
          intensity={1}
        />
        <Environment 
          files={'hdri/sunset_jhbcentral_1k.hdr'} 
        />
        <PerspectiveCamera 
          makeDefault
          position={[-2.5, 2, 3.5]}
          fov={fov}
          ref={cameraRef} 
          key={undefined} view={undefined} attach={undefined} args={undefined} onUpdate={undefined} clear={undefined} raycast={undefined} type={undefined} focus={undefined} castShadow={undefined} visible={undefined} id={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} removeFromParent={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateMatrixWorld={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} zoom={undefined} matrixWorldInverse={undefined} projectionMatrix={undefined} projectionMatrixInverse={undefined} isCamera={undefined} near={undefined} far={undefined} isPerspectiveCamera={undefined} aspect={undefined} filmGauge={undefined} filmOffset={undefined} setFocalLength={undefined} getFocalLength={undefined} getEffectiveFOV={undefined} getFilmWidth={undefined} getFilmHeight={undefined} setViewOffset={undefined} clearViewOffset={undefined} updateProjectionMatrix={undefined} setLens={undefined}        
        />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
        />
        <ContactShadows 
          position={[0, -2.5, 0]}
          scale={5}
          blur={8}
          far={150}
          opacity={0.65} 
          key={undefined} copy={undefined} quaternion={undefined} attach={undefined} args={undefined} children={undefined} onUpdate={undefined} up={undefined} rotation={undefined} matrix={undefined} layers={undefined} dispose={undefined} clear={undefined} raycast={undefined} castShadow={undefined} visible={undefined} onPointerOut={undefined} onPointerOver={undefined} id={undefined} onClick={undefined} onContextMenu={undefined} onDoubleClick={undefined} onPointerDown={undefined} onPointerMove={undefined} onPointerUp={undefined} onPointerCancel={undefined} onPointerEnter={undefined} onPointerLeave={undefined} onWheel={undefined} onPointerMissed={undefined} type={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} removeFromParent={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateMatrixWorld={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} isGroup={undefined}        
        />

        <Cube 
          solved={solved} 
          setSolved={setSolved} 
          mix={mixRef.current} 
          setMix={setMix} 
          mixes={mixes} 
          speed={speed} 
          colors={colors} 
          rim={rimRef.current} 
          reset={reset} 
          setReset={setReset} 
          controls={controlsRef.current} 
          cameraRef={cameraRef}
        />

        <mesh rotation={[-Math.PI/2,0,0]} position={[0, -2.55, 0]}>
          <planeBufferGeometry args={[500,500]} />
          <meshBasicMaterial color={dark? "#2b2b2b": "#e5e5e5"} />
        </mesh>
      </Canvas>

      <img className="fade__in App-logo" src="imgs/logo.png" alt="Diced Logo" width="128px" />
      {(solved || fov === 80) &&
        <button className={mix? "mix__btn inactive": "mix__btn"} onClick={() => {if(!mix){setSolved(false); setMix(true)}}}>Mix</button>
      }

      <div className={mix? "settings__btn inactive": "settings__btn"} onClick={settingsHandler}>
        <img src="imgs/Settings.svg"></img>
      </div>


      <div className={settings
        ? dark
          ? "settings__bar active dark"
          : "settings__bar active"
        : dark
          ? "settings__bar dark" 
          : "settings__bar"
        } ref={settingsRef}
        >
        <div className={dark? "settingsTop dark": "settingsTop"}>
          <button className={mix? "mode__btn inactive": "mode__btn"}>
            <img src="imgs/light_dark.svg" onClick={modeHandler}></img>
          </button>
          <select onChange={controlHandler}>
            <option>Scroll controls</option>
            <option>Button controls</option>  
          </select>
          <div className={mix? "settings__close inactive": "settings__close"} onClick={settingsHandler}>
            <p>&times;</p>
          </div>
        </div>
        
        <button className={mix? "mix__btn__small inactive": "mix__btn__small"} onClick={resetHandler}>Reset</button>
        <button className={mix? "mix__btn__small inactive mix": "mix__btn__small mix"} onClick={() => {setSolved(false); setMix(true)}}>Mix</button>
        <div className={dark? "slideContainer dark": "slideContainer"}>
          <p>Mixes:</p>
          <input className={mix? "inactive": ""} type="range" value={mixes} min={3} max={32} step={1} onChange={(e) => {if(!mix){setMixes(parseInt(e.target.value))}}} />
          <p className="textRight">{mixes}</p>
        </div>
        <div className={dark? "slideContainer dark": "slideContainer"}>
          <p>Turn speed:</p>
          <input className={mix? "inactive": ""} type="range" value={speed} min={100} max={1000} step={100} onChange={(e) => {if(!mix){setSpeed(parseInt(e.target.value))}}} />
          <p className="textRight">{speed/1000} s</p>
        </div>

        <div className={dark? "slideContainer dark": "slideContainer"}>
          <p>Rim color:</p>
          <input className={mix? "inputColor inactive": "inputColor"} type="color" onChange={rimHandler} />
          <p className="textRight">{rim}</p>
        </div>

        <Colorpick setColors={setColors} dark={dark} mix={mix} />

        <div className={dark? "colorsContainer dark": "colorsContainer"}>
          <div className={dropdown? "dropdown active": "dropdown"} onClick={colorsDropdown}>
            <img src="imgs/dropdown.svg"></img>
          </div>
          {dropdown && <p>Color layouts</p>}
          {!dropdown &&<>
            <Colors name="Standard" mix={mix} setColors={setColors} colors={["#FFFFFF", "#FF8900", "#0000FF", "#FF0000", "#00FF00", "#FFFF00"]} />
            <Colors name="Rainbow" mix={mix} setColors={setColors} colors={["#ff0000", "#ffff00", "#1eb41e", "#00d2ff", "#3737c8", "#d200ff"]} />
            <Colors name="Grayscale" mix={mix} setColors={setColors} colors={["#ffffff", "#cccccc", "#999999", "#666666", "#333333", "#000000"]} />
            <Colors name="Pastel" mix={mix} setColors={setColors} colors={["#b8e0f6", "#84a6d6", "#37667e", "#dec4d6", "#7b92aa", "#4382bb"]} />
            <Colors name="Coast guard" mix={mix} setColors={setColors} colors={["#003049", "#2a9d8f", "#D62828", "#F77F00", "#FCBF49", "#7b92aa"]} />
            <Colors name="Natural" mix={mix} setColors={setColors} colors={["#3D550C", "#81B622", "#ECF87F", "#DBA40E", "#7E6E13", "#787D12"]} />
          </>
          }
          
        </div>
      </div>

    </Suspense>
  );
}

export default App;