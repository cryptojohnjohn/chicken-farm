import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Countdown, { CountdownRenderProps} from 'react-countdown'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import ExplainerModal from './ExplainerModal'

import useFarms from '../../../hooks/useFarms'
import useModal from '../../../hooks/useModal'

import { Farm } from '../../../contexts/Farms'

import { getPoolStartTime } from '../../../yamUtils'

import { BALANCER_URL } from '../../../yam/lib/constants'

const FarmCards: React.FC = () => {
  const [farms] = useFarms()

  const rows = farms.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    if (newFarmRows[newFarmRows.length - 1].length === 3) {
      newFarmRows.push([farm])
    } else {
      newFarmRows[newFarmRows.length - 1].push(farm)
    }
    return newFarmRows
  }, [[]])

  return (
    <StyledCards>
      {!!rows[0].length ? rows.map((farmRow, i) => (
        <StyledRow key={i}>
          {farmRow.map((farm, j) => (
            <React.Fragment key={j}>
              <FarmCard farm={farm} />
              {(j === 0 || j === 1) && <StyledSpacer />}
            </React.Fragment>
          ))}
        </StyledRow>
      )) : (
        <StyledLoadingWrapper>
          <Loader text="Wake up mommy" />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: Farm,
}

interface BalancerUrlMap {
  [key: string]: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)

  const getStartTime = useCallback(async () => {
    const startTime = await getPoolStartTime(farm.contract)
    setStartTime(startTime)
  }, [farm, setStartTime])

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }

  
  useEffect(() => {
    if (farm && farm.id === 'ycrv_yam_uni_lp') {
      // getStartTime()
    }
  }, [farm, getStartTime])

  const openBalancerLink = (farmId :string) => {
    // todo: add real links
    const balancerUrls = BALANCER_URL as BalancerUrlMap
    const link = balancerUrls[farmId]
    window.open(link, '_blank')
  }
  
  const [onShowExplainerModal] = useModal(
    <ExplainerModal
      onConfirm={() => openBalancerLink(farm.id)}
      onDismiss={() => console.log('confirm')}
      tokenName={farm.depositToken.toUpperCase()}
    />
  )

  const poolActive = startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
    
      {farm.id === 'ycrv_yam_uni_lp' && (
        //<StyledCardAccent />
        ""
      )}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>{farm.icon}</CardIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {farm.depositToken.toUpperCase()}</StyledDetail>
              <StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>
            </StyledDetails>
            <Button
              disabled={!poolActive}
              text={poolActive ? 'Select' : undefined}
              to={`/${farm.id}`}
              >
              {!poolActive && <Countdown date={new Date(startTime * 1000)} renderer={renderer} />}
            </Button>
            <StyledInfo
              onClick={onShowExplainerModal}
              >WTF is {farm.id.toUpperCase()}?
            </StyledInfo>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  margin-top: 2rem;
  width: 900px;
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${props => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${props => props.theme.color.white};
  font-size: 24px;
  font-weight: 700;
  margin: ${props => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledInfo = styled.button`
  color: ${props => props.theme.color.orange[600]};
  opacity: 0.8;
  font-size: 12px;
  font-weight: 600;
  margin: 12px 0 -10px;
  padding: 0;
  text-decoration: none;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]}px;
  margin-top: ${props => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${props => props.theme.color.white};
`

export default FarmCards
