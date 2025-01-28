// import words from '../../words.js'

// export async function gameLoader({ request }) {
// 	const url = new URL(request.url)
// 	const level = url.pathname.slice(6)

// 	const maxRetries = 10
// 	let retries = 1
    
// 	while (retries < maxRetries) {
//         const word = words[level][Math.floor(Math.random() * words[level].length)]

// 		try {
// 			const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
// 			if (!res.ok) {
// 				throw new Error(`Response status: ${res.status}`)
// 			}

//             const data = await res.json()
            
// 			if (data[0].phonetics[0]?.audio) {
// 				return data
// 			} else {
// 				console.log(`Audio not found. Retrying: ${retries++}`)
// 			}
// 		} catch (error) {
//             console.log(error.message)
// 		}
// 	}
// }
