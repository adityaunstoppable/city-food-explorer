import { useState } from "react";
import { DUMMY_CONTENT } from "../utils/dummyContent";

//make it dynamic , fetch api data and use id as option to show the sections, Fool ya fool !

const Section = ({
  id,
  accordianHeading,
  buttonText,
  shouldShow,
  setShouldShow,
}) => {
  return (
    <div className=" text-left m-2 p-2 w-[99%] bg-slate-200 rounded-lg border border-slate-500">
      <h1 className=" font-semibold">{accordianHeading}</h1>
      <p
        onClick={() => buttonText == "Hide" ?  setShouldShow("hiding all") : setShouldShow(id)}
        className="w-10 cursor-pointer underline "
      >
        {buttonText}
      </p>
      {shouldShow && <p>{DUMMY_CONTENT}</p>}
    </div>
  );
};

const Accordion = () => {



  const [shouldShow, setShouldShow] = useState("why");

  return (
    <div>
      <Section
        id="why"
        accordianHeading="Why Instamart"
        buttonText={shouldShow ==="why" ? "Hide" : "Show"}
        shouldShow={shouldShow === "why"}
        setShouldShow={setShouldShow}
      />
      <Section
        id="careers"
        accordianHeading="Careers"
        buttonText={shouldShow ==="careers" ? "Hide" : "Show"}
        shouldShow={shouldShow === "careers"}
        setShouldShow={setShouldShow}
      />
      <Section
        id="about"
        accordianHeading="About Us"
        buttonText={shouldShow ==="about" ? "Hide" : "Show"}
        shouldShow={shouldShow === "about"}
        setShouldShow={setShouldShow}
      />
    </div>
  );
};

export default Accordion;
