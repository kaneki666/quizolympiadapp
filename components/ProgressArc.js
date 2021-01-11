import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Path} from 'react-native-svg';
import Animated, {Easing, timing} from 'react-native-reanimated';
import {useTimingTransition} from 'react-native-redash';

const {interpolate, multiply} = Animated;
const {width} = Dimensions.get('window');
const size = width / 2 - 40;
const strokeWidth = 50;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const {PI, cos, sin} = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;
const A = PI + PI * 0.4;
const startAngle = PI + PI * 0.2;
const endAngle = 2 * PI - PI * 0.2;
// A rx ry x-axis-rotation large-arc-flag sweep-flag x y
const x1 = cx - r * cos(startAngle);
const y1 = -r * sin(startAngle) + cy;
const x2 = cx - r * cos(endAngle);
const y2 = -r * sin(endAngle) + cy;
const d = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;

const ProgressArc = () => {
  let [opacity, setOpacity] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
    }).start(({finished}) => {
      if (finished) {
        setOpacity(Animated.Value(0));
      }
    });
  }, []);

  const circumference = r * A;
  let α = interpolate(opacity, {
    inputRange: [0, 1],
    outputRange: [0, A],
  });
  const strokeDashoffset = multiply(α, r);

  return (
    <Svg width={size} height={size}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
          <Stop offset="0" stopColor="#1E9600" />
          <Stop offset="0.5" stopColor="#FFF200" />
          <Stop offset="1" stopColor="#FF0000" />
        </LinearGradient>
      </Defs>
      <Path
        stroke="#ffffff"
        fill="none"
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{d, strokeWidth}}
      />
      <AnimatedPath
        stroke="url(#grad)"
        fill="none"
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{d, strokeDashoffset, strokeWidth}}
      />
    </Svg>
  );
};

export default ProgressArc;
