import React, { useEffect } from 'react'
import {
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'
import { useWallet } from 'use-wallet'

import pepe from '../../assets/img/pepe.png'

import { get } from '../../utils/LS'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

const Play: React.FC = () => {
  const { path } = useRouteMatch()
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
    <Switch>
      <Page>
      {!!account ? (
        <>
          <Route exact path={path}>
            <PageHeader
              icon={<img src={pepe} height="96" />}
              subtitle="Good Boys can play some games."
              title="Play Games"
            />
            <div style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              color: 'white',
            }}> 
              Coming Soon ™️
            </div>
          </Route>
        </>
      ) : (
        <div style={{
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
        }}>
          <Button
            onClick={() => onPresentWalletProviderModal()}
            text="Connect Wallet"
          />
        </div>
      )}
      </Page>
    </Switch>
  )
}


export default Play