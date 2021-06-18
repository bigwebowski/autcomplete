const defaultHighlight = (s) => <em>{s}</em>

const escapeRegex = (v) => v.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')

const highlightWord = (source, target, callback) => {
  const result = []

  if (!source) return result
  if (!target) return source

  const regex = new RegExp(escapeRegex(target), 'gi')

  let lastOffset = 0

  source.replace(regex, (val, offset) => {
    result.push(
      source.substr(lastOffset, offset - lastOffset),
      (callback || defaultHighlight)(val)
    )
    lastOffset = offset + val.length
  })

  result.push(source.substr(lastOffset))
  return result
}

const Highlighter = ({ source, target, children }) =>
  highlightWord(source, target, children)

export default Highlighter
