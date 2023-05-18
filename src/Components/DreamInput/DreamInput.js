import { useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Astronaut from "../../assets/Astronaut - (550 x 550px).svg";
import "./DreamInput.css";
import { useMutation } from "@apollo/client";
import { CREATE_DREAM } from "../../queries";
import { getEmotionOptions, getTagOptions, colourStyles } from "../../options";

const DreamInput = ({ user, updateDreams }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [lucidityLevel, setLucidityLevel] = useState(0);
  const history = useHistory();
  const [createDream] = useMutation(CREATE_DREAM);

  const emotionOptions = getEmotionOptions();
  const tagOptions = getTagOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dreamData = {
      userId: user.id,
      dreamDate: date,
      title: title,
      description: description,
      emotions: selectedEmotion.map((emotion) => emotion.value),
      tags: selectedTag.map((tag) => tag.value),
      lucidityLevel: lucidityLevel,
    };

    try {
      const { data } = await createDream({ variables: { input: dreamData } });
      const newDream = data.createDream;
      updateDreams(newDream);
    } catch (error) {
      console.log(error.message);
    }

    setDate("");
    setTitle("");
    setDescription("");
    setSelectedEmotion([]);
    setSelectedTag([]);
    setLucidityLevel(0);

    history.push("/dreams");
  };

  return (
    <div className="dream-input">
      <img
        className="background-dream-astronaut"
        src={Astronaut}
        alt="Floating Astronaut"
      />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Dream Journal</h2>
          <input
            type="date"
            value={date}
            aria-label="Date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            value={title}
            placeholder="My Dream Title.."
            aria-label="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <textarea
            value={description}
            placeholder="My Dream Description.."
            aria-label="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br />
          <Select
            isMulti
            value={selectedEmotion}
            options={emotionOptions}
            placeholder="Select Emotions.."
            onChange={setSelectedEmotion}
            styles={colourStyles}
            className="multi-select"
            classNamePrefix="select-styling"
          />
          <br />
          <Select
            isMulti
            value={selectedTag}
            options={tagOptions}
            placeholder="Select Tags.."
            onChange={setSelectedTag}
            styles={colourStyles}
            className="multi-select"
            classNamePrefix="select-styling"
          />
          <br />
          <label>
            Lucidity Level: {lucidityLevel}
            <input
              type="range"
              min={0}
              max={5}
              value={lucidityLevel}
              onChange={(e) => setLucidityLevel(Number(e.target.value))}
            />
          </label>
          <br />
          <button className="glow-on-hover" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DreamInput;
