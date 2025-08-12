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
          <button className="w-50 h-20 rounded-3xl bg-blue-700 m-3 text-2xl text-white" onClick={() => setAppstate(true)}>New Room</button>
          <button className="w-50 h-20 rounded-3xl bg-blue-700 m-3 text-2xl text-white">Join Room</button>
        </div>
    </div>
  )
}

function Room({ setAppstate }: { setAppstate: (state: boolean) => void }) {
  return (
    <div className="flex">

      <div className="flex flex-col min-h-screen max-h-screen w-60 bg-gray-700 items-center">
        <h1 className="text-3xl m-3 text-white">Pepole</h1>

        <div className="flex flex-col items-center w-full h-full">
        </div>


        <button className="w-50 h-15 rounded-3xl bg-blue-700 m-3 text-2xl text-white" >Invite</button>
        <button className="w-50 h-15 rounded-3xl bg-red-700 m-3 text-2xl text-white" onClick={() => setAppstate(false)}>Exit</button>
      </div>

      <div className="flex flex-col min-h-screen max-h-screen w-full bg-gray-800 items-center">
        <h1 className="text-9xl m-1 text-white">Room Name</h1>
        <img src="../public/coffe.gif" width={500} style={{imageRendering: "pixelated"}} />
        <div className="felx m-30">
          <button className="w-50 h-20 rounded-3xl bg-blue-700 m-3 text-2xl text-white">Ping</button>
        </div>
      </div>


      <button className="flex absolute top-10 right-10 bg-amber-500 text-white p-3 rounded-2xl">Settings</button>
    </div>
    
  )
}

export default App
