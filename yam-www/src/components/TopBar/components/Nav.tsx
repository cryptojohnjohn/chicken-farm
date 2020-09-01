import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { ARAGON_LINK } from '../../../yam/lib/constants'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">Chores List</StyledLink>
      <StyledHyperLink href={ARAGON_LINK} target="_blank">Decentralized Autonomous Mommy (DAM)</StyledHyperLink>
      <StyledLink exact activeClassName="active" to="/play">CryptoTendies</StyledLink>
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

const StyledHyperLink = styled.a`
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