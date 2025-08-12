import { useState } from "react"
import { Homepage } from "./views/Homepage";
import { Room } from "./views/Room";

export default function App() {
  const [Appstate, setAppstate] = useState(false);
  return (
    <>
      {!Appstate? <Homepage setAppstate={setAppstate} /> : <Room setAppstate={setAppstate}/>}
    </>
  )
}