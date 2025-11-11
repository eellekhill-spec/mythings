import React, { useState, useMemo } from 'react';
import { School, DollarSign, Award, MapPin, BookOpen, Filter, TrendingUp, Users, Calculator, Home } from 'lucide-react';

const HBCUComparison = () => {
  const [zipCode, setZipCode] = useState('');
  const [selectedHBCUs, setSelectedHBCUs] = useState([]);
  const [filterState, setFilterState] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [maxCost, setMaxCost] = useState(60000);
  const [programFilter, setProgramFilter] = useState('all');
  const [showPredictor, setShowPredictor] = useState(false);
  const [userState, setUserState] = useState('');
  const [hasScholarship, setHasScholarship] = useState(false);
  const [scholarshipAmount, setScholarshipAmount] = useState(0);
  const [financialAid, setFinancialAid] = useState(0);

  // Comprehensive HBCU Data (100+ schools including 4-year universities and 2-year colleges)
  const hbcus = [
    // Alabama (14 HBCUs)
    {
      id: 1,
      name: "Alabama A&M University",
      city: "Normal",
      state: "AL",
      zip: "35762",
      lat: 34.7834,
      lon: -86.5686,
      tuitionInState: 10296,
      tuitionOutState: 19152,
      roomBoard: 8800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 6000,
      programs: ["Engineering", "Agriculture", "Business", "Education", "Computer Science", "Liberal Arts"],
      graduationRate: 40,
      website: "aamu.edu"
    },
    {
      id: 2,
      name: "Alabama State University",
      city: "Montgomery",
      state: "AL",
      zip: "36101",
      lat: 32.3643,
      lon: -86.2957,
      tuitionInState: 9936,
      tuitionOutState: 18072,
      roomBoard: 10500,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 4600,
      programs: ["Business", "Education", "Liberal Arts", "Nursing", "Computer Science", "Criminal Justice"],
      graduationRate: 31,
      website: "alasu.edu"
    },
    {
      id: 3,
      name: "Bishop State Community College",
      city: "Mobile",
      state: "AL",
      zip: "36603",
      lat: 30.6954,
      lon: -88.0431,
      tuitionInState: 4500,
      tuitionOutState: 8100,
      roomBoard: 0,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 3500,
      programs: ["Liberal Arts", "Business", "Health Sciences", "Technical Programs"],
      graduationRate: 25,
      website: "bishop.edu"
    },
    {
      id: 4,
      name: "Gadsden State Community College",
      city: "Gadsden",
      state: "AL",
      zip: "35902",
      lat: 34.0143,
      lon: -86.0066,
      tuitionInState: 4650,
      tuitionOutState: 8370,
      roomBoard: 0,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 4500,
      programs: ["Liberal Arts", "Business", "Nursing", "Technical Programs"],
      graduationRate: 28,
      website: "gadsdenstate.edu"
    },
    {
      id: 5,
      name: "J.F. Drake State Technical College",
      city: "Huntsville",
      state: "AL",
      zip: "35811",
      lat: 34.7304,
      lon: -86.5861,
      tuitionInState: 4200,
      tuitionOutState: 7560,
      roomBoard: 0,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 1200,
      programs: ["Technical Programs", "Engineering Technology", "Health Sciences"],
      graduationRate: 30,
      website: "drakestate.edu"
    },
    {
      id: 6,
      name: "Lawson State Community College",
      city: "Birmingham",
      state: "AL",
      zip: "35221",
      lat: 33.5207,
      lon: -86.8025,
      tuitionInState: 4500,
      tuitionOutState: 8100,
      roomBoard: 0,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 3000,
      programs: ["Liberal Arts", "Business", "Health Sciences", "Technical Programs"],
      graduationRate: 22,
      website: "lawsonstate.edu"
    },
    {
      id: 7,
      name: "Miles College",
      city: "Fairfield",
      state: "AL",
      zip: "35064",
      lat: 33.5128,
      lon: -86.9108,
      tuitionInState: 13500,
      tuitionOutState: 13500,
      roomBoard: 8200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1700,
      programs: ["Business", "Biology", "Education", "Liberal Arts", "Social Work"],
      graduationRate: 35,
      website: "miles.edu"
    },
    {
      id: 8,
      name: "Oakwood University",
      city: "Huntsville",
      state: "AL",
      zip: "35896",
      lat: 34.7246,
      lon: -86.5750,
      tuitionInState: 18590,
      tuitionOutState: 18590,
      roomBoard: 10200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1800,
      programs: ["Business", "Nursing", "Biology", "Computer Science", "Communications", "Liberal Arts"],
      graduationRate: 42,
      website: "oakwood.edu"
    },
    {
      id: 9,
      name: "Selma University",
      city: "Selma",
      state: "AL",
      zip: "36701",
      lat: 32.4074,
      lon: -87.0211,
      tuitionInState: 6800,
      tuitionOutState: 6800,
      roomBoard: 6000,
      accreditation: "Transnational Association of Christian Colleges and Schools",
      type: "Private",
      enrollment: 400,
      programs: ["Theology", "Liberal Arts", "Business"],
      graduationRate: 20,
      website: "selmauniversity.edu"
    },
    {
      id: 10,
      name: "Shelton State Community College",
      city: "Tuscaloosa",
      state: "AL",
      zip: "35405",
      lat: 33.2098,
      lon: -87.5692,
      tuitionInState: 4800,
      tuitionOutState: 8640,
      roomBoard: 0,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 4000,
      programs: ["Liberal Arts", "Business", "Health Sciences", "Technical Programs"],
      graduationRate: 26,
      website: "sheltonstate.edu"
    },
    {
      id: 11,
      name: "Stillman College",
      city: "Tuscaloosa",
      state: "AL",
      zip: "35401",
      lat: 33.2098,
      lon: -87.5692,
      tuitionInState: 14350,
      tuitionOutState: 14350,
      roomBoard: 8800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 600,
      programs: ["Business", "Biology", "Education", "Liberal Arts", "Criminal Justice"],
      graduationRate: 28,
      website: "stillman.edu"
    },
    {
      id: 12,
      name: "Talladega College",
      city: "Talladega",
      state: "AL",
      zip: "35160",
      lat: 33.4359,
      lon: -86.1058,
      tuitionInState: 15650,
      tuitionOutState: 15650,
      roomBoard: 8500,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1000,
      programs: ["Business", "Biology", "Education", "Liberal Arts", "Social Sciences"],
      graduationRate: 30,
      website: "talladega.edu"
    },
    {
      id: 13,
      name: "H. Councill Trenholm State Community College",
      city: "Montgomery",
      state: "AL",
      zip: "36108",
      lat: 32.3668,
      lon: -86.2999,
      tuitionInState: 4350,
      tuitionOutState: 7830,
      roomBoard: 0,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 1600,
      programs: ["Liberal Arts", "Business", "Health Sciences", "Technical Programs"],
      graduationRate: 24,
      website: "trenholmstate.edu"
    },
    {
      id: 14,
      name: "Tuskegee University",
      city: "Tuskegee",
      state: "AL",
      zip: "36088",
      lat: 32.4277,
      lon: -85.7086,
      tuitionInState: 23110,
      tuitionOutState: 23110,
      roomBoard: 10650,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 3100,
      programs: ["Engineering", "Veterinary Medicine", "Nursing", "Agriculture", "Business", "Computer Science"],
      graduationRate: 42,
      website: "tuskegee.edu"
    },
    
    // Arkansas (4 HBCUs)
    {
      id: 15,
      name: "Arkansas Baptist College",
      city: "Little Rock",
      state: "AR",
      zip: "72202",
      lat: 34.7465,
      lon: -92.2896,
      tuitionInState: 9500,
      tuitionOutState: 9500,
      roomBoard: 7800,
      accreditation: "Higher Learning Commission",
      type: "Private",
      enrollment: 1000,
      programs: ["Liberal Arts", "Business", "Theology", "Education"],
      graduationRate: 18,
      website: "arkansasbaptist.edu"
    },
    {
      id: 16,
      name: "Philander Smith College",
      city: "Little Rock",
      state: "AR",
      zip: "72202",
      lat: 34.7465,
      lon: -92.2896,
      tuitionInState: 14500,
      tuitionOutState: 14500,
      roomBoard: 9200,
      accreditation: "Higher Learning Commission",
      type: "Private",
      enrollment: 700,
      programs: ["Business", "Liberal Arts", "Education", "Social Work", "Biology"],
      graduationRate: 25,
      website: "philander.edu"
    },
    {
      id: 17,
      name: "Shorter College",
      city: "North Little Rock",
      state: "AR",
      zip: "72114",
      lat: 34.7695,
      lon: -92.2671,
      tuitionInState: 8900,
      tuitionOutState: 8900,
      roomBoard: 7200,
      accreditation: "Transnational Association of Christian Colleges and Schools",
      type: "Private",
      enrollment: 100,
      programs: ["Liberal Arts", "Business", "Theology"],
      graduationRate: 15,
      website: "shortercollege.edu"
    },
    {
      id: 18,
      name: "University of Arkansas at Pine Bluff",
      city: "Pine Bluff",
      state: "AR",
      zip: "71601",
      lat: 34.2284,
      lon: -92.0032,
      tuitionInState: 7704,
      tuitionOutState: 11556,
      roomBoard: 9200,
      accreditation: "Higher Learning Commission",
      type: "Public",
      enrollment: 2700,
      programs: ["Agriculture", "Business", "Engineering", "Education", "Liberal Arts", "Computer Science"],
      graduationRate: 31,
      website: "uapb.edu"
    },

    // California (1 HBCU)
    {
      id: 19,
      name: "Charles R. Drew University of Medicine and Science",
      city: "Los Angeles",
      state: "CA",
      zip: "90059",
      lat: 33.9850,
      lon: -118.2468,
      tuitionInState: 18500,
      tuitionOutState: 18500,
      roomBoard: 15000,
      accreditation: "WASC Senior College and University Commission",
      type: "Private",
      enrollment: 600,
      programs: ["Medicine", "Nursing", "Physician Assistant", "Public Health", "Biomedical Sciences"],
      graduationRate: 65,
      website: "cdrewu.edu"
    },

    // Delaware (1 HBCU)
    {
      id: 20,
      name: "Delaware State University",
      city: "Dover",
      state: "DE",
      zip: "19901",
      lat: 39.1582,
      lon: -75.5244,
      tuitionInState: 8282,
      tuitionOutState: 17836,
      roomBoard: 12800,
      accreditation: "Middle States Commission on Higher Education",
      type: "Public",
      enrollment: 5000,
      programs: ["Business", "Education", "Agriculture", "Nursing", "Computer Science", "Engineering"],
      graduationRate: 42,
      website: "desu.edu"
    },

    // District of Columbia (2 HBCUs)
    {
      id: 21,
      name: "Howard University",
      city: "Washington",
      state: "DC",
      zip: "20059",
      lat: 38.9222,
      lon: -77.0200,
      tuitionInState: 35810,
      tuitionOutState: 35810,
      roomBoard: 14600,
      accreditation: "Middle States Commission on Higher Education",
      type: "Private",
      enrollment: 10002,
      programs: ["Engineering", "Business", "Medicine", "Law", "Liberal Arts", "Communications", "Computer Science"],
      graduationRate: 64,
      website: "howard.edu"
    },
    {
      id: 22,
      name: "University of the District of Columbia",
      city: "Washington",
      state: "DC",
      zip: "20008",
      lat: 38.9367,
      lon: -77.0625,
      tuitionInState: 7988,
      tuitionOutState: 15976,
      roomBoard: 14200,
      accreditation: "Middle States Commission on Higher Education",
      type: "Public",
      enrollment: 3900,
      programs: ["Business", "Engineering", "Liberal Arts", "Education", "Computer Science", "Criminal Justice"],
      graduationRate: 22,
      website: "udc.edu"
    },

    // Florida (4 HBCUs)
    {
      id: 23,
      name: "Florida A&M University",
      city: "Tallahassee",
      state: "FL",
      zip: "32307",
      lat: 30.4273,
      lon: -84.2898,
      tuitionInState: 5785,
      tuitionOutState: 17725,
      roomBoard: 10754,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 9920,
      programs: ["Engineering", "Pharmacy", "Business", "Journalism", "Agriculture", "Computer Science", "Liberal Arts"],
      graduationRate: 53,
      website: "famu.edu"
    },
    {
      id: 24,
      name: "Bethune-Cookman University",
      city: "Daytona Beach",
      state: "FL",
      zip: "32114",
      lat: 29.1911,
      lon: -81.0229,
      tuitionInState: 18740,
      tuitionOutState: 18740,
      roomBoard: 10200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 2800,
      programs: ["Business", "Education", "Liberal Arts", "Nursing", "Criminal Justice", "Biology"],
      graduationRate: 39,
      website: "cookman.edu"
    },
    {
      id: 25,
      name: "Edward Waters University",
      city: "Jacksonville",
      state: "FL",
      zip: "32209",
      lat: 30.3322,
      lon: -81.6557,
      tuitionInState: 14500,
      tuitionOutState: 14500,
      roomBoard: 9800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1400,
      programs: ["Business", "Liberal Arts", "Criminal Justice", "Biology", "Education"],
      graduationRate: 30,
      website: "ewc.edu"
    },
    {
      id: 26,
      name: "Florida Memorial University",
      city: "Miami Gardens",
      state: "FL",
      zip: "33054",
      lat: 25.9420,
      lon: -80.2456,
      tuitionInState: 16500,
      tuitionOutState: 16500,
      roomBoard: 9600,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1500,
      programs: ["Business", "Biology", "Criminal Justice", "Liberal Arts", "Education"],
      graduationRate: 32,
      website: "fmuniv.edu"
    },

    // Georgia (9 HBCUs)
    {
      id: 27,
      name: "Albany State University",
      city: "Albany",
      state: "GA",
      zip: "31705",
      lat: 31.5785,
      lon: -84.1557,
      tuitionInState: 6302,
      tuitionOutState: 18052,
      roomBoard: 9400,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 6500,
      programs: ["Business", "Education", "Nursing", "Liberal Arts", "Criminal Justice", "Computer Science"],
      graduationRate: 34,
      website: "asurams.edu"
    },
    {
      id: 28,
      name: "Clark Atlanta University",
      city: "Atlanta",
      state: "GA",
      zip: "30314",
      lat: 33.7502,
      lon: -84.4121,
      tuitionInState: 24144,
      tuitionOutState: 24144,
      roomBoard: 11726,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 3700,
      programs: ["Business", "Biology", "Mass Communications", "Computer Science", "Liberal Arts", "Education"],
      graduationRate: 41,
      website: "cau.edu"
    },
    {
      id: 29,
      name: "Fort Valley State University",
      city: "Fort Valley",
      state: "GA",
      zip: "31030",
      lat: 32.5532,
      lon: -83.8877,
      tuitionInState: 6654,
      tuitionOutState: 19254,
      roomBoard: 9200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 2800,
      programs: ["Agriculture", "Business", "Education", "Veterinary Technology", "Liberal Arts", "Computer Science"],
      graduationRate: 36,
      website: "fvsu.edu"
    },
    {
      id: 30,
      name: "Interdenominational Theological Center",
      city: "Atlanta",
      state: "GA",
      zip: "30314",
      lat: 33.7510,
      lon: -84.4121,
      tuitionInState: 12000,
      tuitionOutState: 12000,
      roomBoard: 9000,
      accreditation: "Association of Theological Schools",
      type: "Private",
      enrollment: 250,
      programs: ["Theology", "Ministry", "Religious Studies"],
      graduationRate: 55,
      website: "itc.edu"
    },
    {
      id: 31,
      name: "Morehouse College",
      city: "Atlanta",
      state: "GA",
      zip: "30314",
      lat: 33.7475,
      lon: -84.4141,
      tuitionInState: 28730,
      tuitionOutState: 28730,
      roomBoard: 14390,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 2200,
      programs: ["Business", "Biology", "Engineering", "Computer Science", "Liberal Arts", "Political Science"],
      graduationRate: 59,
      website: "morehouse.edu"
    },
    {
      id: 32,
      name: "Paine College",
      city: "Augusta",
      state: "GA",
      zip: "30901",
      lat: 33.4735,
      lon: -82.0105,
      tuitionInState: 14200,
      tuitionOutState: 14200,
      roomBoard: 8800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 300,
      programs: ["Business", "Biology", "Liberal Arts", "Education", "Criminal Justice"],
      graduationRate: 20,
      website: "paine.edu"
    },
    {
      id: 33,
      name: "Savannah State University",
      city: "Savannah",
      state: "GA",
      zip: "31404",
      lat: 32.0264,
      lon: -81.0891,
      tuitionInState: 6354,
      tuitionOutState: 19074,
      roomBoard: 11500,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 4200,
      programs: ["Business", "Marine Science", "Engineering", "Criminal Justice", "Liberal Arts", "Computer Science"],
      graduationRate: 32,
      website: "savannahstate.edu"
    },
    {
      id: 34,
      name: "Spelman College",
      city: "Atlanta",
      state: "GA",
      zip: "30314",
      lat: 33.7447,
      lon: -84.4125,
      tuitionInState: 32000,
      tuitionOutState: 32000,
      roomBoard: 15000,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 2300,
      programs: ["Biology", "Psychology", "Economics", "Political Science", "Liberal Arts", "Computer Science"],
      graduationRate: 77,
      website: "spelman.edu"
    },
    {
      id: 35,
      name: "Morehouse School of Medicine",
      city: "Atlanta",
      state: "GA",
      zip: "30310",
      lat: 33.7490,
      lon: -84.3880,
      tuitionInState: 48000,
      tuitionOutState: 48000,
      roomBoard: 18000,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 400,
      programs: ["Medicine", "Biomedical Sciences", "Public Health"],
      graduationRate: 85,
      website: "msm.edu"
    },

    // Kentucky (2 HBCUs)
    {
      id: 36,
      name: "Kentucky State University",
      city: "Frankfort",
      state: "KY",
      zip: "40601",
      lat: 38.2009,
      lon: -84.8733,
      tuitionInState: 8896,
      tuitionOutState: 19896,
      roomBoard: 10200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 1600,
      programs: ["Business", "Liberal Arts", "Agriculture", "Nursing", "Computer Science", "Education"],
      graduationRate: 25,
      website: "kysu.edu"
    },
    {
      id: 37,
      name: "Simmons College of Kentucky",
      city: "Louisville",
      state: "KY",
      zip: "40203",
      lat: 38.2527,
      lon: -85.7585,
      tuitionInState: 8500,
      tuitionOutState: 8500,
      roomBoard: 7500,
      accreditation: "Transnational Association of Christian Colleges and Schools",
      type: "Private",
      enrollment: 200,
      programs: ["Theology", "Liberal Arts", "Business"],
      graduationRate: 30,
      website: "simmonscollegeky.edu"
    },

    // Louisiana (7 HBCUs)
    {
      id: 38,
      name: "Dillard University",
      city: "New Orleans",
      state: "LA",
      zip: "70122",
      lat: 30.0262,
      lon: -90.0702,
      tuitionInState: 19450,
      tuitionOutState: 19450,
      roomBoard: 11200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1200,
      programs: ["Business", "Nursing", "Liberal Arts", "Biology", "Psychology"],
      graduationRate: 51,
      website: "dillard.edu"
    },
    {
      id: 39,
      name: "Grambling State University",
      city: "Grambling",
      state: "LA",
      zip: "71245",
      lat: 32.5276,
      lon: -92.7138,
      tuitionInState: 7506,
      tuitionOutState: 17136,
      roomBoard: 9800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 4700,
      programs: ["Business", "Education", "Engineering", "Criminal Justice", "Liberal Arts", "Computer Science"],
      graduationRate: 35,
      website: "gram.edu"
    },
    {
      id: 40,
      name: "Southern University and A&M College",
      city: "Baton Rouge",
      state: "LA",
      zip: "70813",
      lat: 30.5243,
      lon: -91.1911,
      tuitionInState: 9290,
      tuitionOutState: 22844,
      roomBoard: 10479,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 6400,
      programs: ["Engineering", "Business", "Nursing", "Agriculture", "Liberal Arts", "Computer Science"],
      graduationRate: 33,
      website: "subr.edu"
    },
    {
      id: 41,
      name: "Southern University at New Orleans",
      city: "New Orleans",
      state: "LA",
      zip: "70126",
      lat: 30.0262,
      lon: -90.0702,
      tuitionInState: 5481,
      tuitionOutState: 14001,
      roomBoard: 9200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 2400,
      programs: ["Business", "Liberal Arts", "Social Work", "Criminal Justice", "Education"],
      graduationRate: 15,
      website: "suno.edu"
    },
    {
      id: 42,
      name: "Southern University at Shreveport",
      city: "Shreveport",
      state: "LA",
      zip: "71107",
      lat: 32.5252,
      lon: -93.7502,
      tuitionInState: 4200,
      tuitionOutState: 8988,
      roomBoard: 0,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 2800,
      programs: ["Liberal Arts", "Business", "Health Sciences", "Technical Programs"],
      graduationRate: 20,
      website: "susla.edu"
    },
    {
      id: 43,
      name: "Xavier University of Louisiana",
      city: "New Orleans",
      state: "LA",
      zip: "70125",
      lat: 29.9671,
      lon: -90.1028,
      tuitionInState: 25974,
      tuitionOutState: 25974,
      roomBoard: 10750,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 3300,
      programs: ["Pharmacy", "Biology", "Chemistry", "Pre-Med", "Business", "Liberal Arts"],
      graduationRate: 54,
      website: "xula.edu"
    },

    // Maryland (4 HBCUs)
    {
      id: 44,
      name: "Bowie State University",
      city: "Bowie",
      state: "MD",
      zip: "20715",
      lat: 39.0068,
      lon: -76.7791,
      tuitionInState: 8556,
      tuitionOutState: 21332,
      roomBoard: 12200,
      accreditation: "Middle States Commission on Higher Education",
      type: "Public",
      enrollment: 6000,
      programs: ["Business", "Computer Science", "Education", "Nursing", "Liberal Arts", "Communications"],
      graduationRate: 40,
      website: "bowiestate.edu"
    },
    {
      id: 45,
      name: "Coppin State University",
      city: "Baltimore",
      state: "MD",
      zip: "21216",
      lat: 39.3101,
      lon: -76.6642,
      tuitionInState: 8046,
      tuitionOutState: 18962,
      roomBoard: 11200,
      accreditation: "Middle States Commission on Higher Education",
      type: "Public",
      enrollment: 2700,
      programs: ["Business", "Education", "Criminal Justice", "Nursing", "Liberal Arts", "Rehabilitation"],
      graduationRate: 24,
      website: "coppin.edu"
    },
    {
      id: 46,
      name: "Morgan State University",
      city: "Baltimore",
      state: "MD",
      zip: "21251",
      lat: 39.3426,
      lon: -76.5840,
      tuitionInState: 7992,
      tuitionOutState: 19508,
      roomBoard: 11690,
      accreditation: "Middle States Commission on Higher Education",
      type: "Public",
      enrollment: 7700,
      programs: ["Engineering", "Business", "Architecture", "Social Work", "Computer Science", "Liberal Arts"],
      graduationRate: 33,
      website: "morgan.edu"
    },
    {
      id: 47,
      name: "University of Maryland Eastern Shore",
      city: "Princess Anne",
      state: "MD",
      zip: "21853",
      lat: 38.1851,
      lon: -75.6891,
      tuitionInState: 9076,
      tuitionOutState: 20122,
      roomBoard: 12000,
      accreditation: "Middle States Commission on Higher Education",
      type: "Public",
      enrollment: 3200,
      programs: ["Engineering", "Agriculture", "Business", "Pharmacy", "Aviation", "Computer Science"],
      graduationRate: 42,
      website: "umes.edu"
    },

    // Mississippi (8 HBCUs)
    {
      id: 48,
      name: "Alcorn State University",
      city: "Lorman",
      state: "MS",
      zip: "39096",
      lat: 31.9551,
      lon: -91.0773,
      tuitionInState: 8785,
      tuitionOutState: 8785,
      roomBoard: 9600,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 3500,
      programs: ["Agriculture", "Business", "Nursing", "Education", "Liberal Arts", "Computer Science"],
      graduationRate: 37,
      website: "alcorn.edu"
    },
    {
      id: 49,
      name: "Coahoma Community College",
      city: "Clarksdale",
      state: "MS",
      zip: "38614",
      lat: 34.2001,
      lon: -90.5709,
      tuitionInState: 2800,
      tuitionOutState: 2800,
      roomBoard: 5400,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 1800,
      programs: ["Liberal Arts", "Business", "Technical Programs"],
      graduationRate: 18,
      website: "coahomacc.edu"
    },
    {
      id: 50,
      name: "Hinds Community College - Utica Campus",
      city: "Utica",
      state: "MS",
      zip: "39175",
      lat: 32.1115,
      lon: -90.6176,
      tuitionInState: 3200,
      tuitionOutState: 6400,
      roomBoard: 5800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 900,
      programs: ["Liberal Arts", "Business", "Agriculture"],
      graduationRate: 22,
      website: "hindscc.edu"
    },
    {
      id: 51,
      name: "Jackson State University",
      city: "Jackson",
      state: "MS",
      zip: "39217",
      lat: 32.2988,
      lon: -90.1848,
      tuitionInState: 9196,
      tuitionOutState: 9196,
      roomBoard: 10800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 7000,
      programs: ["Business", "Engineering", "Education", "Liberal Arts", "Computer Science", "Public Health"],
      graduationRate: 42,
      website: "jsums.edu"
    },
    {
      id: 52,
      name: "Mississippi Valley State University",
      city: "Itta Bena",
      state: "MS",
      zip: "38941",
      lat: 33.4943,
      lon: -90.3229,
      tuitionInState: 7336,
      tuitionOutState: 7336,
      roomBoard: 9200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 2100,
      programs: ["Business", "Education", "Liberal Arts", "Criminal Justice", "Computer Science"],
      graduationRate: 28,
      website: "mvsu.edu"
    },
    {
      id: 53,
      name: "Rust College",
      city: "Holly Springs",
      state: "MS",
      zip: "38635",
      lat: 34.7676,
      lon: -89.4487,
      tuitionInState: 11100,
      tuitionOutState: 11100,
      roomBoard: 8000,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 900,
      programs: ["Business", "Biology", "Liberal Arts", "Education", "Social Work"],
      graduationRate: 38,
      website: "rustcollege.edu"
    },
    {
      id: 54,
      name: "Tougaloo College",
      city: "Tougaloo",
      state: "MS",
      zip: "39174",
      lat: 32.4201,
      lon: -90.1373,
      tuitionInState: 12500,
      tuitionOutState: 12500,
      roomBoard: 8800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 800,
      programs: ["Biology", "Business", "Liberal Arts", "Education", "Chemistry"],
      graduationRate: 45,
      website: "tougaloo.edu"
    },

    // Missouri (2 HBCUs)
    {
      id: 55,
      name: "Harris-Stowe State University",
      city: "St. Louis",
      state: "MO",
      zip: "63103",
      lat: 38.6270,
      lon: -90.1994,
      tuitionInState: 6120,
      tuitionOutState: 11736,
      roomBoard: 9800,
      accreditation: "Higher Learning Commission",
      type: "Public",
      enrollment: 1400,
      programs: ["Business", "Education", "Criminal Justice", "Liberal Arts"],
      graduationRate: 18,
      website: "hssu.edu"
    },
    {
      id: 56,
      name: "Lincoln University",
      city: "Jefferson City",
      state: "MO",
      zip: "65101",
      lat: 38.5767,
      lon: -92.1735,
      tuitionInState: 8316,
      tuitionOutState: 14436,
      roomBoard: 10400,
      accreditation: "Higher Learning Commission",
      type: "Public",
      enrollment: 2100,
      programs: ["Business", "Agriculture", "Liberal Arts", "Nursing", "Criminal Justice", "Computer Science"],
      graduationRate: 27,
      website: "lincolnu.edu"
    },

    // North Carolina (11 HBCUs)
    {
      id: 57,
      name: "Bennett College",
      city: "Greensboro",
      state: "NC",
      zip: "27401",
      lat: 36.0726,
      lon: -79.7920,
      tuitionInState: 19500,
      tuitionOutState: 19500,
      roomBoard: 10200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 400,
      programs: ["Liberal Arts", "Biology", "Business", "Education", "Psychology"],
      graduationRate: 39,
      website: "bennett.edu"
    },
    {
      id: 58,
      name: "Elizabeth City State University",
      city: "Elizabeth City",
      state: "NC",
      zip: "27909",
      lat: 36.2945,
      lon: -76.2277,
      tuitionInState: 6000,
      tuitionOutState: 19856,
      roomBoard: 10000,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 1500,
      programs: ["Business", "Education", "Liberal Arts", "Aviation", "Computer Science"],
      graduationRate: 35,
      website: "ecsu.edu"
    },
    {
      id: 59,
      name: "Fayetteville State University",
      city: "Fayetteville",
      state: "NC",
      zip: "28301",
      lat: 35.0526,
      lon: -78.8784,
      tuitionInState: 3584,
      tuitionOutState: 16440,
      roomBoard: 9500,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 6000,
      programs: ["Business", "Education", "Nursing", "Criminal Justice", "Liberal Arts", "Computer Science"],
      graduationRate: 41,
      website: "uncfsu.edu"
    },
    {
      id: 60,
      name: "Johnson C. Smith University",
      city: "Charlotte",
      state: "NC",
      zip: "28216",
      lat: 35.2271,
      lon: -80.8431,
      tuitionInState: 19750,
      tuitionOutState: 19750,
      roomBoard: 11400,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1400,
      programs: ["Business", "Liberal Arts", "Computer Science", "Biology", "Communications"],
      graduationRate: 43,
      website: "jcsu.edu"
    },
    {
      id: 61,
      name: "Livingstone College",
      city: "Salisbury",
      state: "NC",
      zip: "28144",
      lat: 35.6707,
      lon: -80.4742,
      tuitionInState: 18400,
      tuitionOutState: 18400,
      roomBoard: 9800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1100,
      programs: ["Business", "Liberal Arts", "Education", "Social Work", "Criminal Justice"],
      graduationRate: 37,
      website: "livingstone.edu"
    },
    {
      id: 62,
      name: "North Carolina A&T State University",
      city: "Greensboro",
      state: "NC",
      zip: "27411",
      lat: 36.0742,
      lon: -79.8100,
      tuitionInState: 6604,
      tuitionOutState: 21316,
      roomBoard: 9900,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 13487,
      programs: ["Engineering", "Agriculture", "Business", "Education", "Computer Science", "Liberal Arts"],
      graduationRate: 54,
      website: "ncat.edu"
    },
    {
      id: 63,
      name: "North Carolina Central University",
      city: "Durham",
      state: "NC",
      zip: "27707",
      lat: 35.9940,
      lon: -78.9018,
      tuitionInState: 6916,
      tuitionOutState: 21672,
      roomBoard: 10800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 8000,
      programs: ["Business", "Law", "Liberal Arts", "Nursing", "Computer Science", "Criminal Justice"],
      graduationRate: 48,
      website: "nccu.edu"
    },
    {
      id: 64,
      name: "Shaw University",
      city: "Raleigh",
      state: "NC",
      zip: "27601",
      lat: 35.7796,
      lon: -78.6382,
      tuitionInState: 18300,
      tuitionOutState: 18300,
      roomBoard: 9600,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1500,
      programs: ["Business", "Liberal Arts", "Education", "Criminal Justice", "Biology"],
      graduationRate: 26,
      website: "shawu.edu"
    },
    {
      id: 65,
      name: "St. Augustine's University",
      city: "Raleigh",
      state: "NC",
      zip: "27610",
      lat: 35.7880,
      lon: -78.6145,
      tuitionInState: 18450,
      tuitionOutState: 18450,
      roomBoard: 10200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1000,
      programs: ["Business", "Liberal Arts", "Education", "Criminal Justice", "Biology"],
      graduationRate: 30,
      website: "st-aug.edu"
    },
    {
      id: 66,
      name: "Winston-Salem State University",
      city: "Winston-Salem",
      state: "NC",
      zip: "27110",
      lat: 36.0999,
      lon: -80.2442,
      tuitionInState: 6472,
      tuitionOutState: 19328,
      roomBoard: 10400,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 4900,
      programs: ["Business", "Nursing", "Education", "Liberal Arts", "Computer Science", "Health Sciences"],
      graduationRate: 43,
      website: "wssu.edu"
    },

    // Ohio (3 HBCUs)
    {
      id: 67,
      name: "Central State University",
      city: "Wilberforce",
      state: "OH",
      zip: "45384",
      lat: 39.7156,
      lon: -83.8866,
      tuitionInState: 8058,
      tuitionOutState: 16116,
      roomBoard: 10200,
      accreditation: "Higher Learning Commission",
      type: "Public",
      enrollment: 1700,
      programs: ["Business", "Education", "Liberal Arts", "Computer Science", "Engineering"],
      graduationRate: 28,
      website: "centralstate.edu"
    },
    {
      id: 68,
      name: "Wilberforce University",
      city: "Wilberforce",
      state: "OH",
      zip: "45384",
      lat: 39.7145,
      lon: -83.8788,
      tuitionInState: 14500,
      tuitionOutState: 14500,
      roomBoard: 9800,
      accreditation: "Higher Learning Commission",
      type: "Private",
      enrollment: 500,
      programs: ["Business", "Liberal Arts", "Biology", "Computer Science"],
      graduationRate: 35,
      website: "wilberforce.edu"
    },

    // Oklahoma (1 HBCU)
    {
      id: 69,
      name: "Langston University",
      city: "Langston",
      state: "OK",
      zip: "73050",
      lat: 35.9447,
      lon: -97.2550,
      tuitionInState: 6000,
      tuitionOutState: 15120,
      roomBoard: 9600,
      accreditation: "Higher Learning Commission",
      type: "Public",
      enrollment: 2400,
      programs: ["Agriculture", "Business", "Nursing", "Liberal Arts", "Education", "Computer Science"],
      graduationRate: 25,
      website: "langston.edu"
    },

    // Pennsylvania (2 HBCUs)
    {
      id: 70,
      name: "Cheyney University of Pennsylvania",
      city: "Cheyney",
      state: "PA",
      zip: "19319",
      lat: 39.9169,
      lon: -75.6038,
      tuitionInState: 10650,
      tuitionOutState: 14814,
      roomBoard: 11200,
      accreditation: "Middle States Commission on Higher Education",
      type: "Public",
      enrollment: 600,
      programs: ["Business", "Education", "Liberal Arts", "Computer Science"],
      graduationRate: 24,
      website: "cheyney.edu"
    },
    {
      id: 71,
      name: "Lincoln University",
      city: "Lincoln University",
      state: "PA",
      zip: "19352",
      lat: 39.8067,
      lon: -75.9244,
      tuitionInState: 11722,
      tuitionOutState: 14778,
      roomBoard: 11400,
      accreditation: "Middle States Commission on Higher Education",
      type: "Public",
      enrollment: 1900,
      programs: ["Business", "Liberal Arts", "Nursing", "Biology", "Computer Science", "Criminal Justice"],
      graduationRate: 37,
      website: "lincoln.edu"
    },

    // South Carolina (8 HBCUs)
    {
      id: 72,
      name: "Allen University",
      city: "Columbia",
      state: "SC",
      zip: "29204",
      lat: 34.0007,
      lon: -81.0348,
      tuitionInState: 13000,
      tuitionOutState: 13000,
      roomBoard: 8400,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 600,
      programs: ["Business", "Liberal Arts", "Biology", "Education", "Social Sciences"],
      graduationRate: 25,
      website: "allenuniversity.edu"
    },
    {
      id: 73,
      name: "Benedict College",
      city: "Columbia",
      state: "SC",
      zip: "29204",
      lat: 34.0043,
      lon: -81.0243,
      tuitionInState: 19650,
      tuitionOutState: 19650,
      roomBoard: 10200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1700,
      programs: ["Business", "Engineering", "Liberal Arts", "Biology", "Education"],
      graduationRate: 33,
      website: "benedict.edu"
    },
    {
      id: 74,
      name: "Claflin University",
      city: "Orangeburg",
      state: "SC",
      zip: "29115",
      lat: 33.4918,
      lon: -80.8556,
      tuitionInState: 17800,
      tuitionOutState: 17800,
      roomBoard: 10200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1800,
      programs: ["Business", "Biology", "Liberal Arts", "Computer Science", "Education"],
      graduationRate: 52,
      website: "claflin.edu"
    },
    {
      id: 75,
      name: "Clinton College",
      city: "Rock Hill",
      state: "SC",
      zip: "29730",
      lat: 34.9249,
      lon: -81.0251,
      tuitionInState: 10500,
      tuitionOutState: 10500,
      roomBoard: 7200,
      accreditation: "Transnational Association of Christian Colleges and Schools",
      type: "Private",
      enrollment: 200,
      programs: ["Liberal Arts", "Business", "Theology"],
      graduationRate: 22,
      website: "clintoncollege.edu"
    },
    {
      id: 76,
      name: "Denmark Technical College",
      city: "Denmark",
      state: "SC",
      zip: "29042",
      lat: 33.3232,
      lon: -81.1426,
      tuitionInState: 5200,
      tuitionOutState: 7280,
      roomBoard: 6800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 1200,
      programs: ["Technical Programs", "Business", "Liberal Arts"],
      graduationRate: 20,
      website: "denmarktech.edu"
    },
    {
      id: 77,
      name: "Morris College",
      city: "Sumter",
      state: "SC",
      zip: "29150",
      lat: 33.9199,
      lon: -80.3414,
      tuitionInState: 13850,
      tuitionOutState: 13850,
      roomBoard: 7800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 800,
      programs: ["Business", "Liberal Arts", "Biology", "Education", "Criminal Justice"],
      graduationRate: 31,
      website: "morris.edu"
    },
    {
      id: 78,
      name: "South Carolina State University",
      city: "Orangeburg",
      state: "SC",
      zip: "29117",
      lat: 33.4557,
      lon: -80.8398,
      tuitionInState: 11228,
      tuitionOutState: 22456,
      roomBoard: 10500,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 2500,
      programs: ["Business", "Engineering", "Education", "Liberal Arts", "Computer Science", "Agriculture"],
      graduationRate: 42,
      website: "scsu.edu"
    },
    {
      id: 79,
      name: "Voorhees University",
      city: "Denmark",
      state: "SC",
      zip: "29042",
      lat: 33.3232,
      lon: -81.1426,
      tuitionInState: 11820,
      tuitionOutState: 11820,
      roomBoard: 8800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 400,
      programs: ["Business", "Liberal Arts", "Biology", "Education", "Criminal Justice"],
      graduationRate: 28,
      website: "voorhees.edu"
    },

    // Tennessee (7 HBCUs)
    {
      id: 80,
      name: "American Baptist College",
      city: "Nashville",
      state: "TN",
      zip: "37207",
      lat: 36.1627,
      lon: -86.8153,
      tuitionInState: 11900,
      tuitionOutState: 11900,
      roomBoard: 8400,
      accreditation: "Association for Biblical Higher Education",
      type: "Private",
      enrollment: 100,
      programs: ["Theology", "Ministry", "Liberal Arts"],
      graduationRate: 25,
      website: "abcnash.edu"
    },
    {
      id: 81,
      name: "Fisk University",
      city: "Nashville",
      state: "TN",
      zip: "37208",
      lat: 36.1627,
      lon: -86.8153,
      tuitionInState: 24450,
      tuitionOutState: 24450,
      roomBoard: 12000,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1000,
      programs: ["Biology", "Liberal Arts", "Business", "Chemistry", "Psychology"],
      graduationRate: 63,
      website: "fisk.edu"
    },
    {
      id: 82,
      name: "Lane College",
      city: "Jackson",
      state: "TN",
      zip: "38301",
      lat: 35.6145,
      lon: -88.8140,
      tuitionInState: 11600,
      tuitionOutState: 11600,
      roomBoard: 8800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1300,
      programs: ["Business", "Liberal Arts", "Biology", "Education", "Criminal Justice"],
      graduationRate: 30,
      website: "lanecollege.edu"
    },
    {
      id: 83,
      name: "LeMoyne-Owen College",
      city: "Memphis",
      state: "TN",
      zip: "38126",
      lat: 35.1175,
      lon: -90.0490,
      tuitionInState: 12500,
      tuitionOutState: 12500,
      roomBoard: 8600,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 800,
      programs: ["Business", "Liberal Arts", "Biology", "Education", "Computer Science"],
      graduationRate: 28,
      website: "loc.edu"
    },
    {
      id: 84,
      name: "Meharry Medical College",
      city: "Nashville",
      state: "TN",
      zip: "37208",
      lat: 36.1625,
      lon: -86.8142,
      tuitionInState: 52000,
      tuitionOutState: 52000,
      roomBoard: 16000,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 900,
      programs: ["Medicine", "Dentistry", "Public Health", "Biomedical Sciences"],
      graduationRate: 80,
      website: "mmc.edu"
    },
    {
      id: 85,
      name: "Tennessee State University",
      city: "Nashville",
      state: "TN",
      zip: "37209",
      lat: 36.1622,
      lon: -86.8298,
      tuitionInState: 9216,
      tuitionOutState: 26016,
      roomBoard: 10440,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 7500,
      programs: ["Business", "Engineering", "Agriculture", "Nursing", "Education", "Computer Science"],
      graduationRate: 34,
      website: "tnstate.edu"
    },

    // Texas (9 HBCUs)
    {
      id: 86,
      name: "Huston-Tillotson University",
      city: "Austin",
      state: "TX",
      zip: "78702",
      lat: 30.2779,
      lon: -97.7261,
      tuitionInState: 15200,
      tuitionOutState: 15200,
      roomBoard: 9800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1100,
      programs: ["Business", "Liberal Arts", "Education", "Computer Science", "Biology"],
      graduationRate: 35,
      website: "htu.edu"
    },
    {
      id: 87,
      name: "Jarvis Christian University",
      city: "Hawkins",
      state: "TX",
      zip: "75765",
      lat: 32.5907,
      lon: -95.2021,
      tuitionInState: 13500,
      tuitionOutState: 13500,
      roomBoard: 8600,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 600,
      programs: ["Business", "Liberal Arts", "Education", "Biology"],
      graduationRate: 28,
      website: "jarvis.edu"
    },
    {
      id: 88,
      name: "Paul Quinn College",
      city: "Dallas",
      state: "TX",
      zip: "75241",
      lat: 32.7767,
      lon: -96.7970,
      tuitionInState: 10000,
      tuitionOutState: 10000,
      roomBoard: 7800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 400,
      programs: ["Business", "Liberal Arts", "Biology", "Social Sciences"],
      graduationRate: 25,
      website: "pqc.edu"
    },
    {
      id: 89,
      name: "Prairie View A&M University",
      city: "Prairie View",
      state: "TX",
      zip: "77446",
      lat: 30.0936,
      lon: -95.9867,
      tuitionInState: 9826,
      tuitionOutState: 22706,
      roomBoard: 9526,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 8900,
      programs: ["Engineering", "Nursing", "Architecture", "Business", "Agriculture", "Computer Science"],
      graduationRate: 37,
      website: "pvamu.edu"
    },
    {
      id: 90,
      name: "St. Philip's College",
      city: "San Antonio",
      state: "TX",
      zip: "78203",
      lat: 29.4241,
      lon: -98.4936,
      tuitionInState: 2832,
      tuitionOutState: 5664,
      roomBoard: 0,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 11000,
      programs: ["Liberal Arts", "Business", "Health Sciences", "Technical Programs"],
      graduationRate: 18,
      website: "alamo.edu/spc"
    },
    {
      id: 91,
      name: "Southwestern Christian College",
      city: "Terrell",
      state: "TX",
      zip: "75160",
      lat: 32.7357,
      lon: -96.2753,
      tuitionInState: 8200,
      tuitionOutState: 8200,
      roomBoard: 7000,
      accreditation: "Transnational Association of Christian Colleges and Schools",
      type: "Private",
      enrollment: 200,
      programs: ["Theology", "Liberal Arts", "Business"],
      graduationRate: 20,
      website: "swcc.edu"
    },
    {
      id: 92,
      name: "Texas College",
      city: "Tyler",
      state: "TX",
      zip: "75702",
      lat: 32.3513,
      lon: -95.3011,
      tuitionInState: 11500,
      tuitionOutState: 11500,
      roomBoard: 8400,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 900,
      programs: ["Business", "Liberal Arts", "Education", "Biology"],
      graduationRate: 18,
      website: "texascollege.edu"
    },
    {
      id: 93,
      name: "Texas Southern University",
      city: "Houston",
      state: "TX",
      zip: "77004",
      lat: 29.7199,
      lon: -95.3632,
      tuitionInState: 9990,
      tuitionOutState: 22350,
      roomBoard: 11200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 9200,
      programs: ["Business", "Law", "Pharmacy", "Liberal Arts", "Engineering", "Computer Science"],
      graduationRate: 21,
      website: "tsu.edu"
    },
    {
      id: 94,
      name: "Wiley College",
      city: "Marshall",
      state: "TX",
      zip: "75670",
      lat: 32.5449,
      lon: -94.3677,
      tuitionInState: 13800,
      tuitionOutState: 13800,
      roomBoard: 9200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1300,
      programs: ["Business", "Liberal Arts", "Biology", "Education", "Criminal Justice"],
      graduationRate: 30,
      website: "wileyc.edu"
    },

    // Virginia (4 HBCUs)
    {
      id: 95,
      name: "Hampton University",
      city: "Hampton",
      state: "VA",
      zip: "23668",
      lat: 37.0215,
      lon: -76.3378,
      tuitionInState: 27672,
      tuitionOutState: 27672,
      roomBoard: 12752,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 3600,
      programs: ["Business", "Nursing", "Engineering", "Marine Science", "Computer Science", "Liberal Arts"],
      graduationRate: 58,
      website: "hamptonu.edu"
    },
    {
      id: 96,
      name: "Norfolk State University",
      city: "Norfolk",
      state: "VA",
      zip: "23504",
      lat: 36.8508,
      lon: -76.2859,
      tuitionInState: 9622,
      tuitionOutState: 25244,
      roomBoard: 10800,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 5500,
      programs: ["Business", "Engineering", "Liberal Arts", "Nursing", "Computer Science", "Education"],
      graduationRate: 39,
      website: "nsu.edu"
    },
    {
      id: 97,
      name: "Virginia State University",
      city: "Petersburg",
      state: "VA",
      zip: "23806",
      lat: 37.2276,
      lon: -77.4019,
      tuitionInState: 9654,
      tuitionOutState: 23002,
      roomBoard: 11600,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Public",
      enrollment: 4300,
      programs: ["Business", "Engineering", "Liberal Arts", "Agriculture", "Computer Science", "Education"],
      graduationRate: 42,
      website: "vsu.edu"
    },
    {
      id: 98,
      name: "Virginia Union University",
      city: "Richmond",
      state: "VA",
      zip: "23220",
      lat: 37.5407,
      lon: -77.4360,
      tuitionInState: 18300,
      tuitionOutState: 18300,
      roomBoard: 10200,
      accreditation: "Southern Association of Colleges and Schools Commission on Colleges",
      type: "Private",
      enrollment: 1500,
      programs: ["Business", "Liberal Arts", "Theology", "Education", "Biology"],
      graduationRate: 38,
      website: "vuu.edu"
    },

    // West Virginia (2 HBCUs)
    {
      id: 99,
      name: "Bluefield State University",
      city: "Bluefield",
      state: "WV",
      zip: "24701",
      lat: 37.2698,
      lon: -81.2223,
      tuitionInState: 7896,
      tuitionOutState: 15792,
      roomBoard: 9200,
      accreditation: "Higher Learning Commission",
      type: "Public",
      enrollment: 1300,
      programs: ["Business", "Engineering", "Liberal Arts", "Nursing", "Education"],
      graduationRate: 32,
      website: "bluefieldstate.edu"
    },
    {
      id: 100,
      name: "West Virginia State University",
      city: "Institute",
      state: "WV",
      zip: "25112",
      lat: 38.3818,
      lon: -81.7712,
      tuitionInState: 8976,
      tuitionOutState: 19464,
      roomBoard: 10600,
      accreditation: "Higher Learning Commission",
      type: "Public",
      enrollment: 3500,
      programs: ["Business", "Liberal Arts", "Biology", "Communications", "Computer Science"],
      graduationRate: 31,
      website: "wvstateu.edu"
    },

    // U.S. Virgin Islands (1 HBCU)
    {
      id: 101,
      name: "University of the Virgin Islands",
      city: "Charlotte Amalie",
      state: "VI",
      zip: "00802",
      lat: 18.3419,
      lon: -64.9307,
      tuitionInState: 5096,
      tuitionOutState: 15288,
      roomBoard: 11000,
      accreditation: "Middle States Commission on Higher Education",
      type: "Public",
      enrollment: 2100,
      programs: ["Business", "Marine Biology", "Liberal Arts", "Nursing", "Education"],
      graduationRate: 35,
      website: "uvi.edu"
    }
  ];

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Simplified zip code to coordinates
  const zipToCoordinates = (zip) => {
    const firstDigit = parseInt(zip.charAt(0));
    const coords = {
      0: { lat: 41.8781, lon: -87.6298 },
      1: { lat: 40.7128, lon: -74.0060 },
      2: { lat: 38.9072, lon: -77.0369 },
      3: { lat: 33.7490, lon: -84.3880 },
      4: { lat: 38.2527, lon: -85.7585 },
      5: { lat: 39.7392, lon: -104.9903 },
      6: { lat: 35.4676, lon: -97.5164 },
      7: { lat: 32.7767, lon: -96.7970 },
      8: { lat: 39.7392, lon: -104.9903 },
      9: { lat: 34.0522, lon: -118.2437 }
    };
    return coords[firstDigit] || { lat: 38.9072, lon: -77.0369 };
  };

  // Get all unique programs
  const allPrograms = useMemo(() => {
    const programs = new Set();
    hbcus.forEach(school => {
      school.programs.forEach(program => programs.add(program));
    });
    return Array.from(programs).sort();
  }, []);

  // Filter and sort HBCUs
  const filteredHBCUs = useMemo(() => {
    let filtered = hbcus.filter(school => {
      if (filterState !== 'all' && school.state !== filterState) return false;
      if (filterType !== 'all' && school.type !== filterType) return false;
      
      // Calculate cost based on user's state for predictor
      const tuitionToUse = userState && userState === school.state ? 
        school.tuitionInState : school.tuitionOutState;
      const totalCost = tuitionToUse + school.roomBoard;
      
      if (totalCost > maxCost) return false;
      if (programFilter !== 'all' && !school.programs.includes(programFilter)) return false;
      return true;
    });

    if (zipCode.length === 5) {
      const userCoords = zipToCoordinates(zipCode);
      filtered = filtered.map(school => ({
        ...school,
        distance: calculateDistance(userCoords.lat, userCoords.lon, school.lat, school.lon)
      })).sort((a, b) => a.distance - b.distance);
    }

    return filtered;
  }, [zipCode, filterState, filterType, maxCost, programFilter, userState]);

  // Get unique states
  const states = [...new Set(hbcus.map(h => h.state))].sort();

  const toggleSelection = (id) => {
    setSelectedHBCUs(prev => 
      prev.includes(id) ? prev.filter(hid => hid !== id) : [...prev, id]
    );
  };

  const selectedSchools = hbcus.filter(h => selectedHBCUs.includes(h.id));

  // Statistics
  const stats = useMemo(() => {
    const publicSchools = hbcus.filter(h => h.type === 'Public');
    const privateSchools = hbcus.filter(h => h.type === 'Private');
    
    return {
      totalHBCUs: hbcus.length,
      publicCount: publicSchools.length,
      privateCount: privateSchools.length,
      statesWithHBCUs: states.length
    };
  }, []);

  // Tuition Predictor Calculations
  const predictedCosts = useMemo(() => {
    if (!userState) return [];
    
    return filteredHBCUs.map(school => {
      const isInState = userState === school.state;
      const tuition = isInState ? school.tuitionInState : school.tuitionOutState;
      const totalBeforeAid = tuition + school.roomBoard;
      const scholarshipReduction = hasScholarship ? scholarshipAmount : 0;
      const aidReduction = financialAid || 0;
      const estimatedCost = Math.max(0, totalBeforeAid - scholarshipReduction - aidReduction);
      
      return {
        ...school,
        isInState,
        tuition,
        totalBeforeAid,
        estimatedCost,
        savings: totalBeforeAid - estimatedCost
      };
    }).sort((a, b) => a.estimatedCost - b.estimatedCost);
  }, [filteredHBCUs, userState, hasScholarship, scholarshipAmount, financialAid]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <School className="w-10 h-10 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Complete HBCU Comparison Tool</h1>
              <p className="text-gray-600">All {stats.totalHBCUs} Historically Black Colleges & Universities</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.totalHBCUs}</div>
              <div className="text-sm text-gray-600">Total HBCUs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.publicCount}</div>
              <div className="text-sm text-gray-600">Public</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.privateCount}</div>
              <div className="text-sm text-gray-600">Private</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.statesWithHBCUs}</div>
              <div className="text-sm text-gray-600">States + VI</div>
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowPredictor(!showPredictor)}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Tuition Predictor
              </button>
            </div>
          </div>
        </div>

        {/* Tuition Predictor Tool */}
        {showPredictor && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">Tuition Cost Predictor</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Home className="w-4 h-4 inline mr-1" />
                  Your Home State
                </label>
                <select
                  value={userState}
                  onChange={(e) => setUserState(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select your state...</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scholarship Amount
                </label>
                <input
                  type="number"
                  placeholder="$0"
                  value={scholarshipAmount}
                  onChange={(e) => {
                    setScholarshipAmount(parseInt(e.target.value) || 0);
                    setHasScholarship(parseInt(e.target.value) > 0);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Financial Aid
                </label>
                <input
                  type="number"
                  placeholder="$0"
                  value={financialAid}
                  onChange={(e) => setFinancialAid(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setScholarshipAmount(0);
                    setFinancialAid(0);
                    setHasScholarship(false);
                    setUserState('');
                  }}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Reset Calculator
                </button>
              </div>
            </div>

            {userState && predictedCosts.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-semibold text-gray-800 mb-3">Top 10 Most Affordable Options for {userState} Residents:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {predictedCosts.slice(0, 10).map((school, idx) => (
                    <div key={school.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-600">#{idx + 1}</span>
                            <h4 className="font-semibold text-sm">{school.name}</h4>
                          </div>
                          <p className="text-xs text-gray-600">{school.city}, {school.state}</p>
                          {school.isInState && (
                            <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                              In-State
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tuition & Fees:</span>
                          <span className="font-medium">${school.tuition.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Room & Board:</span>
                          <span className="font-medium">${school.roomBoard.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t">
                          <span className="text-gray-600">Total Before Aid:</span>
                          <span className="font-medium">${school.totalBeforeAid.toLocaleString()}</span>
                        </div>
                        {school.savings > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Savings (Aid):</span>
                            <span className="font-medium">-${school.savings.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-1 border-t font-bold text-indigo-700">
                          <span>Est. Annual Cost:</span>
                          <span>${school.estimatedCost.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Filter Options</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Zip Code</label>
              <input
                type="text"
                placeholder="Enter 5-digit zip"
                maxLength={5}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All States ({states.length})</option>
                {states.map(state => (
                  <option key={state} value={state}>
                    {state} ({hbcus.filter(h => h.state === state).length})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Public">Public ({stats.publicCount})</option>
                <option value="Private">Private ({stats.privateCount})</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Programs</option>
                {allPrograms.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Total Cost: ${maxCost.toLocaleString()}
              </label>
              <input
                type="range"
                min="5000"
                max="70000"
                step="1000"
                value={maxCost}
                onChange={(e) => setMaxCost(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-indigo-600">{filteredHBCUs.length}</span> of {stats.totalHBCUs} HBCUs
              {selectedHBCUs.length > 0 && (
                <span> • <span className="font-semibold text-green-600">{selectedHBCUs.length}</span> selected for comparison</span>
              )}
            </p>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredHBCUs.map(school => {
            const tuitionToShow = userState && userState === school.state ? 
              school.tuitionInState : school.tuitionOutState;
            const isInState = userState === school.state;
            
            return (
              <div
                key={school.id}
                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                  selectedHBCUs.includes(school.id) ? 'ring-4 ring-indigo-500' : ''
                }`}
                onClick={() => toggleSelection(school.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{school.name}</h3>
                    <p className="text-sm text-gray-600">{school.city}, {school.state}</p>
                    <div className="flex gap-2 mt-1">
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        school.type === 'Public' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {school.type}
                      </span>
                      {isInState && (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          In-State
                        </span>
                      )}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedHBCUs.includes(school.id)}
                    onChange={() => {}}
                    className="w-5 h-5 text-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">Tuition:</span>
                    <span>${tuitionToShow.toLocaleString()}</span>
                  </div>
                  
                  {school.roomBoard > 0 && (
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">Room & Board:</span>
                      <span>${school.roomBoard.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1 border-t">
                    <DollarSign className="w-4 h-4 text-indigo-600" />
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold">${(tuitionToShow + school.roomBoard).toLocaleString()}/yr</span>
                  </div>

                  {school.distance && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="font-semibold">Distance:</span>
                      <span>{Math.round(school.distance)} miles</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold">Grad Rate:</span>
                    <span>{school.graduationRate}%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">Enrollment:</span>
                    <span>{school.enrollment.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">Programs:</p>
                  <div className="flex flex-wrap gap-1">
                    {school.programs.slice(0, 3).map(program => (
                      <span key={program} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {program}
                      </span>
                    ))}
                    {school.programs.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{school.programs.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  <Award className="w-3 h-3 inline mr-1" />
                  {school.accreditation.split(' ').slice(0, 4).join(' ')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        {selectedSchools.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Detailed Comparison ({selectedSchools.length} schools)
            </h2>
            
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left p-3 font-semibold sticky left-0 bg-white">Attribute</th>
                  {selectedSchools.map(school => (
                    <th key={school.id} className="text-left p-3 font-semibold">
                      <div className="min-w-[150px]">{school.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium sticky left-0 bg-white">Location</td>
                  {selectedSchools.map(school => (
                    <td key={school.id} className="p-3">{school.city}, {school.state}</td>
                  ))}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-3 font-medium sticky left-0 bg-gray-50">Type</td>
                  {selectedSchools.map(school => (
                    <td key={school.id} className="p-3">{school.type}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium sticky left-0 bg-white">In-State Tuition</td>
                  {selectedSchools.map(school => (
                    <td key={school.id} className="p-3">${school.tuitionInState.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-3 font-medium sticky left-0 bg-gray-50">Out-of-State Tuition</td>
                  {selectedSchools.map(school => (
                    <td key={school.id} className="p-3">${school.tuitionOutState.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium sticky left-0 bg-white">Room & Board</td>
                  {selectedSchools.map(school => (
                    <td key={school.id} className="p-3">
                      {school.roomBoard > 0 ? `$${school.roomBoard.toLocaleString()}` : 'N/A (Commuter)'}
                    </td>
                  ))}
                </tr>
                {zipCode.length === 5 && (
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-medium sticky left-0 bg-gray-50">Distance from You</td>
                    {selectedSchools.map(school => (
                      <td key={school.id} className="p-3">
                        {school.distance ? `${Math.round(school.distance)} miles` : 'N/A'}
                      </td>
                    ))}
                  </tr>
                )}
                <tr className="border-b">
                  <td className="p-3 font-medium sticky left-0 bg-white">Enrollment</td>
                  {selectedSchools.map(school => (
                    <td key={school.id} className="p-3">{school.enrollment.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-3 font-medium sticky left-0 bg-gray-50">Graduation Rate</td>
                  {selectedSchools.map(school => (
                    <td key={school.id} className="p-3">
                      <span className={`font-semibold ${
                        school.graduationRate >= 50 ? 'text-green-600' : 
                        school.graduationRate >= 35 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {school.graduationRate}%
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium sticky left-0 bg-white">Accreditation</td>
                  {selectedSchools.map(school => (
                    <td key={school.id} className="p-3 text-xs">{school.accreditation}</td>
                  ))}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-3 font-medium align-top sticky left-0 bg-gray-50">Programs Offered</td>
                  {selectedSchools.map(school => (
                    <td key={school.id} className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {school.programs.map(program => (
                          <span key={program} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                            {program}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {filteredHBCUs.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">No schools match your current filters</p>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">About This Data</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• This tool includes all {stats.totalHBCUs} HBCUs recognized by the U.S. Department of Education</p>
            <p>• Costs shown are estimates for the 2024-2025 academic year and include tuition, fees, and room & board where applicable</p>
            <p>• Community colleges and commuter schools may not have room & board costs</p>
            <p>• Financial aid, scholarships, and grants can significantly reduce these costs</p>
            <p>• Use the Tuition Predictor to see personalized cost estimates based on your home state and financial aid</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HBCUComparison;
