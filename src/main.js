const styleString =
  `.nose {
  position: absolute;
  border: 12px solid transparent;
  top: 100px;
  left: 50%;
  margin-left: -12px;
  border-radius: 10px;
  border-top-color: black;
}

.eye {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 70px;
  border-radius: 50%;
  left: 50%;
  margin-left: -30px;
  background: black;
}

.eye::before {
  margin-left: 8px;
  margin-top: 2px;
  content: '';
  display: block;
  width: 30px;
  height: 30px;
  border: 3px solid black;
  border-radius: 50%;
  background: white;
}

.eye.left {
  transform: translateX(-100px);
}

.eye.right {
  transform: translateX(100px);
}

.mouth {
  position: absolute;
  width: 200px;
  height: 160px;
  top: 130px;
  left: 50%;
  margin-left: -100px;
  overflow: hidden;
  border-radius: 100px/30px;
  border: none;
}

.mouth > .toplip {
  position: absolute;
  width: 80px;
  height: 25px;
  border: 3px solid black;
  margin-top: -5px;
  left: 50%;
  margin-left: -40px;
  border-top: none;
  background: #FFE600;
  z-index: 3;
  overflow: hidden;
}

.mouth > .toplip.left {
  border-bottom-left-radius: 100%;
  transform: translateX(-40px) rotateZ(-25deg);
  border-right: none;
}

.mouth > .toplip.right {
  transform: translateX(40px) rotateZ(25deg);
  border-bottom-right-radius: 100%;
  border-left: none;
}

.mouth > .bottomlip {
  border: 3px solid black;
  height: 300px;
  width: 120px;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -60px;
  border-radius: 50%;
  background: #9B000A;
  overflow: hidden;
}

.mouth > .bottomlip > .tongue {
  position: absolute;
  width: 200px;
  height: 200px;
  bottom: -80px;
  left: 50%;
  margin-left: -100px;
  border-radius: 50%;
  background: #FF485F;

} 

.cheek {
  border: 3px solid black;
  width: 88px;
  height: 88px;
  position: absolute;
  top: 170px;
  left: 50%;
  margin-left: -44px;
  border-radius: 50%;
  background: #f00;
}

.cheek.left {
  transform: translateX(-130px);
}

.cheek.right {
  transform: translateX(130px);
}`

let n = 0;
const styleElement = document.querySelector('#style')
const landIn = document.querySelector('.land-in')
console.log(styleElement);
console.log(landIn)
let playing = true
let delay = 40
let h;
let color = '#d7ba7d'
let valueType = 'n'
const colorMap = {
  selector: '#d7ba7d',
  property: '#9cdcfe',
  valueN:'#b5cea8',
  valueNON:'#ce9178', 
  value:'#ce9178'

}
let current = 'selector'
let test = ()=>{
  const fragment = new DocumentFragment()
  for(s of styleString){
    if (s === '{') {
      current = 'property'
    } else if (s === ':') {
      current = 'value'
    } else if (s === ';') {
      current = 'property'
    } else if (s === '}') {
      current = 'selector'
    }
    if(current === 'value') {
      if('-0123456789'.includes(s)){
        current = 'valueN'
      }else {
        current = 'valueNON'
      }
    }
    if((current === 'valueN' || current=== 'valueNON') && s=== ' ') current = 'value'
    const span = document.createElement('span')
    if (['{', '}', ':', ';'].includes(s)) {
      span.style.color = 'white'
    } else {
      span.style.color = colorMap[current]
    } 
    s && (span.innerText = s)
    fragment.appendChild(span)
  }
  current = 'selector'
  return fragment
}
const handle = () => {
  let s = styleString[n]
  if (s === '{') {
    current = 'property'
  } else if (s === ':') {
    current = 'value'
  } else if (s === ';') {
    current = 'property'
  } else if (s === '}') {
    current = 'selector'
  }
  if(current === 'value') {
    // console.log(s)
    if('-0123456789'.includes(s)){
      current = 'valueN'
      // console.log('N')
    }else {
      current = 'valueNON'
    }
  }
  if((current === 'valueN' || current=== 'valueNON') && s=== ' ') current = 'value'
  styleElement.innerHTML += s
  const span = document.createElement('span')
  s && (span.innerText = s)
  span.style.animation = `land-in ${delay * 50}ms ease-out forwards`
  if (['{', '}', ':', ';'].includes(s)) {
    span.style.color = 'white'
  } else {
    span.style.color = colorMap[current]
  }
  if (styleString.indexOf())
    landIn.appendChild(span)
  // landIn.innerHTML += styleString[n]
  // console.log(styleString[n]);
    n++
  if (!playing) {
    clearTimeout(h)
    return
  } 
  h = setTimeout(handle, delay)
  n === styleString.length + 1 && clearTimeout(h)
  landIn.scrollTo(0, 9999)
}
handle()
play.onclick = () => {
  playing = true
  n < styleString.length ? handle() : location.reload()
}
pause.onclick = () => {
  playing = false
}
slow.onclick = () => {
  delay = 80
}
normal.onclick = () => {
  delay = 40
}
fast.onclick = () => {
  delay = 10
}
end.onclick = () => {
  // delay = 0
  n = styleString.length
  styleElement.innerHTML = styleString
  landIn.appendChild(test())
}
