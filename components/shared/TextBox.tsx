import React from 'react'
import { Input } from '../ui/input'

interface num {
    value?: number
}

const TextBox = ({value}:num) => {
  return (
    <div className='border' style={{ border: '1px solid black' }}>
        <Input value={value} readOnly style={{ width: '50px', height: '40px', textAlign: 'center' }} />
    </div>
  )
}

export default TextBox