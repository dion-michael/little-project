import React from 'react'

interface Props {
    text?: string;
}

const Keuangan: React.FC<Props> = ({ text }) => {
    return (
        <div>
            <p>ini Keuangan</p>
        </div>
    )
}

export default Keuangan;
