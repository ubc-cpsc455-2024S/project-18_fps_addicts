import axios from 'axios';
import fs from 'fs';
import { JSDOM } from 'jsdom';

const API_KEY = '66a03f9cbd992332062485lfbe62813';

const mainUrl = 'https://learningspaces.ubc.ca/find-space/informal-learning-spaces';
const baseUrl = 'https://learningspaces.ubc.ca/classrooms/';

const fetchMainPage = async () => {
  try {
    const { data } = await axios.get(mainUrl);
    const dom = new JSDOM(data);
    const document = dom.window.document;

    const elements = document.querySelectorAll('.h4');
    const transformed = [];

    elements.forEach(element => {
      const original = element.textContent.trim();
      const buildingCodeMatch = original.match(/\([A-Z]+\)/);

      if (buildingCodeMatch) {
        const startIdx = buildingCodeMatch.index;
        const titleSubstring = original.substring(startIdx);

        const parts = titleSubstring
          .replace(/[()]/g, '') 
          .split(' - '); 

        const buildingCode = parts[0].trim().toLowerCase();
        const rest = parts.slice(1).join('-').replace(/\s+/g, '-').toLowerCase();

        const transformedTitle = `${buildingCode}-${rest}`;

        transformed.push(transformedTitle);
      } else {
        console.warn('Error: Not Found:', original);
      }
    });

    return transformed;
  } catch (error) {
    console.error('Error fetching page:', error);
    return [];
  }
};

const getGeocode = async (address) => {
  const url = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon
      };
    } else {
      throw new Error('No geocode found');
    }
  } catch (error) {
    console.error(`Error fetching geocode for address "${address}":`, error.message);
    return null;
  }
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchRoomData = async (transformed) => {
  const waypointData = [];

  for (const title of transformed) {
    const pageUrl = `${baseUrl}${title}`;
    try {
      const { data } = await axios.get(pageUrl);
      const dom = new JSDOM(data);
      const document = dom.window.document;

      const tableRows = document.querySelectorAll('tr');
      let room = '', address = '', capacity = '', moreInfo = '', link = '', imageUrl = '';

      tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 1) {
          const label = cells[0].textContent.trim();
          const value = cells[1].textContent.trim();

          switch (label) {
            case 'ROOM:':
              room = value;
              break;
            case 'ADDRESS:':
              address = value;
              break;
            case 'CAPACITY:':
              capacity = value;
              break;
            case 'MORE INFO:':
              moreInfo = value;
              link = cells[1].querySelector('a')?.href || pageUrl;
              break;
            default:
              break;
          }
        }
      });

      // console.log(`Extracted address: "${address}"`);

      const geocode = await getGeocode(address);
      await delay(1000); 

      const imgTag = document.querySelector('img');
      if (imgTag) {
        imageUrl = imgTag.src;
      }

      // console.log(`Geocode result for "${address}":`, geocode);

      const waypoint = {
        id: room.replace(/\s+/g, '-').toLowerCase(),
        title: room,
        address: address,
        description: moreInfo,
        capacity: capacity,
        link: link.startsWith('http') ? link : `https://learningspaces.ubc.ca${link}`,
        coordinates: geocode ? [parseFloat(geocode.lat), parseFloat(geocode.lon)] : null,
        imageUrl: imageUrl.startsWith('http') ? imageUrl : `https://learningspaces.ubc.ca${imageUrl}`
      };

      waypointData.push(waypoint);
    } catch (error) {
      console.error(`Error fetching data from ${pageUrl}:`, error);
    }
  }

  return waypointData;
};

const saveDataToJson = (data, filePath) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
    console.log(`Data saved to ${filePath}`);
  } catch (error) {
    console.error('Error saving data to JSON file:', error);
  }
};

const fetchWaypointData = async () => {
  const transformed = await fetchMainPage();
  if (transformed && transformed.length > 0) {
    const waypointData = await fetchRoomData(transformed);
    const filePath = 'updated-waypoints.json';
    saveDataToJson(waypointData, filePath);
  }
};

fetchWaypointData();
