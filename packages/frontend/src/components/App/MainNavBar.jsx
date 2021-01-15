/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import { ReactComponent as HomeLogo } from '../../static/home_alt_outline.svg';
import { ReactComponent as DiaryLogo } from '../../static/calendar.svg';
import { ReactComponent as DatabaseLogo } from '../../static/layers.svg';
import { ReactComponent as MoreLogo } from '../../static/more_horizontal.svg';
import { ReactComponent as AddCircleLogo } from '../../static/Ellipse 15.svg';
import { ReactComponent as PlusInCircle } from '../../static/close_big.svg';

function AddCircle() {
    return (
        <span id="add-button">
            <span id=""><AddCircleLogo /></span>
            <span id="plus-sign"><PlusInCircle /></span>
        </span>
    )
}

function MainNavBar() {
    return (
        <div id="main-nav-bar">
            <HomeLogo />
            <DiaryLogo />
            {AddCircle()}
            <DatabaseLogo />
            <MoreLogo />
        </div>
    )
}

export default MainNavBar
