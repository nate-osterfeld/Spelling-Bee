export function spellCorrect(word, spell) {
	word = [...word]
	spell = [...spell]

	for (let i = 0; i < word.length; i++) {
		if (word[i] !== spell[i]) {
			// replace if everything is right except the current letter
			if (word[i + 1] === spell[i + 1]) {
				spell[i] = word[i]
				break
			}
			// remove if they added an unneeded letter
			else if (word[i] === spell[i + 1]) {
				spell.splice(i, 1)
				break
			}
			// add if they missed a letter
			else if (word[i + 1] === spell[i]) {
				spell.splice(i, 0, word[i])
				break
				// replace if next letter is wrong
			} else {
				spell[i] = word[i]
				break
			}
		}
	}

	// if no correction there are extra letters then remove one
	if (spell.length > word.length) {
		spell.splice(word.length, 1)
	}

	return spell.join('')
}

