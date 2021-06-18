import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import Highlighter from '../Highlighter'

import {
  AutoCompleteItem,
  AutoCompleteWrapper,
  HighlightedSpan,
  SearchInput,
  SearchWrapper,
} from './AutoCompleteStyles'

function AutoComplete({ maxPopupHeight }) {
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)

  const [data, setData] = useState([])
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const [popupPosition, setPopupPosition] = useState('down')
  const [popupHeight, setPopupHeight] = useState(0)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    setPopupHeight(autocompleteRef.current.offsetHeight)
  })

  const setAutocompletePosition = (element, maxHeight, windowHeight) => {
    const { y: elementPosition } = element.current.getBoundingClientRect()
    const popupHeight = parseInt(maxHeight)

    windowHeight - elementPosition > popupHeight
      ? setPopupPosition('down')
      : setPopupPosition('up')
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
    setIsOpen(true)
    setAutocompletePosition(inputRef, maxPopupHeight, window.innerHeight)
  }

  const handleSuggestionClick = (e) => {
    setValue(e.target.textContent)
    setIsOpen(false)
  }

  const filteredData = data
    .filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    )
    .map((country) => {
      return (
        <AutoCompleteItem
          key={country.numericCode}
          onClick={handleSuggestionClick}
        >
          <Highlighter source={country.name} target={value} key={country.name}>
            {(str) => <HighlightedSpan>{str}</HighlightedSpan>}
          </Highlighter>
        </AutoCompleteItem>
      )
    })

  return (
    <SearchWrapper>
      <SearchInput
        ref={inputRef}
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        value={value}
      />
      <AutoCompleteWrapper
        ref={autocompleteRef}
        popupPosition={popupPosition}
        maxPopupHeight={maxPopupHeight}
        popupHeight={popupHeight}
      >
        {Boolean(value.length) && value.trim() !== '' && isOpen && filteredData}
      </AutoCompleteWrapper>
    </SearchWrapper>
  )
}

export default AutoComplete
