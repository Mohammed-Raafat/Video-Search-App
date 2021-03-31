import React from 'react';

const NightModeButton = (props) => {
    const onCheckboxClick = (e) => {
        props.changeMode(e.target.checked);
    }

    return ( 
        <div className="ui toggle checkbox"  title='Night mode' >
            <input type="checkbox" name="public" onClick={onCheckboxClick}/>
            <label><i className="moon outline icon"></i></label>
        </div>
    );
}

export default NightModeButton;