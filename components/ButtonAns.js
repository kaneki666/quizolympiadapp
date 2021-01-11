import {Button, Text} from 'galio-framework';
import React, {useEffect, useState} from 'react';

const ButtonAns = ({item, onPress, index, disabled, width}) => {
  const correctColor = '#4caf50';
  const incorrectColor = '#f44336';
  const [col, setCol] = useState('#151719');

  useEffect(() => {
    setCol('#151719');
  }, [item]);

  return (
    <Button
      style={{minWidth: width - 150, backgroundColor: col, color: 'white'}}
      disabled={disabled}
      onPress={() => {
        const result = onPress(item, index);

        if (result) setCol(correctColor);
        else setCol(incorrectColor);
      }}>
      <Text style={{color: 'white', fontSize: 16}}> {item}</Text>
    </Button>
  );
};

export default ButtonAns;
