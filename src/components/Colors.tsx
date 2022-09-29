import React from "react"

type colorsProps = {
  name: string
  mix: boolean
  setColors: React.Dispatch<React.SetStateAction<string[]>>
  colors: string[]
}

function Colors(props: colorsProps) {
  
  const clickHandler = () => {
    if(!props.mix){
      props.setColors(props.colors)
    }
  }

  
  return (
    <div className={props.mix? "colorContainer inactive": "colorContainer"} onClick={clickHandler}>
          <div className="individualColor" style={{background: props.colors[0]}}>
            <img src="imgs/frame.png"></img>
          </div>
          <div className="individualColor" style={{background: props.colors[1]}}>
            <img src="imgs/frame.png"></img>
          </div>
          <div className="individualColor" style={{background: props.colors[2]}}>
            <img src="imgs/frame.png"></img>
          </div>
          <div className="individualColor" style={{background: props.colors[3]}}>
            <img src="imgs/frame.png"></img>
          </div>
          <div className="individualColor" style={{background: props.colors[4]}}>
            <img src="imgs/frame.png"></img>
          </div>
          <div className="individualColor" style={{background: props.colors[5]}}>
            <img src="imgs/frame.png"></img>
          </div>
          <div className="overlay">
            <p>{props.name}</p>
          </div>
    </div>
  )
}

export default Colors