import AutoComplete from './components/AutoComplete'
import styled from 'styled-components'

const AppContainer = styled.div`
  height: 150vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

function App() {
  return (
    <AppContainer>
      <AutoComplete maxPopupHeight="400px" />
    </AppContainer>
  )
}

export default App
