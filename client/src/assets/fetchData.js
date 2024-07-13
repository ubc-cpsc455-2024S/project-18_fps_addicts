import axios from 'axios';
import { JSDOM } from 'jsdom';
import fs from 'fs';

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

      const imgTag = document.querySelector('img');
      if (imgTag) {
        imageUrl = imgTag.src;
      }

      const waypoint = {
        id: room.replace(/\s+/g, '-').toLowerCase(),
        title: room,
        address: address,
        description: moreInfo,
        capacity: capacity,
        link: link.startsWith('http') ? link : `https://learningspaces.ubc.ca${link}`,
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

const fetchData = async () => {
  const transformed = await fetchMainPage();
  if (transformed && transformed.length > 0) {
    const waypointData = await fetchRoomData(transformed);
    const filePath = 'waypoints.json';
    saveDataToJson(waypointData, filePath);
  }
};

fetchData();
