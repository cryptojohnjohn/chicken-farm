import React, { useEffect } from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import { useWallet } from 'use-wallet'

import goodBoy from '../../assets/img/goodBoy.png'

import { get } from '../../utils/LS'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'

import useModal from '../../hooks/useModal'

const Farms: React.FC = () => {
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
              icon={<img alt="goodBoy" src={goodBoy} height="96" />}
              subtitle="Help Mommy with chores and earn Good Boy Points (GBP)."
              title="Good Boy Chores"
            />
            <FarmCards />
          </Route>
          <Route path={`${path}:farmId`}>
            <Farm />
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


export default Farms