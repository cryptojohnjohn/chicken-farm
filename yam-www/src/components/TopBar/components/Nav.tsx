import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">Chores</StyledLink>
      <StyledLink exact activeClassName="active" to={{ pathname: "https://rinkeby.aragon.org/#/gbp" }} target="_blank" >DAM</StyledLink>
      <StyledLink exact activeClassName="active" to="/play">Play</StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.orange[600]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.orange[800]};
  }
  &.active {
    color: ${props => props.theme.color.orange[300]};
  }
`

export default Nav