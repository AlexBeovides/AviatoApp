import "../styles/BodySection.scss";
import { useInView } from "react-intersection-observer";

interface BodyProps {
  title: string;
  text: string;
  imageUrl: string;
}

export function BodySection(props: BodyProps) {
  const propTitle = props.title;
  const propText = props.text;
  const propImageUrl = props.imageUrl;
  const { ref, inView } = useInView();

  return (
    <div className={`body-section`}>
      <div className="section-text">
        <span
          ref={ref}
          className={`body-header section-header ${
            inView ? "show-header" : "hidden-header"
          }`}
        >
          {propTitle}
        </span>
        <span
          className={`body-text hidden ${
            inView ? " show-body-text" : " hidden-body-text"
          }`}
        >
          {propText}
        </span>
      </div>

      <div
        className="section-img"
        style={{ backgroundImage: `url(${propImageUrl})` }}
      ></div>
    </div>
  );
}
