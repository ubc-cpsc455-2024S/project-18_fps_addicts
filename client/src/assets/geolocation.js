import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readWaypoints = async () => {
    try {
      const data = await fs.readFile(path.resolve(__dirname, 'waypoints.json'), 'utf-8');
      const waypoints = JSON.parse(data);
      
      const addresses = waypoints.map(waypoint => waypoint.address);
      return addresses;
    } catch (error) {
      console.error('Error reading or parsing waypoints.json:', error);
      return [];
    }
  };


const forwardGeocode = async (address) => {
    try {
      const response = await axios.get(`https://freeipapi.com/api/json/${encodeURIComponent(address)}`);
  
      if (response.status === 200) {
        const { latitude, longitude, city, region_name } = response.data;
        // console.log(`Coordinates for ${address}: Latitude ${latitude}, Longitude ${longitude}`);
        return { lat: latitude, lon: longitude, display_name: `${city}, ${region_name}` };
      } else {
        console.log(`No coordinates found for ${address}.`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching geolocation data for ${address}:`, error.message);
      return null;
    }
  };
  
  const main = async () => {
    const data = await fs.readFile(path.resolve(__dirname, 'waypoints.json'), 'utf-8');
    const waypoints = await JSON.parse(data); 
    if (waypoints.length === 0) {
      console.log('No waypoints found in waypoints.json');
      return;
    }
  
    const updatedWaypoints = await Promise.all(
        waypoints.map(async (waypoint) => {
        const { address } = waypoint;
        if (address) {
          const coords = await forwardGeocode(address);
          if (coords) {
            return { ...waypoint, coordinates: coords };
          }
        }
        return waypoint;
      })
    );
  
    try {
      await fs.writeFile(path.resolve(__dirname, 'updated_waypoints.json'), JSON.stringify(updatedWaypoints, null, 2));
      console.log('Updated waypoints have been written to updated_waypoints.json');
    } catch (error) {
      console.error('Error writing updated_waypoints.json:', error);
    }
  };
  
  main();
  
