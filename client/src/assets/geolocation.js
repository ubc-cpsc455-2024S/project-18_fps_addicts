import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readWaypoints = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, 'waypoints.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading waypoints.json:', error);
    return null;
  }
};

// const forwardGeocode = async (address) => {
//   try {
//     const response = await axios.get('https://nominatim.openstreetmap.org/search', {
//       params: {
//         q: address,
//         format: 'json',
//         addressdetails: 1,
//         limit: 1
//       }
//     });

//     if (response.data.length > 0) {
//       const { lat, lon, display_name } = response.data[0];
//       console.log(`Coordinates for ${address}: Latitude ${lat}, Longitude ${lon}`);
//       return { lat, lon, display_name };
//     } else {
//       console.log('No coordinates found for the address.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching geolocation data:', error);
//     return null;
//   }
// };
const forwardGeocode = async (address) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 1
        }
      });
  
      if (response.status === 200 && response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        console.log(`Coordinates for ${address}: Latitude ${lat}, Longitude ${lon}`);
        return { lat, lon, display_name };
      } else {
        console.log('No coordinates found for the address.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching geolocation data:', error);
      return null;
    }
  };
  

const main = async () => {
  const waypoints = await readWaypoints();
  if (!waypoints) return;

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
