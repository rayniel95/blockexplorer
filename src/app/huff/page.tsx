'use client'

import {useEffect} from 'react'

let files = {
	"add.huff": "#define function add(uint256,uint256) nonpayable returns (uint256)\n" +
		"\n" +
		"#define macro MAIN() = {\n" +
		"   // Load our numbers from calldata and add them together.\n" +
		"   0x04 calldataload // [number1]\n" +
		"   0x24 calldataload // [number2]\n" +
		"   add               // [number1+number2]\n" +
		"   // Return our new number.\n" +
		"   0x00 mstore // Store our number in memory.\n" +
		"   0x20 0x00 return // Return it.\n" +
		"}\n"
}

export default function Index() {

	useEffect(() => {
		async function fetchModule(){
			const {compile} = await import("../../huff-bundler/huffc")
			//@ts-ignore
			console.log(compile({
				files,
				sources: ['add.huff']
			}))
		}
		fetchModule()
	}, [])

	return (
		<div>
			Our WASM component:
		</div>
	)
}


