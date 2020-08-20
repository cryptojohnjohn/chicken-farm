import React from 'react'
import styled from 'styled-components'

import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'

interface ExplainerModalProps extends ModalProps {
  onConfirm: () => void,
  tokenName?: string,
}

const ExplainerModal: React.FC<ExplainerModalProps> = ({onConfirm, onDismiss, tokenName = '' }) => {
  const pairs = tokenName.split('_')
  return (
    <Modal>
      <ModalTitle text={`Mommy explains ${tokenName}`} />
      <StyledContent><StyledHighlight>{tokenName}</StyledHighlight> stands for the token you receive in return for providing liquidity to the Balancer Liquidity Pool.</StyledContent>
      <StyledContent>This means: You need to provide liquidity of <StyledHighlight>{pairs[0]}</StyledHighlight> and <StyledHighlight>{pairs[1]}</StyledHighlight> in the given ratio to receive <StyledHighlight>{tokenName}</StyledHighlight> in return.</StyledContent>
      <ModalActions>
        <Button text="Close" variant="secondary" onClick={onDismiss} />
        <Button text="Let's Add Liquidity!" onClick={onConfirm} />
      </ModalActions>
    </Modal>
  )
}

const StyledContent = styled.div`
  color: white;
  padding-top: 0.5rem;
`
const StyledHighlight = styled.span`
  color: ${props => props.theme.color.orange[800]};
  font-weight: 500;
`


export default ExplainerModal