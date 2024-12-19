import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFpdGhpaGlldSIsImEiOiJjbTJ4eTU2YjMwYThxMmpvOGhoZW1oaHh2In0.F3GI89PsdNEEjlk9Q2o8TQ';

const WaypointSelect = ({ waypoints, onSelect }) => {
    useEffect(() => {
        if (waypoints.length > 0) {
            onSelect(waypoints[0]);
        }
    }, [waypoints, onSelect]);

    const handleSelect = (e) => {
        onSelect(e.target.value);
    };

    return (
        <div style={{ padding: '10px', maxHeight: '100%', overflowY: 'auto' }}>
            <h3>Waypoints</h3>
            <select onChange={handleSelect} defaultValue={waypoints[0]}>
                {waypoints.map((waypoint, index) => (
                    <option key={index} value={waypoint}>{waypoint}</option>
                ))}
            </select>
        </div>
    );
};

const MapComponent = ({ start, end, onPostOfficeSelect }) => {
    const [waypoints, setWaypoints] = useState([]);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                if (!start || !end) {
                    throw new Error('Invalid start or end coordinates');
                }

                const response = await axios.get(
                    `https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
                );

                const waypointPromises = response.data.routes[0].geometry.coordinates.map(async (wp) => {
                    const placeResponse = await axios.get(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${wp[0]},${wp[1]}.json?access_token=${MAPBOX_TOKEN}`
                    );
                    return placeResponse.data.features[0]?.place_name || `${wp[1]}, ${wp[0]}`;
                });

                const waypointNames = await Promise.all(waypointPromises);
                setWaypoints(waypointNames);
                if (waypointNames.length > 0) {
                    onPostOfficeSelect(waypointNames[0]);
                }
            } catch (error) {
                console.error("Error fetching route:", error);
            }
        };

        fetchRoute();
    }, [start, end, onPostOfficeSelect]);

    return (
        <div style={{ width: '300px', backgroundColor: '#f8f8f8' }}>
            <WaypointSelect waypoints={waypoints} onSelect={onPostOfficeSelect} />
        </div>
    );
};

export default MapComponent;