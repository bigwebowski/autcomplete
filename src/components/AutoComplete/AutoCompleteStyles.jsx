import styled from 'styled-components'

export const SearchWrapper = styled.div`
  width: 350px;
  height: 40px;
`

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  margin: 2px 0;
  padding-left: 35px;
  background: white;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
  border: none;
  outline: none;

  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }
`

export const AutoCompleteWrapper = styled.div`
  position: relative;
  left: 0;
  width: 100%;
  background: white;
  margin: 0;
  padding: 0;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  z-index: 100;
  height: auto;
  overflow: auto;

  max-height: ${({ maxHeight }) => maxHeight || '240px'};

  bottom: ${({ popupHeight, popupPosition }) =>
    popupPosition === 'up' && `${popupHeight + 45}px`};
`

export const AutoCompleteItem = styled.div`
  padding: 10px;

  &:hover {
    background: rgb(180, 180, 180);
    cursor: pointer;
  }
`

export const HighlightedSpan = styled.span`
  background-color: #e7e7dd;
`
