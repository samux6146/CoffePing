from helpers import generate_uid
import json

class Room:
    def __init__(self):
        self.name = ""
        self.id = generate_uid()
        self.description = ""
        self.connected_clients = set()
    
    async def add_client(self, websocket):
        await websocket.accept()
        self.connected_clients.add(websocket)

    def remove_client(self, websocket):
        self.connected_clients.discard(websocket)

    async def broadcast(self, message, sender=None):
        to_remove = []
        for client in self.connected_clients:
            if client is not sender:
                try:
                    await client.send_text(json.dumps(message))
                except Exception as e: 
                    print(e)
                    to_remove.append(client)
        # Clean up any broken connections
        for client in to_remove:
            self.connected_clients.discard(client)
