import React from 'react'
import { Container, ContainerElements } from './Styles';
import { getRandomInt } from '../../Utility/Random/Random';
const get_data = () => {

    const array : Array<number> = [];
    for (let i = 0; i < 50; i++) {
        array.push(getRandomInt(1, 50));
    }
    return array;
}

function Visualizer() {
  const data = get_data();
  return (
    <Container>
        {
            data.map((item) => <ContainerElements key = {item} style={{height : `${item}0px`}}></ContainerElements>)
        }
    </Container>
  )
}

export default Visualizer;