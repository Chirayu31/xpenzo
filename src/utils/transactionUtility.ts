export function stringToHexColor(str: string): string {
  let hash = 0
  const len = str.length

  for (let i = 0; i < len; i++) {
    // Multiply hash by 31 and add the char code (31 is a small prime, often used in string hashing)
    hash = (hash * 31 + str.charCodeAt(i)) | 0 // |0 forces 32-bit integer arithmetic
  }

  // Convert the hash into a hex color code
  let color = '#'
  for (let i = 0; i < 3; i++) {
    // Extract each 8-bit block (for R, G, and B)
    const value = (hash >> (i * 8)) & 0xff
    color += value.toString(16).padStart(2, '0')
  }

  return color
}
