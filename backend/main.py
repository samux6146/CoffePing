from starlette.applications import Starlette #type: ignore
from starlette.responses import JSONResponse #type: ignore
from starlette.routing import Route, WebSocketRoute #type: ignore
from starlette.endpoints import WebSocketEndpoint #type: ignore
from starlette.websockets import WebSocket #type: ignore

from room import Room

Rooms : list = []

def getRoom(id):
    for room in Rooms:
        if room.id == id:
            return room
        return None


async def newroom(request):
    room = Room()
    Rooms.append(room)
    return JSONResponse({'id': room.id})

async def room(request):
    id = request.path_params['id']
    room = getRoom(id)
    if room is not None:
        return JSONResponse({'status': "room found!"})
    return JSONResponse({'status': "room not found"})


class RoomWebSocket(WebSocketEndpoint):
    encoding = "json"

    async def on_connect(self, websocket):
        id = websocket.path_params['id']
        self.room = getRoom(id)
        await self.room.add_client(websocket)

    async def on_disconnect(self, websocket, close_code):
        self.room.remove_client(websocket)

    async def on_receive(self, websocket, data):
        await self.room.broadcast(data, sender=websocket)


app = Starlette(debug=True, routes=[
    Route('/newroom', newroom),
    Route('/room/{id}', room),
    WebSocketRoute('/ws/{id}', RoomWebSocket)
])