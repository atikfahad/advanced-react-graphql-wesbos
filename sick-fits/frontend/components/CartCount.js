import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
  background: ${(props) => props.theme.red};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 1rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }
  /* Initial State of the entered Dot */
  .count-enter {
    transform: scale(4) rotate(0.5turn);
  }
  .count-enter-active {
    transform: rotate(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
  }
  .count-exit-active {
    transform: scale(4) rotate(0.5turn);
  }
`;

const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        classNames='count'
        classNames='count'
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
);

export default CartCount;
