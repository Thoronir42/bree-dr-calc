const map: { [char: string]: string } = {
  A: '🇦', B: '🇧', C: '🇨', D: '🇩', E: '🇪',
  F: '🇫', G: '🇬', H: '🇭', I: '🇮', J: '🇯',
  K: '🇰', L: '🇱', M: '🇲', N: '🇳', O: '🇴',
  P: '🇵', Q: '🇶', R: '🇷', S: '🇸', T: '🇹',
  U: '🇺', V: '🇻', W: '🇼', X: '🇽', Y: '🇾',
  Z: '🇿',
}


export const charToRegionalLetter = (char: string) => map[char.toUpperCase()] || '?'
export const codeToRegionalString = (code: string) => {
  let result = ''
  for (let i = 0; i < code.length; i++) {
    result += charToRegionalLetter(code.charAt(i))
  }
  return result
}
