import Markdown from 'react-markdown';
import propTypes from "prop-types";

const PreviewPage = ({text}) => {
  return (
    <pre>
      <Markdown>{text}</Markdown>
    </pre>
  )
}

PreviewPage.propTypes = {
    text: propTypes.string.isRequired,
}

export default PreviewPage