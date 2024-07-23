import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaHeading,
  FaItalic,
  FaBold,
  FaStrikethrough,
  FaLink,
  FaQuoteRight,
  FaCode,
  FaImage,
  FaListUl,
  FaListOl,
  FaListCheck,
} from "react-icons/fa6";
import PreviewPage from "./PreviewPage";
import { IoIosAddCircle } from "react-icons/io";
import EditorPage from "./EditorPage";

const Editor = ({
  allData,
  handleData,
  handleDelete,
  handleEdit,
  activeEle,
  activeNoteId,
  handleTitle,
}) => {
  const [activeBtn, setActiveBtn] = useState(true);
  const [input, setInput] = useState("");
  const [currArr, setCurrArr] = useState([]);

  useEffect(() => {
    let data = allData.filter((ele) => {
      return ele.id === activeNoteId;
    });

    setCurrArr(data);
  }, [activeNoteId]);

  useEffect(() => {
    setInput(currArr[0]?.text);
  }, [currArr]);

  return (
    <div style={{display:"flex"}}>
      <div style={{width:"20%", padding:"4px", backgroundColor:"gray", minHeight:"100vh"}}>
        <div style={{fontSize:"18px", padding:"4px", display:"flex", justifyContent:"center", gap:"5px", border:"2px solid black"}}>
        <span>
          NOTES
          </span>
          <button>
            <IoIosAddCircle onClick={handleData} />
          </button>
        </div>
        {allData.map((ele) => {
          return (
            <EditorPage
              key={ele.id}
              ele={ele}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              activeEle={activeEle}
              handleTitle={handleTitle}
            />
          );
        })}
      </div>

      <div style={{width:"80px", minHeight:"100vh", padding:"10px"}} >
        <div style={{display:"flex", gap:"6px", paddingBottom:"4px"}} >
          <button
            style={{border: activeBtn ? "1px solid black" : "none" }}
            onClick={() => setActiveBtn(true)}
          >
            Write
          </button>
          <button
            style={{border: activeBtn ? "none" : "1px solid black" }}
            onClick={() => setActiveBtn(false)}
          >
            Preview
          </button>

          {activeBtn ? (
            <div style={{display:"flex", gap:"6px"}} >
              <button onClick={() => setInput((prev) => prev + " ### ")}>
                <FaHeading />
              </button>
              <button onClick={() => setInput((prev) => prev + " ** **")}>
                <FaBold />
              </button>
              <button onClick={() => setInput((prev) => prev + "* *")}>
                <FaItalic />
              </button>
              <button onClick={() => setInput((prev) => prev + "~~ ~~")}>
                <FaStrikethrough />
              </button>

              <button onClick={() => setInput((prev) => `${prev} [](url)`)}>
                <FaLink />
              </button>
              <button onClick={() => setInput((prev) => prev + " > ")}>
                <FaQuoteRight />
              </button>
              <button onClick={() => setInput((prev) => prev + ``)}>
                <FaCode />
              </button>
              <button
                onClick={() =>
                  setInput(
                    (prev) => prev + " ![](https://example.com/your-image.png) "
                  )
                }
              >
                <FaImage />
              </button>

              <button onClick={() => setInput((prev) => prev + "\n - ")}>
                <FaListUl />
              </button>
              <button onClick={() => setInput((prev) => prev + "\n 1. ")}>
                <FaListOl />
              </button>
              <button onClick={() => setInput((prev) => prev + "\n - [ ]")}>
                <FaListCheck />
              </button>
            </div>
          ) : (
            <span>Your Markup Notes are ...</span>
          )}
        </div>

        <div style={{borderTop:"2px solid red"}} >
          {activeBtn ? (
            <textarea
            style={{width:"1000px", height:"88vh", border:"2px solid green"}}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                handleEdit(currArr[0]?.id, input);
              }}
            ></textarea>
          ) : (
            <PreviewPage text={input} />
          )}
        </div>
      </div>
    </div>
  );
};

Editor.propTypes = {
  allData: PropTypes.array.isRequired,
  handleData: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  activeEle: PropTypes.func,
  activeNoteId: PropTypes.string,
  handleTitle: PropTypes.func,
};

export default Editor;