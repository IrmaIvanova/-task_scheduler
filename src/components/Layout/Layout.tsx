import * as React from 'react'
import { Header } from '../Header/Header'
import { weekdaysArray, monthArray } from '../../constants'
import { Body } from '../Body/Body'
import { LayoutProps, cnLayoutBody } from './Layout.index'

export const Layout: React.FC<LayoutProps> = ({ }) => {
    let today = new Date();
    const selectYear = today.getFullYear()
    let selectMonth = today.getMonth();

    return <div>
        <Header month={monthArray[selectMonth]} year={selectYear} />
        <Body selectMonth={selectMonth} selectYear={selectYear} weekdays={weekdaysArray} />
    </div>
}