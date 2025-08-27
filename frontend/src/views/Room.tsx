import { useEffect, useState } from "react";
import coffeUrl from "../assets/coffe.gif"

export function Room({ setAppstate }: { setAppstate: (state: boolean) => void }) {
  const [RoomId, setRoomId] = useState<string | null>(null)
  const [Ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(document.location.search)
    const room = params.get("room")
    if(room != null){
      setRoomId(room)
    }
  }, [])
  

  useEffect(() => {
    if(RoomId !== null){
      const ws = new window.WebSocket("/ws/"+RoomId)
      ws.onmessage = (e) => {alert(e.data)}
      setWs(ws)

      return () => {
        ws.close()
      }
    }
  }, [RoomId])

  function exitRoom(){
    const params = new URLSearchParams(document.location.search)
    params.delete("room")
    document.location.search = params.toString()
    setAppstate(false)
  }
  
  

  return (
    <div className="flex">

      <div className="flex flex-col min-h-screen max-h-screen w-60 bg-gray-700 items-center">
        <h1 className="text-3xl m-3 text-white">Pepole</h1>

        <div className="flex flex-col items-center w-full h-full">
        </div>


        <button className="w-50 h-15 rounded-3xl bg-blue-700 m-3 text-2xl text-white" >Invite</button>
        <button className="w-50 h-15 rounded-3xl bg-red-700 m-3 text-2xl text-white" onClick={() => exitRoom()}>Exit</button>
      </div>

      <div className="flex flex-col min-h-screen max-h-screen w-full bg-gray-800 items-center">
        <h1 className="text-9xl m-1 text-white">Room Name {RoomId}</h1>
        <img src={coffeUrl} width={500} style={{imageRendering: "pixelated"}} />
        <div className="felx m-30">
          <button className="w-50 h-20 rounded-3xl bg-blue-700 m-3 text-2xl text-white" onClick={() => Ws?.send(JSON.stringify({"data":"test"}))}>Ping</button>
        </div>
      </div>


      <button className="flex absolute top-10 right-10 bg-amber-500 text-white p-3 rounded-2xl">Settings</button>
    </div>
    
  )
}