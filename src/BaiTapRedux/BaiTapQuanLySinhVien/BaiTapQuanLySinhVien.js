import React, { Component } from 'react'
import FormDangKySinhVien from './FormDangKySinhVien'
import TableQuanLySinhVien from './TableQuanLySinhVien'

export default class BaiTapQuanLySinhVien extends Component {
    render() {
        return (
            <div>
                <FormDangKySinhVien />
                <TableQuanLySinhVien />
            </div>
        )
    }
}
