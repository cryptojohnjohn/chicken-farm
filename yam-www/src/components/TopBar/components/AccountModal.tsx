import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import { yam as yamAddress } from '../../../constants/tokenAddresses'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getDisplayBalance } from '../../../utils/formatBalance'

import Button from '../../Button'
import CardIcon from '../../CardIcon'
import IconButton from '../../IconButton'
import { AddIcon, RemoveIcon } from '../../icons'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalTitle from '../../ModalTitle'
import pepe from '../../../assets/img/pepe.png'

import { clear } from '../../../utils/LS'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { reset } = useWallet()

  const handleSignoutClick = () => {
    clear()
    reset()
    handleCloseClick()
  }

  const handleCloseClick = useCallback(() => {
    onDismiss!()
  }, [onDismiss])


  const yamBalance = useTokenBalance(yamAddress)
  const displayBalance = useMemo(() => {
    return getDisplayBalance(yamBalance)
  }, [yamBalance])

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <StyledBalanceWrapper>
        <CardIcon><img alt="pepe" src={pepe} height="32" /></CardIcon>
        <StyledBalance>
          <StyledValue>{displayBalance}</StyledValue>
          <Label text="GBP Balance" />
        </StyledBalance>
        {/* <StyledBalanceActions>
          <IconButton>
            <RemoveIcon />
          </IconButton>
          <StyledSpacer />
          <IconButton>
            <AddIcon />
          </IconButton>
        </StyledBalanceActions> */}
      </StyledBalanceWrapper>

      <StyledSpacer />
      <Button
        onClick={handleSignoutClick}
        text="Sign Out"
        variant="secondary"
      />
      <StyledSpacer />
      <Button
        onClick={handleCloseClick}
        text="Close"
      />
    </Modal>
  )
}

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledValue = styled.div`
  color: ${props => props.theme.color.orange[600]};
  font-size: 36px;
  font-weight: 700;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

const StyledBalanceIcon = styled.div`
  font-size: 36px;
  margin-right: ${props => props.theme.spacing[3]}px;
`

const StyledBalanceActions = styled.div`
  align-items: center;
  display: flex;
  margin-top: ${props => props.theme.spacing[4]}px;
`

export default AccountModal