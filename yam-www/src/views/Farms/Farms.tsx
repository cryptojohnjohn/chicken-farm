import React from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import { useWallet } from 'use-wallet'

import goodBoy from '../../assets/img/goodBoy.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account, connect } = useWallet()
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
            onClick={() => connect('injected')}
            text="Unlock Wallet"
          />
        </div>
      )}
      </Page>
    </Switch>
  )
}


export default Farms