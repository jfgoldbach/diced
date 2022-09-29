import React, { useEffect, useState } from 'react'
import "./Colorpick.css"

type colorpickProps = {
    setColors: React.Dispatch<React.SetStateAction<string[]>>
    dark: boolean
    mix: boolean
}

function Colorpick(props: colorpickProps) {
    const [rnd, setRnd] = useState(false)

    const clickHandler = () => {
        if(!props.mix){
            props.setColors([
                (document.getElementById("c1") as HTMLInputElement).value,
                (document.getElementById("c2") as HTMLInputElement).value,
                (document.getElementById("c3") as HTMLInputElement).value,
                (document.getElementById("c4") as HTMLInputElement).value,
                (document.getElementById("c5") as HTMLInputElement).value,
                (document.getElementById("c6") as HTMLInputElement).value
            ])
        }
    }

    useEffect(() => {
        for(let i = 0; i<6; i++){
            (document.getElementById(`c${i+1}`) as HTMLInputElement).value = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
        }
    }, [rnd])

    useEffect(() => {
        for(let i = 0; i<6; i++){
            (document.getElementById(`c${i+1}`) as HTMLInputElement).value = "#ffffff"
        }
    }, [])

    const randomize = () => {
        setRnd(!rnd);
    }

  return (
    <div className={props.dark? "colorpick__main dark": "colorpick__main"}>
        <p>Custom colors:</p>
        <div className="pickContainer">
            <div className="imgContainer">
                <img src="imgs/frame.png"></img>
                <img src="imgs/frame.png"></img>
                <img src="imgs/frame.png"></img>
                <img src="imgs/frame.png"></img>
                <img src="imgs/frame.png"></img>
                <img src="imgs/frame.png"></img>
            </div>
            <input type="color" id="c1" />
            <input type="color" id="c2" />
            <input type="color" id="c3" />
            <input type="color" id="c4" />
            <input type="color" id="c5" />
            <input type="color" id="c6" />
        </div>
        <div className="btnContainer">
            <button className={props.mix? "apply__btn inactive": "apply__btn"} onClick={clickHandler}>Apply</button>
            <button className="randomize__btn" onClick={randomize}>
                    <img src="imgs/random_dice.svg"></img>
            </button>
        </div>
    </div>
  )
}

export default Colorpick