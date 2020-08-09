import React, {useState, useImperativeHandle} from 'react';

const Toggle = React.forwardRef( ({introBtnName, outroBtnName, children}, ref) => {
const [isVisible, setIsVisible] = useState(false);
const hiddenCSS = {display: isVisible ? "" : "none"} 
const visibleCSS = {display: isVisible ? "none" : ""} 
const toggle = () => setIsVisible(!isVisible)

  useImperativeHandle(ref, () => { return {toggle} });

  return (<>
    <div>
    <div style={visibleCSS}>
      <button onClick={toggle}>{introBtnName}</button>
    </div>
      <div style={hiddenCSS}>
        {children}
        <button onClick={toggle}>{outroBtnName}</button>
      </div>
    </div>
    </>)
});

export default Toggle
