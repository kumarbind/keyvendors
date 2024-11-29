// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readdir } from "fs/promises";
import path from "path";
import { fetchData } from "services/api";

export default async function handler(req, res) {
  const fileNames = [];
  try {  
    let data=await fetchData('services');   
    data.data.forEach(function (file) {
      fileNames.push({name:file.title,image:file.icon,slug:file.slug});
    });
    res.status(200).json(fileNames);    
  } catch (err) {
    res.status(500).json(err);  
    console.log("Unable to scan directory: " + err);
  }
}


async function handler2(req, res) {

  const directoryPath = path.join(process.cwd(), 'public/assets/images/services/small/');
  const fileNames = [];
  try {
    const files = await readdir(directoryPath);
    files.forEach(function (file) {
      fileNames.push({name:file.substring(0, file.indexOf(".")).replaceAll("-"," "),image:file});
    });
    res.status(200).json(fileNames);    
  } catch (err) {
    res.status(500).json(err);  
    console.log("Unable to scan directory: " + err);
  }
}