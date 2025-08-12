import { useState } from "react"

function App() {
  const [Appstate, setAppstate] = useState(true);
  return (
    <>
      {!Appstate? <Homepage setAppstate={setAppstate} /> : <Room setAppstate={setAppstate}/>}
    </>
  )
}

function Homepage({ setAppstate }: { setAppstate: (state: boolean) => void }) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-gray-800 items-center">
        <h1 className="text-9xl m-20 text-white">CoffePing</h1>
        <div className="felx m-30">
          <button className="w-50 h-20 rounded-3xl bg-blue-800 m-3 text-2xl text-white" onClick={() => setAppstate(true)}>New Room</button>
          <button className="w-50 h-20 rounded-3xl bg-blue-800 m-3 text-2xl text-white">Join Room</button>
        </div>
    </div>
  )
}

function Room({ setAppstate }: { setAppstate: (state: boolean) => void }) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-gray-800 items-center">
        <h1 className="text-9xl m-20 text-white">Room Name</h1>
        <div className="felx m-30">
          <button className="w-50 h-20 rounded-3xl bg-blue-800 m-3 text-2xl text-white" onClick={() => setAppstate(false)}>Back</button>
        </div>
    </div>
  )
}

export default App
