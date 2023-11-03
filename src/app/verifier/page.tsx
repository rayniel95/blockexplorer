'use client'

import { Dropdown } from 'react-bootstrap'
import HuffVerifier from './components/HuffVerifier'
import SolcVerifier from './components/SolcVerifier'
import { useState } from 'react'

enum Language {
    Solidity = 'Solidity',
    Yul = 'Yul',
    Huff = 'Huff',
}
export default function VerifierPage() {
    const [language, setLanguage] = useState(Language.Solidity)
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {language}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item 
                        onClick={()=>setLanguage(Language.Huff)}
                    >
                        {Language.Huff}
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={()=>setLanguage(Language.Solidity)}
                    >
                        {Language.Solidity}
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={()=>setLanguage(Language.Yul)}
                    >
                        {Language.Yul}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {
                language === Language.Huff ? <HuffVerifier />: <SolcVerifier language={language}/>
            }
        </>
    )
}


