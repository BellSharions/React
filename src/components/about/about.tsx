import { memo } from "react";
import styles from "styled-components";

const About = styles.div`
  font-size: 2vw;
`;

const AboutComponent: React.FC = () => <About>About</About>;
export default memo(AboutComponent);
