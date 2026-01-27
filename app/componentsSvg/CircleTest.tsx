import Svg, { Circle } from "react-native-svg";

export default function CircleSvgTest() {
  return (
    <Svg height="50%" width="50%" viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="5"
        stroke="#531D60BF"
        strokeOpacity={"100%"}
        strokeWidth="0.5"
        fill="#C4A3CD"
      />
    </Svg>
  );
}
