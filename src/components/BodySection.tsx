import '../styles/BodySection.scss';
import { useInView } from 'react-intersection-observer'
import bgBodySect from "../assets/images/body-section1.png";

export function BodySection() {
  const { ref , inView } = useInView();
  
  return (
    <div className={`body-section`}>
      <div className="section-text">
        <span ref={ref} className={`body-header section-header ${inView ? 'show-header' : 'hidden-header'}`}>
          ¿Qué ofrecemos?
        </span>
        <span className={`body-text hidden ${inView ? ' show-body-text' : ' hidden-body-text'}`}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error similique nulla in tenetur harum quibusdam quos sed animi? Quibusdam optio, dolore placeat veniam sunt qui delectus in culpa ratione temporibus! Eos cupiditate, expedita, natus deleniti quod ducimus quidem incidunt architecto quisquam similique porro iusto itaque facere corporis magnam. Architecto, repellat rerum eligendi dolores totam quos fugit ipsa accusamus excepturi amet.
        </span>
        
      </div>
      
        <div className="section-img" style={{ backgroundImage: `url(${bgBodySect})`}}>


      </div>
    </div>
  )
}