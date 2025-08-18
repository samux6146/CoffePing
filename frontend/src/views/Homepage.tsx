export function Homepage({ setAppstate }: { setAppstate: (state: boolean) => void }) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-gray-800 items-center">
        <h1 className="text-9xl m-20 text-white">CoffePing</h1>
        <div className="felx m-30">
          <button className="w-50 h-20 rounded-3xl bg-blue-700 m-3 text-2xl text-white" onClick={() => newroom().then(() => setAppstate(true))}>New Room</button>
          <button className="w-50 h-20 rounded-3xl bg-blue-700 m-3 text-2xl text-white">Join Room</button>
        </div>
    </div>
  )
}

async function newroom(){
  try {
    const response = await fetch("/newroom", {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("roomid", data.id)
    } else {
      console.error("Failed to create room");
    }
  } catch(error) {
    console.error("Error:", error);
  }
}