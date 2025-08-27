import { useEffect } from "react";

export function Homepage({ setAppstate }: { setAppstate: (state: boolean) => void }) {

  useEffect(() => {
    async function testForUrl() {
      const params = new URLSearchParams(document.location.search)
      if (params.has("room")){
          const roomid = params.get("room")
          try {
            const response = await fetch("/room/"+roomid, {
              method: "GET",
            })
            if (response.ok) {
              const data = await response.json();
              if (data.status == "room found!"){
                if (roomid){
                  setAppstate(true)
                } else {
                  alert("no id givven")
                }
              } else {
                alert("room not found")
              }
            } else {
              console.error("Failed to fetch data");
            }
          } catch(error) {
            console.error("Error:", error);
          }
      }
    }
    testForUrl()

  }, [])


  async function newroom(){
    const params = new URLSearchParams(document.location.search)
    try {
      const response = await fetch("/newroom", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        params.set("room", data.id)
        document.location.search = params.toString()
      } else {
        alert("Failed to create room");
      }
    } catch(error) {
      console.error("Error:", error);
    }
  }

  async function joinroom(){
    const params = new URLSearchParams(document.location.search)
    try {
      const roomid = await prompt("Enter room id")
      const response = await fetch("/room/"+roomid, {
        method: "GET",
      })
      if (response.ok) {
        const data = await response.json();
        if (data.status == "room found!"){
          if (roomid){
            params.set("room", data.id)
            document.location.search = params.toString()
          } else {
            alert("no id givven")
          }
        } else {
          alert("room not found")
        }
      } else {
        console.error("Failed to fetch data");
      }
    } catch(error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-gray-800 items-center">
        <h1 className="text-9xl m-20 text-white">CoffePing</h1>
        <div className="felx m-30">
          <button className="w-50 h-20 rounded-3xl bg-blue-700 m-3 text-2xl text-white" onClick={() => newroom()}>New Room</button>
          <button className="w-50 h-20 rounded-3xl bg-blue-700 m-3 text-2xl text-white" onClick={() => joinroom()}>Join Room</button>
        </div>
    </div>
  )
}