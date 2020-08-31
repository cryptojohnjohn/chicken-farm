import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import useModal from '../../../hooks/useModal'
import { formatAddress } from '../../../utils'

import WalletProviderModal from '../../WalletProviderModal'

import Button from '../../Button'

import AccountModal from './AccountModal'

import { get } from '../../../utils/LS'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  
  const { account, connect } = useWallet()

  useEffect(() => {
    // connect to wallet if stored in LS
    const walletProvider = get('wallet')
    if (walletProvider && !account) {
      connect(walletProvider)
    }
  }, [account, connect])

  const [ onPresentWalletProviderModal ] = useModal(<WalletProviderModal />)

  return (
    <StyledAccountButton>
      {!account ? (
        <Button
          onClick={() => onPresentWalletProviderModal()}
          size="sm"
          text="Connect Wallet"
        />
      ) : (
        <Button
          onClick={onPresentAccountModal}
          size="sm"
          text="My Wallet"
        />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton