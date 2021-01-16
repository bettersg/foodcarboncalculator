/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { ReactComponent as HomeLogo } from '../../../static/home_alt_outline.svg';
import { ReactComponent as DiaryLogo } from '../../../static/calendar.svg';
import { ReactComponent as DatabaseLogo } from '../../../static/layers.svg';
import { ReactComponent as MoreLogo } from '../../../static/more_horizontal.svg';
import { ReactComponent as AddCircleLogo } from '../../../static/Ellipse 15.svg';
import { ReactComponent as PlusInCircle } from '../../../static/close_big.svg';
import AddMealButtons from './AddMealButtons';


/* ----------- from old UI design-------------------- */
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
/* -------------------------------------------------- */

const AddButton = () => {
    return (
        <span id="add-button">
            <span><AddCircleLogo /></span>
            <span id="plus-sign"><PlusInCircle /></span>
        </span>
    )
}

function MainNavBar() {
    const [active, setActive] = useState(false);
    return (
        <>
            <div id="main-nav-bar">
                <div id="add-items">
                    <AddMealButtons active={active} setActive={setActive}/>
                </div>
                <div tabIndex='0' role="button" id="main-nav-container" onClick={() => setActive(!active)} onKeyDown={() => setActive(!active)}>
                    {AddButton()}
                </div>
            </div>
        </>
    )
}

export default MainNavBar
