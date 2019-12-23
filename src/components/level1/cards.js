import React from "react"
import { css } from "@emotion/core"
import gsap from "gsap"
import { containerInStyle, containerOutStyle } from "../../data/styles"

class Cards extends React.Component {
  constructor(props) {
    super(props)
    this.state = { order: [0, 1, 2, 3], mouseD: 100 } //order: index
    this.reOrder = this.reOrder.bind(this)
    this._onMouseMove = this._onMouseMove.bind(this)

    this.pages = [null, null, null, null]
    this.page1 = null
    this.page2 = null
    this.page3 = null
    this.page4 = null
    this.tl = null //timeline
  }

  componentDidMount() {
    this.tl = gsap.timeline({ paused: true })
    this.tl.to(this.pages[0], 0.2, { rotate: 0, transformOrigin: "100% 0%" }, 0)
    this.tl.to(
      this.pages[1],
      0.2,
      { rotate: -3, transformOrigin: "100% 0%", x: 10, y: 5 },
      0
    )
    this.tl.to(
      this.pages[2],
      0.2,
      { rotate: -6, transformOrigin: "100% 0%", x: 20, y: 10 },
      0
    )
    this.tl.to(
      this.pages[3],
      0.2,
      { rotate: -9, transformOrigin: "100% 0%", x: 30, y: 15 },
      0
    )
  }

  static Card = props => {
    const palette = ["pink", "skyblue", "magenta", "grey", "yellow"]
    // const cardStyle = css`
    //   background-color: ${palette[props.index]};
    // `
    const cardStyle = css`
      position: absolute;
      height: 100px;
      background-color: ${palette[props.index]};
      /* pointer-events: none; */
      /* top: ${20 * props.order}px; */
      /* transform: rotate(${((100 - props.mouseD) / 20) * props.order}deg);
      
      transition: transform 0.1s linear; */
    `
    return (
      <div
        css={cardStyle}
        onClick={() => props.reOrder(props.order)}
        ref={div => (props.pages[props.index] = div)}
      >
        My index is {props.index} and my order is {props.order}, order I see:{" "}
        {props.orderIsee}
      </div>
    )
  }

  reOrder(order) {
    this.setState(prevState => {
      const selectedIndex = prevState.order.splice(order, 1)
      prevState.order.unshift(selectedIndex[0])
      return { order: prevState.order }
    })
  }

  _onMouseMove(e) {
    // let d = e.nativeEvent.offsetY
    // let d = e.nativeEvent.offsetX + e.nativeEvent.offsetY
    let d = e.clientX + e.clientY

    // let d = e.offsetX + e.offsetY

    this.setState({ mouseD: d })

    let progress = 0
    if (d < 200 && d >= 100) {
      progress = (200 - d) / 100
    } else if (d < 100) {
      progress = 1
    }
    this.tl.progress(progress).pause()
  }

  render() {
    const cardsStyle = css`
      background-color: red;
      position: absolute;
      top: 0;
      left: 0;
      width: 400px;
      height: 400px;
    `
    const hoverAreaStyle = css`
      background-color: lightgrey;
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 200px;
    `

    const tempPStyle = css`
      background-color: cyan;
      position: absolute;
      bottom: 0;
    `

    return (
      <div css={cardsStyle} onMouseMove={this._onMouseMove}>
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            index: index,
            orderIsee: this.state.order.toString(),
            order: this.state.order.findIndex(element => element === index),
            mouseD: this.state.mouseD,
            pages: this.pages,
            reOrder: this.reOrder,
          })
        })}
        <p css={tempPStyle}> mouseD is: {this.state.mouseD}</p>
      </div>
    )
  }
}

export default Cards
