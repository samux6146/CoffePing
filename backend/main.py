import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.applications import Starlette #type: ignore
from starlette.responses import JSONResponse #type: ignore
from starlette.routing import Route, WebSocketRoute #type: ignore
from starlette.endpoints import WebSocketEndpoint #type: ignore
from starlette.websockets import WebSocket #type: ignore
from starlette.responses import HTMLResponse
from starlette.routing import Mount
from starlette.staticfiles import StaticFiles

from room import Room

Rooms : list = []

async def home(request):
    html = ""
    with open("dist/index.html") as f:
        html = f.read()
    return HTMLResponse(html)

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
        if room is not None:
            await self.room.add_client(websocket)

    async def on_disconnect(self, websocket, close_code):
        self.room.remove_client(websocket)

    async def on_receive(self, websocket, data):
        await self.room.broadcast(data, sender=websocket)



class SmartRateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, capacity: int = 10, refill_time: float = 2.0):
        super().__init__(app)
        # Token bucket state per client: {ip: {tokens, last_refill}}
        self.clients = {}
        self.capacity = capacity
        self.refill_time = refill_time  # seconds per token

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host
        now = time.time()

        state = self.clients.get(client_ip, {"tokens": self.capacity, "last_refill": now})

        # Refill tokens based on elapsed time
        elapsed = now - state["last_refill"]
        refill = int(elapsed / self.refill_time)
        if refill > 0:
            state["tokens"] = min(self.capacity, state["tokens"] + refill)
            state["last_refill"] = now

        if state["tokens"] > 0:
            state["tokens"] -= 1
            self.clients[client_ip] = state
            return await call_next(request)
        else:
            retry_after = self.refill_time - (elapsed % self.refill_time)
            return JSONResponse(
                {"detail": "Rate limit exceeded. Try again later."},
                status_code=429,
                headers={"Retry-After": f"{retry_after:.1f}"}
            )




app = Starlette(debug=True, routes=[
    Route('/', home),
    Mount('/assets', app=StaticFiles(directory='dist/assets'), name="static"),
    Route('/newroom', newroom),
    Route('/room/{id}', room),
    WebSocketRoute('/ws/{id}', RoomWebSocket)
])

app.add_middleware(SmartRateLimitMiddleware)