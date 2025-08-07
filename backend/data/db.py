import json
import os
from typing import Dict, List
import hashlib
import threading


class SpaceDB:
    def __init__(self):
        # Load and parse the JSON data
        data_path = os.path.join(os.path.dirname(__file__), "mock_data.json")
        with open(data_path, "r") as f:
            json_data = json.load(f)
        # Flatten and map the data to the expected format
        self._sources = []
        items = json_data.get("collection", {}).get("items", [])
        for idx, item in enumerate(items, start=1):
            data = item.get("data", [{}])[0]
            links = item.get("links", [])
            image_url = None
            for link in links:
                if link.get("render") == "image":
                    image_url = link.get("href")
                    break
            self._sources.append(
                {
                    "id": idx,
                    "name": data.get("title", f"NASA Item {idx}"),
                    "type": data.get("media_type", "unknown"),
                    "launch_date": data.get("date_created", ""),
                    "description": data.get("description", ""),
                    "image_url": image_url,
                    "status": "Active",
                }
            )
        self._next_id = len(self._sources) + 1

    def get_all_sources(self) -> List[Dict]:
        """Get all space sources."""
        return self._sources

   

class SearchHistoryDB:
    def __init__(self):
        self._data_path = os.path.join(os.path.dirname(__file__), "search_history.json")
        if not os.path.exists(self._data_path):
            with open(self._data_path, "w") as f:
                json.dump([], f)

    def _read_history(self):
        with open(self._data_path, "r") as f:
            return json.load(f)

    def _write_history(self, history):
        with open(self._data_path, "w") as f:
            json.dump(history, f)

    def get_all_search_history(self):
        return self._read_history()

    def save(self, search_text: str):
        search_id = hashlib.sha256(search_text.encode()).hexdigest()
        entry = {"id": search_id, "value": search_text}
        history = self._read_history()

        if not any(h["id"] == search_id for h in history):
            history.append(entry)
            self._write_history(history)

        return entry

    def delete(self, search_id: str):
        history = self._read_history()
        history = [h for h in history if h["id"] != search_id]
        self._write_history(history)
        
