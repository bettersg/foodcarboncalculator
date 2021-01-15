/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import { ReactComponent as HomeLogo } from '../../static/home_alt_outline.svg';
import { ReactComponent as DiaryLogo } from '../../static/calendar.svg';
import { ReactComponent as DatabaseLogo } from '../../static/layers.svg';
import { ReactComponent as MoreLogo } from '../../static/more_horizontal.svg';
import { ReactComponent as AddCircleLogo } from '../../static/Ellipse 15.svg';
import { ReactComponent as PlusInCircle } from '../../static/close_big.svg';

const HomeButton = () => {
    return (
        <div>
            <div className="button-logo"><HomeLogo /></div>
            <div>Home</div>
        </div>
    )
}
const DiaryButton = () => {
    return (
        <div>
            <div className="button-logo"><DiaryLogo /></div>
            <div>Diary</div>
        </div>
    )
}
const AddButton = () => {
    return (
        <span id="add-button">
            <span id=""><AddCircleLogo /></span>
            <span id="plus-sign"><PlusInCircle /></span>
        </span>
    )
}
const DatabaseButton = () => {
    return (
        <div>
            <div className="button-logo"><DatabaseLogo /></div>
            <div>Database</div>
        </div>
    )
}
const MoreButton = () => {
    return (
        <div>
            <div className="button-logo"><MoreLogo /></div>
            <div>More</div>
        </div>
    )
}

function MainNavBar() {
    return (
        <>
            <div id="main-nav-bar">
                <div id="add-items">TESTES</div>
                <div id="main-nav-container">
                    {HomeButton()}
                    {DiaryButton()}
                    {AddButton()}
                    {DatabaseButton()}
                    {MoreButton()}
                </div>
            </div>
        </>
    )
}

export default MainNavBar
